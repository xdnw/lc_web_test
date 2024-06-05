import { Input } from "@/components/ui/input";
import { Argument } from "./Command";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function ArgComponent({ arg, onInputChange }: {arg: Argument, onInputChange: (value: string) => void}) {
    const [inputValue, setInputValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const processedValue = processValue(event.target.value); // process the value
        setInputValue(processedValue);
        onInputChange(processedValue);
    };

    // Function to process the input value
    const processValue = (value: string) => {
        // Add your processing logic here
        return value;
    };

    // const inputRef = useRef(null);

    return (
        <>
            <h3 className="text-xl">{arg.name}</h3>
            <p>optional: {arg.arg.optional ? "true" : "false"}</p>
            <p>flag: {arg.arg.flag}</p>
            <p>desc: {arg.arg.desc}</p>
            <p>type: {arg.arg.type}</p>
            <p>default: {arg.arg.default}</p>
            <p>choices: {arg.arg.choices}</p>
            <p>min: {arg.arg.min}</p>
            <p>max: {arg.arg.max}</p>
            <p>filter: {arg.arg.filter}</p>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label>Email</Label>
                <Input type="email" value={inputValue} onChange={handleChange} placeholder="Email" />
            </div>
        </>
    )
}