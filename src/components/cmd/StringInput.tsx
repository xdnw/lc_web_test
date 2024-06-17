import { Argument } from "@/utils/Command";
import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";
import { useState } from "react";

export default function StringInput(
    {argName, initialValue, filter, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        filter?: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    const [isValid, setIsValid] = useState(true);
    return (
        <Input type="text" 
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value);
                    setOutputValue(argName, e.target.value);
                    if (filter) {
                        setIsValid(new RegExp(filter).test(e.target.value));
                    }
                }} 
                className={`${!isValid ? 'border border-2 border-red-500' : ''}`}
                pattern={filter ? filter : ".*"}
                placeholder="Type here..." />
    )
}