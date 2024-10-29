import React from "react";
import { useData, useRegisterQuery } from "./DataContext";
import LoadingWrapper from "../api/loadingwrapper";
import ListComponent from "./ListComponent";

interface InputOptions {
    key: string[];
    text?: string[];
    subtext?: string[];
    color?: string[];
    success?: string;
    message?: string;
}

export default function QueryComponent(
    {element, multi, argName, initialValue, setOutputValue}:
    {
        element: string,
        multi: boolean,
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
        useRegisterQuery("input_options", {type: element});
        const { data, loading, error } = useData<{ input_options: InputOptions }>();

        return (
            <LoadingWrapper
            loading={loading}
            error={data?.input_options?.message ?? data?.message ?? error}
            data={data?.input_options?.key ? data?.input_options ?? null : null}
            render={(options) => {
                const labelled: {label: string, value: string, subtext?: string, color?: string}[] = options.key.map((o, i) => ({
                    label: options.text ? options.text[i] : o,
                    value: o,
                    subtext: options.subtext ? options.subtext[i] : undefined,
                    color: options.color ? options.color[i] : undefined
                }));
                return <ListComponent options={labelled} isMulti={multi} initialValue={initialValue} setOutputValue={setOutputValue}/>  
            }}
        />
        );
}
