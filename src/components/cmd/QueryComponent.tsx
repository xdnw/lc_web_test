import ListComponent from "./ListComponent";
import {INPUT_OPTIONS} from "@/lib/endpoints";
import {useData, useRegisterMultipleQueries} from "./DataContext";
import {WebOptions} from "../../lib/apitypes";
import {useRef} from "react";

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
    return <>
        {INPUT_OPTIONS.useDisplay({
                args: {type: element},
                render: (options) => {
                    const key = options.key_numeric ?? options.key_string ?? [];
                    const labelled = key.map((o, i) => ({
                        label: options.text ? options.text[i] : o + "",
                        value: o + "",
                        subtext: options.subtext ? options.subtext[i] : undefined,
                        color: options.color ? options.color[i] : undefined
                    }));
                    return <ListComponent argName={argName} options={labelled} isMulti={multi} initialValue={initialValue}
                                       setOutputValue={setOutputValue}/>
                }})}
    </>;
}

function combineAndLabelData(data: WebOptions[], queryIds: number[]): {label: string, value: string, subtext?: string, color?: string}[] {
    const labelled = queryIds.map((queryId) => {
        const options = data[queryId];
        const key = options.key_numeric ?? options.key_string ?? [];
        return key.map((o, i) => ({
            label: options.text ? options.text[i] : o + "",
            value: o + "",
            subtext: options.subtext ? options.subtext[i] : undefined,
            color: options.color ? options.color[i] : undefined
        }));
    });
    return labelled.flat();
}

export function CompositeQueryComponent(
    {composites, multi, argName, initialValue, setOutputValue}:
    {
        composites: string[],
        multi: boolean,
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const toArgs = (f: string) => ({type: f});
    const [queryIds] = useRegisterMultipleQueries(composites, INPUT_OPTIONS, toArgs)
    const { queries } = useData<WebOptions>();
    if (!queries) return null;
    const data: WebOptions[] = queries.map((query) => query.data as WebOptions);

    for (const queryId of queryIds) {
        if (!(data[queryId])) {
            return null;
        }
    }

    return <CombinedCompositeComponent data={data} queryIds={queryIds} multi={multi} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
}

function CombinedCompositeComponent(
    {data, queryIds, argName, multi, initialValue, setOutputValue}:
    {
        data: WebOptions[],
        queryIds: number[],
        argName: string,
        multi: boolean,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const combined = useRef(combineAndLabelData(data, queryIds));
    return <ListComponent argName={argName} options={combined.current} isMulti={multi} initialValue={initialValue}
                          setOutputValue={setOutputValue}/>
}