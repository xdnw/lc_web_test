import ListComponent from "@/components/cmd/ListComponent";
import { useState } from "react";



export default function TestInput() {
    const isMulti2 = true;
    const [options, setOptions] = useState<{label: string, value: string}[]>(
        Array.from({length: 100000}, (_, i) => ({label: Math.random().toString(36), value: i.toString()}))
    );
    return <ListComponent argName="test" options={options} isMulti={isMulti2} initialValue={""} setOutputValue={function (name: string, value: string): void {
        console.log(name, value);
    } } />
}