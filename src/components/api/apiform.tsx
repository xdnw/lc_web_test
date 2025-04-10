import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CommandStoreType, createCommandStore, createCommandStoreWithDef } from "@/utils/StateUtil.ts";
import { hasToken } from "@/utils/Auth.ts";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button.tsx";
import { cn, deepEqual, UNPACKR } from "@/lib/utils.ts";
import { useDialog } from "../layout/DialogContext";
import { CommonEndpoint, fetchSingle, QueryResult } from "../../lib/BulkQuery";
import EndpointWrapper, { useDeepCompareMemo } from "./bulkwrapper";
import { Argument } from "@/utils/Command";
import ArgInput from "../cmd/ArgInput";
import { ArgDescComponent } from "../cmd/CommandComponent";
import { singleQueryOptions } from "@/lib/queries";
import { useQuery } from "@tanstack/react-query";

const MemoizedArgInput = React.memo(({ arg, setOutputValue }: {
    arg: Argument,
    setOutputValue: (name: string, value: string) => void
}) => (
    <div className="relative">
        <ArgDescComponent arg={arg} />
        <div className="mb-1 bg-accent border border-slate-500 border-opacity-50 rounded-b-sm rounded-tr-sm">
            <ArgInput
                argName={arg.name}
                breakdown={arg.getTypeBreakdown()}
                min={arg.arg.min}
                max={arg.arg.max}
                initialValue={""}
                setOutputValue={setOutputValue}
            />
        </div>
    </div>
), (prev, next) => prev.arg.name === next.arg.name);

export function ApiFormInputs<T, A extends { [key: string]: string | string[] | undefined }, B extends { [key: string]: string | string[] | undefined }>({
    endpoint, message, default_values, showArguments, label, handle_error, classes, handle_response, children
}: {
    readonly endpoint: CommonEndpoint<T, A, B>;
    message?: ReactNode;
    default_values?: B;
    showArguments?: (keyof A)[];
    label?: ReactNode;
    handle_error?: (error: Error) => void;
    classes?: string;
    handle_response?: (data: Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) => void;
    readonly children?: (data: Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) => ReactNode;
}) {
    const { showDialog } = useDialog();
    const required = useMemo(() => {
        const req: string[] = [];
        for (const [key, value] of Object.entries(endpoint.endpoint.args)) {
            if (!value.arg.optional && (!default_values || !Object.prototype.hasOwnProperty.call(default_values, key))) {
                req.push(key);
            }
        }
        return req;
    }, [endpoint, default_values]);

    // use handleError unless not defined, then use showDialog
    const errorFinal = useCallback((error: Error) => {
        if (handle_error) {
            handle_error(error);
        }
        else {
            showDialog("Error", error.message);
        }
    }, [handle_error, showDialog]);


    const stableDefaults = useDeepCompareMemo(default_values ?
        (Object.fromEntries(Object.entries(default_values).filter(([_, value]) => value !== undefined)) as { [k: string]: string | string[] }) : {});

    // Split the filtering logic into a useMemo
    const filteredArgs = useMemo(() => {
        if ((!required || required.length === 0) && (!showArguments || showArguments.length === 0)) {
            return [];
        }

        return Object.values(endpoint.endpoint.args)
            .filter(arg => !stableDefaults || !Object.prototype.hasOwnProperty.call(stableDefaults, arg.name));
    }, [endpoint, stableDefaults, required, showArguments]);

    // Then simplify renderFormInputs to use it
    const renderFormInputs = useCallback((props: { setOutputValue: (name: string, value: string) => void }) => {
        if (filteredArgs.length === 0) {
            return null;
        }

        return (
            <>
                {filteredArgs.map((arg, index) => (
                    <MemoizedArgInput
                        key={index}
                        arg={arg}
                        setOutputValue={props.setOutputValue}
                    />
                ))}
                <hr className="my-2" />
            </>
        );
    }, [filteredArgs]);

    return (
        <ApiForm
            requireLogin={false}
            required={required}
            message={message}
            endpoint={endpoint}
            label={label}
            default_values={stableDefaults}
            form_inputs={renderFormInputs}
            handle_error={errorFinal}
            handle_response={handle_response}
            classes={classes}
        >{(data) => children ? children(data) : null}
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
    handle_response?: (data: Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) => void;
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
            handle_response={handle_response}
            classes={classes}>
            {(data) => children ? children(data) : null}
        </ApiFormHandler>
    </>
}

export default React.memo(ApiForm, deepEqual) as typeof ApiForm;

export function ApiFormHandler<T, A extends { [key: string]: string | string[] | undefined }, B extends { [key: string]: string | string[] | undefined }>({
    store, endpoint, label, required, handle_error, classes, handle_response, children
}: {
    store: CommandStoreType,
    readonly endpoint: CommonEndpoint<T, A, B>;
    label: ReactNode,
    required?: string[],
    handle_error?: (error: Error) => void,
    classes?: string,
    handle_response?: (data: Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) => void;
    readonly children?: (data: Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) => ReactNode;
}) {
    const [missing, setMissing] = useState<string[]>([]);
    const [queryArgs, setQueryArgs] = useState<{ readonly [key: string]: string | string[] } | null>(null);
    const [fetchTrigger, setFetchTrigger] = useState(0); // Counter to trigger fetches
    const isInitialMount = useRef(true);

    // Keep a ref to the current output state
    const outputRef = useRef<{ [key: string]: string | string[] }>({});

    // Update the ref whenever store output changes
    useEffect(() => {
        outputRef.current = store.getState().output;

        // Also check for missing required fields here
        const missing = required ? required.filter(field => !outputRef.current[field]) : [];
        setMissing(missing);
    }, [store, required]);

    // Configure the query with manual control
    const { data, isFetching, refetch } = useQuery({
        ...singleQueryOptions(endpoint.endpoint, queryArgs || {}, undefined, 10),
        enabled: false, // Prevent automatic fetching on mount
    });

    // Handle fetch triggering with proper state synchronization
    useEffect(() => {
        // Skip the initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Only proceed if we have queryArgs and a non-zero fetchTrigger
        if (queryArgs && fetchTrigger > 0) {
            console.log("Refetching with args:", queryArgs, "fetchTrigger:", fetchTrigger);
            // Reset fetchTrigger to 0 after refetching
            setFetchTrigger(0);
            // Call refetch and handle the response
            refetch().then((observer) => {
                const queryResult = observer.data as QueryResult<T>;
                const error = observer.error as Error ?? queryResult?.error;
                if (error) {
                    if (handle_error) handle_error(typeof error === "string" ? new Error(error) : error);
                } else if (!queryResult?.data) {
                    console.log(observer);
                    if (handle_error) handle_error(new Error("No data returned"));
                } else if (handle_response) {
                    handle_response(observer.data as Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; });
                }
            }).catch((error) => {
                console.log(error.stack);
                if (handle_error) {
                    handle_error(error);
                }
            });
        }
    }, [queryArgs, fetchTrigger, refetch, handle_error, handle_response]);

    const submitForm = useCallback(() => {
        const args = outputRef.current as A;
        setQueryArgs(args as { readonly [key: string]: string | string[] });
        // Increment fetchTrigger to trigger useEffect after state update
        setFetchTrigger(prev => prev + 1);
    }, []);

    // If there are missing required fields, show a notification
    if (missing.length) {
        return <p>Please provide a value for <kbd>{missing.join(", ")}</kbd></p>
    }

    return (
        <>
            {data && children ? children(data as Omit<QueryResult<T>, 'data'> & { data: NonNullable<QueryResult<T>['data']>; }) : null}
            <Button
                variant="outline"
                size="sm"
                className={cn(
                    "border-red-800/70",
                    "me-1",
                    { "disabled cursor-wait": isFetching },
                    classes
                )}
                onClick={submitForm}
                disabled={isFetching}
            >
                {isFetching ? "Submitting..." : label}
            </Button>
        </>
    );
}