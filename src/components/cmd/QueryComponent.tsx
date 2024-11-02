import React, {useEffect} from "react";
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
        const queryId = useRegisterQuery("input_options", {type: element});
        const { data, loading, error } = useData<InputOptions>();

        return (
            <LoadingWrapper
            index={queryId}
            loading={loading}
            error={error}
            data={data}
            render={(options) => {
                const labelled: {label: string, value: string, subtext?: string, color?: string}[] = options.key.map((o, i) => ({
                    label: options.text ? options.text[i] : o,
                    value: o,
                    subtext: options.subtext ? options.subtext[i] : undefined,
                    color: options.color ? options.color[i] : undefined
                }));
                return <ListComponent argName={argName} options={labelled} isMulti={multi} initialValue={initialValue} setOutputValue={setOutputValue}/>
            }}
        />
        );
}
