import { useSyncedState } from "@/utils/StateUtil";
import { useState } from "react";
import { Textarea } from "../ui/textarea";

export default function TextInput(
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
        <Textarea
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value);
                    setOutputValue(argName, e.target.value);
                    if (filter) {
                        setIsValid(new RegExp(filter).test(e.target.value));
                    }
                }} 
                className={`${!isValid ? 'border border-2 border-red-500 relative' : ''}`}
                placeholder="Type here..." />
    )
}