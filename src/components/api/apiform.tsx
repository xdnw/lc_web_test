import React, {ReactNode, useEffect, useRef, useState} from "react";
import {CommandStoreType, createCommandStore, createCommandStoreWithDef} from "@/utils/StateUtil.ts";
import {hasToken} from "@/utils/Auth.ts";
import {Link} from "react-router-dom";
import DOMPurify from "dompurify";
import {Button} from "@/components/ui/button.tsx";
import {UNPACKR} from "@/lib/utils.ts";
import {useDialog} from "../layout/DialogContext";
import { QueryResult } from "../cmd/BulkQuery";
import EndpointWrapper from "./bulkwrapper";

interface FormInputsProps {
    setOutputValue: (name: string, value: string) => void;
}

// requireLogin?: boolean;
// message: ReactNode;
// endpoint: string;
// cache_duration: number;
// label?: ReactNode;
// required?: string[];
// default_values?: { [key: string]: string | string[] };
// form_inputs: React.ComponentType<FormInputsProps> | undefined;
// handle_submit?: (data: A) => boolean;
// handle_loading?: () => void;
// handle_error?: (error: string) => void;
// classes?: string;

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
        {message && required && required.length > 0 && <hr className="my-2"/> }
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

export function ApiFormHandler<T, A extends {[key: string]: string}>({store, endpoint, label, cache_duration, required, handle_submit, handle_loading, handle_error, classes, children}: {
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
        <EndpointWrapper endpoint={endpoint} query={output} cache_duration={cache_duration} batch_wait_ms={0}>
            {children}
        </EndpointWrapper>
            <Button variant="outline" size="sm" className={`border-red-800/70 me-1 ${submit && "disabled cursor-wait"} ${classes ? classes : ""}`} onClick={() => setSubmit(true)}>{label}</Button>
        </>
    );
}