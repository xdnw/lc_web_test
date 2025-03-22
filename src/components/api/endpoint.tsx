import {Argument, IArgument} from "@/utils/Command.ts";
import {useData, useRegisterQuery} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode, useCallback, useMemo} from "react";
import LoadingWrapper from "@/components/api/loadingwrapper.tsx";
import ApiForm from "@/components/api/apiform.tsx";
import ArgInput from "@/components/cmd/ArgInput.tsx";
import {ArgDescComponent} from "../cmd/CommandComponent";
import {UNPACKR} from "../../lib/utils";
import {JSONValue} from "./internaltypes";
import { CacheType } from "./apitypes";
import EndpointWrapper from "./bulkwrapper";

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