import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommandStoreType, createCommandStore, createCommandStoreWithDef } from "@/utils/StateUtil.ts";
import { hasToken } from "@/utils/Auth.ts";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button.tsx";
import { UNPACKR } from "@/lib/utils.ts";
import { useDialog } from "../layout/DialogContext";
import { QueryResult } from "../cmd/BulkQuery";
import EndpointWrapper from "./bulkwrapper";
import { Argument } from "@/utils/Command";
import ArgInput from "../cmd/ArgInput";
import { ArgDescComponent } from "../cmd/CommandComponent";

export interface ApiFormInputsProps<T, A extends { [key: string]: string }> {
    url: string;
    args: { [name: string]: Argument };
    cache_duration: number;
    message?: React.ReactNode;
    default_values?: { [key: string]: string | string[] };
    showArguments?: string[];
    label?: React.ReactNode;
    handle_submit?: (args: A) => boolean;
    handle_loading?: () => void;
    handle_error?: (error: string) => void;
    classes?: string;
    children: (data: QueryResult<T>) => React.ReactNode;
}

export function ApiFormInputs<T, A extends { [key: string]: string }>(props: ApiFormInputsProps<T, A>) {
    const { url, args, cache_duration, message, default_values, showArguments, label, handle_submit, handle_loading, handle_error, classes, children } = props;

    const required = useMemo(() => {
        const req: string[] = [];
        for (const [key, value] of Object.entries(args)) {
            if (!value.arg.optional && (!default_values || !Object.prototype.hasOwnProperty.call(default_values, key))) {
                req.push(key);
            }
        }
        return req;
    }, [args, default_values]);

    const renderFormInputs = useCallback((props: { setOutputValue: (name: string, value: string) => void }) => {
        if ((!required || required.length === 0) && (!showArguments || showArguments.length === 0)) {
            return null;
        }
        return (
            <>
                {Object.values(args)
                    .filter(arg => !default_values || !Object.prototype.hasOwnProperty.call(default_values, arg.name))
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
    }, [args, default_values]);

    return (
        <ApiForm
            requireLogin={false}
            required={required}
            cache_duration={cache_duration}
            message={message}
            endpoint={url}
            label={label}
            default_values={default_values}
            form_inputs={renderFormInputs}
            handle_loading={handle_loading}
            handle_error={handle_error}
            handle_submit={handle_submit}
            classes={classes}
        >
            {children}
        </ApiForm>
    );
}

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

interface ApiFormProps<T, A extends { [key: string]: string }> {
    requireLogin?: boolean;
    message: ReactNode;
    endpoint: string;
    cache_duration: number;
    label?: ReactNode;
    required?: string[];
    default_values?: { [key: string]: string | string[] };
    form_inputs: React.ComponentType<FormInputsProps> | undefined;
    handle_submit?: (data: A) => boolean;
    handle_loading?: () => void;
    handle_error?: (error: string) => void;
    classes?: string;
    readonly children: (data: QueryResult<T>) => ReactNode;
}

function ApiForm<T, A extends { [key: string]: string }>({
    requireLogin = false,
    message,
    endpoint,
    cache_duration,
    label = "submit",
    required = [],
    default_values,
    form_inputs: FormInputs,
    handle_submit,
    handle_loading,
    handle_error,
    classes,
    children
}: ApiFormProps<T, A>) {
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
            cache_duration={cache_duration}
            handle_submit={handle_submit}
            handle_loading={handle_loading}
            handle_error={handle_error}
            classes={classes}>
            {children}
        </ApiFormHandler>
    </>
}

const areEqual = <T, A extends { [key: string]: string }>(prevProps: ApiFormProps<T, A>, nextProps: ApiFormProps<T, A>) => {
    const keys = Object.keys(prevProps) as (keyof ApiFormProps<T, A>)[];
    for (const key of keys) {
        if (prevProps[key] !== nextProps[key]) {
            return false;
        }
    }
    return true;
};

export default React.memo(ApiForm, areEqual) as typeof ApiForm;

export function ApiFormHandler<T, A extends { [key: string]: string }>({ store, endpoint, label, cache_duration, required, handle_submit, handle_loading, handle_error, classes, children }: {
    store: CommandStoreType,
    endpoint: string,
    cache_duration: number,
    label: ReactNode,
    required?: string[],
    handle_submit?: (data: A) => boolean,
    handle_loading?: () => void,
    handle_error?: (error: string) => void,
    classes?: string,
    readonly children: (data: QueryResult<T>) => ReactNode;
}) {
    const output = store((state) => state.output);
    const [submit, setSubmit] = useState(false);
    const { showDialog } = useDialog();
    const missing = required ? required.filter(field => !output[field]) : [];

    if (missing.length) {
        return <>
            <p>Please provide a value for <kbd>{missing.join(", ")}</kbd></p>
        </>
    }

    return (
        <>
            START PRE
            <pre>{JSON.stringify(output)}</pre>
            END PRE
            {submit && <EndpointWrapper endpoint={endpoint} query={output} cache_duration={cache_duration} batch_wait_ms={10}>
                {children}
            </EndpointWrapper>}
            <Button variant="outline" size="sm" className={`border-red-800/70 me-1 ${submit && "disabled cursor-wait"} ${classes ? classes : ""}`} onClick={() => setSubmit(true)}>{label}</Button>
        </>
    );
}