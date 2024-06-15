import { useState } from "react";
import { Input } from "../ui/input";
import { Argument } from "@/utils/Command";
import { calculate } from "@/utils/MathUtil";
import { useSyncedState } from "@/utils/StateUtil";

export default function NumberInput(
    {arg, initialValue, setOutputValue, isFloat, className}:
    {
        arg: Argument,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void,
        isFloat: boolean,
        className?: string
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    const [isValid, setIsValid] = useState(true);
    const [validText, setValidText] = useState('');
    const [noteText, setNoteText] = useState('');
    return (
        <>
        <p className="text-xs text-red-600 px-0 mx-0">{validText}</p>
        <div className="px-0 mx-0 m-0">
        <Input type="text" 
            value={value}
            onChange={(e) => {
                const containsAnyExpr = /[\\(\\)+\-*/%^]/.test(e.target.value);
                try {
                    let myNum: number;
                    if (isFloat) {
                        myNum = containsAnyExpr ? calculate(e.target.value) : parseFloat(e.target.value);
                    } else {
                        myNum = containsAnyExpr ? Math.floor(calculate(e.target.value)) : parseInt(e.target.value);
                    }
                    if (Number. isNaN(myNum)) {
                        throw new Error("Invalid number");
                    }
                    if (!Number.isFinite(myNum)) {
                        throw new Error("Number is not finite");
                    }
                    if (arg.arg.min !== null && myNum < arg.arg.min) {
                        throw new Error("Minimum value is " + arg.arg.min + " but got " + myNum);
                    }
                    if (arg.arg.max !== null && myNum > arg.arg.max) {
                        throw new Error("Maximum value is " + arg.arg.max + " but got " + myNum);
                    }
                    setIsValid(true);
                    setOutputValue(arg.name, myNum + "");
                    setValidText("");
                    setNoteText(containsAnyExpr ? myNum + "" : "");
                } catch (err) {
                    setIsValid(false);
                    const message = typeof err === "object" && err !== null && "message" in err ? err.message + "" : "Invalid number";
                    setValidText(message);
                    setNoteText("");
                }
                setValue(e.target.value);
            }} placeholder="Type here..."
            className={`${!isValid ? 'border border-2 border-red-500' : ''} ${className} px-0`}
            />
            <span className={`${noteText ? noteText + " px-1" : ""}`}>{noteText}</span>
            </div>
        </>
    )
}