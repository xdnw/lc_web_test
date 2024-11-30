import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";
import { useState } from "react";

export default function StringInput(
    {argName, initialValue, filter, filterHelp, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        filter?: string,
        filterHelp?: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    const [isValid, setIsValid] = useState(true);
    const [validText, setValidText] = useState('');
    return (
        <>
        <p className="text-xs text-red-600 px-0 mx-0">{validText}</p>
        <div className="flex items-center px-0 mx-0 m-0">
        <Input type="text" 
                    value={value}
                    onChange={(e) => {
                    const myValue = e.target.value;
                    setValue(myValue);
                    setOutputValue(argName, myValue);
                    if (myValue) {
                        if (filter) {
                            const newValid = new RegExp(filter).test(myValue);
                            setIsValid(newValid);
                            if (!newValid) {
                                setValidText(`Invalid input. Must be ${filterHelp ? filterHelp  + " " : ""}matching pattern: ${filter}`);
                            } else {
                                setValidText("");
                            }
                        }
                    } else {
                        setIsValid(true);
                        setValidText("");
                    }
                }} 
                className={`${!isValid ? 'border border-2 border-red-500' : ''}`}
                pattern={filter ? filter : ".*"}
                placeholder="Type here..." />
        </div>
        </>
    )
}