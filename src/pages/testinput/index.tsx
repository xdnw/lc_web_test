import ListComponent from "@/components/cmd/ListComponent";
import { useCallback, useState } from "react";



export default function TestInput() {
    const isMulti2 = true;
    const [options, setOptions] = useState<{label: string, value: string}[]>(
        Array.from({length: 100000}, (_, i) => ({label: Math.random().toString(36), value: i.toString()}))
    );

    const debugLog = useCallback((name: string, value: string) => {
        console.log(name, value);
    }, []);

    return <ListComponent argName="test" options={options} isMulti={isMulti2} initialValue={""} setOutputValue={debugLog} />
}