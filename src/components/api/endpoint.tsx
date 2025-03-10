import {Argument, IArgument} from "@/utils/Command.ts";
import {CacheType, useData, useRegisterQuery} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode, useCallback, useMemo} from "react";
import LoadingWrapper from "@/components/api/loadingwrapper.tsx";
import ApiForm from "@/components/api/apiform.tsx";
import ArgInput from "@/components/cmd/ArgInput.tsx";
import {ArgDescComponent} from "../cmd/CommandComponent";
import {UNPACKR} from "../../lib/utils";
import {JSONValue} from "./internaltypes";

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
    typeName: string;
    desc: string;
    argsLower: { [name: string]: string };

    constructor(name: string, url: string, args: { [name: string]: IArgument }, cast: (data: unknown) => T, cache: { type?: CacheType, duration?: number }, typeName: string, desc: string) {
        this.name = name;
        this.url = url;
        this.args = {};
        for (const [key, value] of Object.entries(args)) {
            this.args[key] = new Argument(key, value);
        }
        this.argsLower = Object.fromEntries(Object.entries(args).map(([key, value]) => [key.toLowerCase(), key]));
        this.cast = cast;
        this.cache = { cache_type: cache.type ?? CacheType.LocalStorage, duration: cache.duration ?? 300000, cookie_id: `lc_${name}` };
        this.typeName = typeName;
        this.desc = desc;
    }

    async call(params: { [key: string]: string }): Promise<T> {
        const url = `${process.env.API_URL}${this.url}`;
        return fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/msgpack',
            },
            body: new URLSearchParams(params).toString(),
            credentials: 'include',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
                }
                return response.arrayBuffer();
            })
            .then(serializedData => {
                return UNPACKR.unpack(new Uint8Array(serializedData)) as T;
            })
            .catch((error: unknown) => {
                console.error("Error during fetch:", error);
                if (error instanceof Error) {
                    throw new Error(`Fetch error: ${error.message}`);
                } else {
                    throw new Error("Fetch error: unknown error: " + JSON.stringify(error));
                }
            });
    }
}

export type CommonEndpoint<T, U extends {[key: string]: string | string[] | undefined}, V extends {[key: string]: string | string[] | undefined}> = {
    endpoint: ApiEndpoint<T>;
    useDisplay: (params: {
        args: U;
        render: (data: T) => React.ReactNode;
        renderLoading?: () => React.ReactNode;
        renderError?: (error: string) => React.ReactNode;
    }) => React.ReactNode;
    useForm: (params: {
        default_values?: V;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_response?: (data: T) => void;
        handle_submit?: (args: U) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: string) => void;
        classes?: string;
    }) => React.ReactNode;
};

export function useDisplay<T extends { [key: string]: JSONValue; }>(
    name: string,
    cache: { cache_type: CacheType, duration?: number, cookie_id: string },
    args: {[key: string]: string | string[]}, render: (data: T) => React.ReactNode,
    renderLoading?: () => React.ReactNode,
    renderError?: (error: string) => React.ReactNode): React.ReactNode {
    const [queryId] = useRegisterQuery(name, args, cache);
    const { queries } = useData<T>();
    return <LoadingWrapper<T>
        index={queryId}
        query={queries}
    render={render}
    renderLoading={renderLoading}
    renderError={renderError}
    />
}

export function useForm<T, A extends { [key: string]: string }>(
    url: string,
    args: { [name: string]: Argument },
    message?: React.ReactNode,
    default_values?: { [key: string]: string | string[] },
    showArguments?: string[],
    label?: ReactNode,
    handle_response?: (data: T) => void,
    handle_submit?: (args: A) => boolean,
    handle_loading?: () => void,
    handle_error?: (error: string) => void,
    classes?: string
): React.ReactNode {
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
                            <ArgDescComponent arg={arg}/>
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
                <hr className="my-2"/>
            </>
        );
    }, [args, default_values]);

    return (
        <ApiForm
            requireLogin={false}
            required={required}
            message={message}
            endpoint={url}
            label={label}
            default_values={default_values}
            form_inputs={renderFormInputs}
            handle_response={handle_response}
            handle_loading={handle_loading}
            handle_error={handle_error}
            handle_submit={handle_submit}
            classes={classes}
        />
    );
}

export function combine(cache: { cache_type: CacheType, duration?: number, cookie_id: string }, args: {[key: string]: string | string[]}) {
    const argsString = JSON.stringify(args);
    const encodedArgs = encodeURIComponent(argsString);
    return { cache_type: cache.cache_type, duration: cache.duration, cookie_id: `${cache.cookie_id}_${encodedArgs}` };
}