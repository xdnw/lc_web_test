import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommandStoreType, createCommandStore, createCommandStoreWithDef } from "@/utils/StateUtil.ts";
import { hasToken } from "@/utils/Auth.ts";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button.tsx";
import { deepEqual, UNPACKR } from "@/lib/utils.ts";
import { useDialog } from "../layout/DialogContext";
import { CommonEndpoint, fetchSingle, QueryResult } from "../../lib/BulkQuery";
import EndpointWrapper, { useDeepCompareMemo } from "./bulkwrapper";
import { Argument } from "@/utils/Command";
import ArgInput from "../cmd/ArgInput";
import { ArgDescComponent } from "../cmd/CommandComponent";
import { singleQueryOptions } from "@/lib/queries";

export function ApiFormInputs<T, A extends { [key: string]: string | string[] | undefined }, B extends { [key: string]: string | string[] | undefined }>({
    endpoint, message, default_values, showArguments, label, handle_error, classes, children
}: {
    readonly endpoint: CommonEndpoint<T, A, B>;
    message?: ReactNode;
    default_values?: B;
    showArguments?: (keyof A)[];
    label?: ReactNode;
    handle_error?: (error: Error) => void;
    classes?: string;
    handle_response?: (data: QueryResult<T>) => void;
    readonly children?: (data: Omit<QueryResult<T>, 'data'> & {
        data: NonNullable<QueryResult<T>['data']>;
    }) => ReactNode;
}) {
    const required = useMemo(() => {
        const req: string[] = [];
        for (const [key, value] of Object.entries(endpoint.endpoint.args)) {
            if (!value.arg.optional && (!default_values || !Object.prototype.hasOwnProperty.call(default_values, key))) {
                req.push(key);
            }
        }
        return req;
    }, [endpoint, default_values]);

    const stableDefaults = useDeepCompareMemo(default_values ? 
        (Object.fromEntries(Object.entries(default_values).filter(([_, value]) => value !== undefined)) as { [k: string]: string | string[] }): {});

    const renderFormInputs = useCallback((props: { setOutputValue: (name: string, value: string) => void }) => {
        if ((!required || required.length === 0) && (!showArguments || showArguments.length === 0)) {
            return null;
        }
        return (
            <>
                {Object.values(endpoint.endpoint.args)
                    .filter(arg => !stableDefaults || !Object.prototype.hasOwnProperty.call(stableDefaults, arg.name))
                    .map((arg, index) => (
                        <div key={index} className="relative">
                            <ArgDescComponent arg={arg} />
                            <div
                                className="mb-1 bg-accent border border-slate-500 border-opacity-50 rounded-b-sm rounded-tr-sm">
                                <ArgInput
                                    argName={arg.name}
                                    breakdown={arg.getTypeBreakdown()}
                                    min={arg.arg.min}
                                    max={arg.arg.max}
                                    initialValue={""}
                                    setOutputValue={props.setOutputValue}
                                />
                            </div>
                        </div>
                    ))}
                <hr className="my-2" />
            </>
        );
    }, [endpoint, stableDefaults]);

    return (
        <ApiForm
            requireLogin={false}
            required={required}
            message={message}
            endpoint={endpoint}
            label={label}
            default_values={stableDefaults}
            form_inputs={renderFormInputs}
            handle_error={handle_error}
            handle_response={handle_response}
            classes={classes}
        >
        {(data) => children ? children(data) : null}
        </ApiForm>
    );
}

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

function ApiForm<T, A extends { [key: string]: string | string[] | undefined }, B extends { [key: string]: string | string[] | undefined }>({
    requireLogin = false,
    message,
    endpoint,
    label = "submit",
    required = [],
    default_values,
    form_inputs: FormInputs,
    handle_error,
    classes,
    handle_response,
    children
}: {
    requireLogin?: boolean;
    message: ReactNode;
    readonly endpoint: CommonEndpoint<T, A, B>;
    label?: ReactNode;
    required?: string[];
    default_values?: { [k: string]: string | string[] };
    form_inputs: React.ComponentType<FormInputsProps> | undefined;
    handle_error?: (error: Error) => void;
    classes?: string;
    handle_response?: (data: QueryResult<T>) => void;
    readonly children?: (data: Omit<QueryResult<T>, 'data'> & {
        data: NonNullable<QueryResult<T>['data']>;
    }) => ReactNode;
}) {
    const [commandStore] = useState(() =>
        default_values && Object.keys(default_values).length
            ? createCommandStoreWithDef(default_values)
            : createCommandStore()
    );

    if (requireLogin && !hasToken()) {
        return <>
            Please login first
            <br />
            <Button variant="outline" size="sm" className='border-red-800/70' asChild><Link to={`${process.env.BASE_PATH}home`}>Login</Link></Button>
        </>
    }

    return <>
        {message}
        {message && required && required.length > 0 && <hr className="my-2" />}
        {FormInputs && <FormInputs setOutputValue={commandStore((state) => state.setOutput)} />}
        <ApiFormHandler endpoint={endpoint}
            store={commandStore}
            label={label}
            required={required}
            handle_error={handle_error}
            classes={classes}>
            {(data) => children ? children(data) : null}
        </ApiFormHandler>
    </>
}

export default React.memo(ApiForm, deepEqual) as typeof ApiForm;

export function ApiFormHandler<T, A extends { [key: string]: string | string[] | undefined }, B extends { [key: string]: string | string[] | undefined }>({
    store, endpoint, label, required, handle_error, classes, children 
}: {
    store: CommandStoreType,
    readonly endpoint: CommonEndpoint<T, A, B>;
    label: ReactNode,
    required?: string[],
    handle_error?: (error: Error) => void,
    classes?: string,
    handle_response?: (data: QueryResult<T>) => void;
    readonly children?: (data: Omit<QueryResult<T>, 'data'> & {
        data: NonNullable<QueryResult<T>['data']>;
    }) => ReactNode;
}) {
    const [submit, setSubmit] = useState(false);
    const [missing, setMissing] = useState<string[]>([]);
    // TODO tanstack query, the args will be from the store, but can change at any time
    // On button press, store the args in a state, then call refetch on the query with the new args (so they are not subject to change)
    // enabled: false

    const submitForm = useCallback(() => {
        const query = store((state) => state.output);
        setArgs(query);
        // todo refetch
    }, []);

    useEffect(() => {
        const missing = required ? required.filter(field => !store((state) => state.output)[field]) : [];
        setMissing(missing);
    }, [store, required]);

    if (missing.length) {
        return <>
            <p>Please provide a value for <kbd>{missing.join(", ")}</kbd></p>
        </>
    }

    return (
        <>
            START PRE
            <pre>{JSON.stringify(store((state) => state.output))}</pre>
            END PRE
            {submit && <EndpointWrapper<T, A, B> endpoint={endpoint} args={store((state) => state.output) as A} handle_error={handle_error} batch_wait_ms={10} isPostOverride={true}>
            {(data) => children ? children(data) : null}
            </EndpointWrapper>}
            <Button variant="outline" size="sm" className={`border-red-800/70 me-1 ${submit && "disabled cursor-wait"} ${classes}`} onClick={submitForm}>{label}</Button>
        </>
    );
}