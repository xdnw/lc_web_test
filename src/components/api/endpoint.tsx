import {Argument, IArgument} from "@/utils/Command.ts";
import {CacheType, useData, useRegisterQuery} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode} from "react";
import LoadingWrapper from "@/components/api/loadingwrapper.tsx";
import ApiForm from "@/components/api/apiform.tsx";
import ArgInput from "@/components/cmd/ArgInput.tsx";

interface PlaceholderData {
    type: string;
    fields: {
        [key: string]: boolean | { [key: string]: string };
    };
}

export class AbstractBuilder {
    protected data: PlaceholderData = {
        type: "",
        fields: {}
    };

    set(field: string, value: boolean | { [key: string]: string }): this {
        this.data.fields[field] = value;
        return this;
    }

    build(): PlaceholderData {
        return this.data;
    }
}

export class ApiEndpoint<T> {
    name: string;
    url: string;
    args: { [name: string]: Argument };
    cast: (data: unknown) => T;
    cache: { cache_type: CacheType, duration?: number, cookie_id: string };

    constructor(name: string, url: string, args: { [name: string]: IArgument }, cast: (data: unknown) => T, cache: { type?: CacheType, duration?: number }) {
        this.name = name;
        this.url = url;
        this.args = {};
        for (const [key, value] of Object.entries(args)) {
            this.args[key] = new Argument(key, value);
        }
        this.cast = cast;
        this.cache = { cache_type: cache.type ?? CacheType.None, duration: cache.duration ?? 0, cookie_id: `lc_${name}` };
    }
}

export type CommonEndpoint<T, U extends {[key: string]: string}, V extends {[key: string]: string}> = {
    endpoint: ApiEndpoint<T>;
    useDisplay: (params: {
        args: U;
        render: (data: T) => React.ReactNode;
        renderLoading?: () => React.ReactNode;
        renderError?: (error: string) => React.ReactNode;
    }) => React.ReactNode;
    useForm: (params: {
        default_values?: V;
        label?: ReactNode;
        message?: ReactNode;
        handle_response?: (data: T, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void;
        handle_submit?: (args: U, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean;
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void;
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void;
        classes?: string;
    }) => React.ReactNode;
};

export function useDisplay<T>(
    name: string,
    cache: { cache_type: CacheType, duration?: number, cookie_id: string },
    args: {[key: string]: string}, render: (data: T) => React.ReactNode,
    renderLoading?: () => React.ReactNode,
    renderError?: (error: string) => React.ReactNode): React.ReactNode {
    const [queryId] = useRegisterQuery(name, args, cache);
    const { data, loading, error } = useData<T>();
    return <LoadingWrapper<T>
        index={queryId}
    loading={loading}
    error={error}
    data={data}
    render={render}
    renderLoading={renderLoading}
    renderError={renderError}
    />
}

export function useForm<T, A extends { [key: string]: string }>(
    url: string,
    args: { [name: string]: Argument },
    message?: React.ReactNode,
    default_values?: { [key: string]: string },
    label?: ReactNode,
    handle_response?: (data: T, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_submit?: (args: A, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
    handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    classes?: string): React.ReactNode {
    const required: string[] = [];
    for (const [key, value] of Object.entries(args)) {
        if (!value.arg.optional && (!default_values || !Object.prototype.hasOwnProperty.call(default_values, key))) {
            required.push(key);
        }
    }
    return <ApiForm
        requireLogin={false}
    required={required}
    message={message}
    endpoint={url}
    label={label}
    default_values={default_values}
    form_inputs={(props) => <>
        {Object.values(args).filter(arg => !default_values || !Object.prototype.hasOwnProperty.call(default_values, arg.name)).map((arg, index) => {
                return <ArgInput key={index} argName={arg.name} breakdown={arg.getTypeBreakdown()} min={arg.arg.min} max={arg.arg.max} initialValue={""} setOutputValue={props.setOutputValue} />
            })}
    </>}
    handle_response={handle_response}
    handle_loading={handle_loading}
    handle_error={handle_error}
    handle_submit={handle_submit}
    classes={classes}
    />
}

export function combine(cache: { cache_type: CacheType, duration?: number, cookie_id: string }, args: {[key: string]: string}) {
    const argsString = JSON.stringify(args);
    const encodedArgs = encodeURIComponent(argsString);
    return { cache_type: cache.cache_type, duration: cache.duration, cookie_id: `${cache.cookie_id}_${encodedArgs}` };
}