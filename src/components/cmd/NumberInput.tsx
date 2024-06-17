import { useState } from "react";
import { Input } from "../ui/input";
import { calculate } from "@/utils/MathUtil";
import { useSyncedState } from "@/utils/StateUtil";

export default function NumberInput(
    {argName, min, max, initialValue, setOutputValue, isFloat, className}:
    {
        argName: string,
        min?: number,
        max?: number,
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
        <div className="flex items-center px-0 mx-0 m-0">
        <Input type="text" 
            value={value}
            onChange={(e) => {
                const myStr = e.target.value;
                if (myStr) {
                    const containsAnyExpr = /[\\(\\)+\-*/%^]/.test(myStr);
                    try {
                        let myNum: number;
                        if (isFloat) {
                            myNum = containsAnyExpr ? calculate(myStr) : parseFloat(myStr);
                        } else {
                            myNum = containsAnyExpr ? Math.floor(calculate(myStr)) : parseInt(myStr);
                        }
                        if (Number. isNaN(myNum)) {
                            throw new Error("Invalid number");
                        }
                        if (!Number.isFinite(myNum)) {
                            throw new Error("Number is not finite");
                        }
                        if (min && myNum < min) {
                            throw new Error("Minimum value is " + min + " but got " + myNum);
                        }
                        if (max && myNum > max) {
                            throw new Error("Maximum value is " + max + " but got " + myNum);
                        }
                        setIsValid(true);
                        setOutputValue(argName, myNum + "");
                        setValidText("");
                        setNoteText(containsAnyExpr ? myNum + "" : "");
                    } catch (err) {
                        setIsValid(false);
                        const message = typeof err === "object" && err !== null && "message" in err ? err.message + "" : "Invalid number";
                        setValidText(message);
                        setNoteText("");
                    }
                } else {
                    setIsValid(true);
                    setOutputValue(argName, "");
                    setValidText("");
                    setNoteText("");
                }
                setValue(myStr);
            }} placeholder="Type here..."
            className={`${!isValid ? 'border border-2 border-red-500' : ''} ${className} px-0`}
            />
            <span className={`${noteText ? noteText + " px-1" : ""}`}>{noteText}</span>
            </div>
        </>
    )
}