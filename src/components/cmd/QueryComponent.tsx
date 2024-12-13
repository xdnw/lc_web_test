import ListComponent from "./ListComponent";
import {INPUT_OPTIONS} from "@/components/api/endpoints.tsx";

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
