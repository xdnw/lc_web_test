import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";
import {useRef, useState} from "react";
import {COMMANDS} from "../../lib/commands";
import {getColOptions} from "../../pages/custom_table";
import {Button} from "../ui/button";
import {ChevronDown, ChevronUp} from "lucide-react";

function isNumeric(str: string | undefined) {
    if (str) switch (str.toLowerCase()) {
        case "boolean":
        case "int":
        case "integer":
        case "double":
        case "long":
            return true;
    }
    return false;
}

export default function TypedInput(
    {argName, initialValue, filter, filterHelp, placeholder, type, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        filter?: string,
        filterHelp?: string,
        placeholder: keyof typeof COMMANDS.placeholders,
        type: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    const [isValid, setIsValid] = useState(true);
    const [validText, setValidText] = useState('');

    const [collapseColOptions, setCollapseColOptions] = useState(true);
    const [rerender, setRerender] = useState(false);

    const colFilterRef = useRef<HTMLInputElement>(null);
    console.log("PLACEHOLDER " + placeholder)
    const colOptions = useRef<[string, string][]>(getColOptions(placeholder, (f) => type.toLowerCase() === "double" ?
        isNumeric(f.command.return_type) : true));
    const colFilter = useRef("");

    return (
        <>
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
                                       setValidText(`Invalid input. Must be ${filterHelp ? filterHelp + " " : ""}matching pattern: ${filter}`);
                                   } else {
                                       setValidText("");
                                   }
                               }
                           } else {
                               setIsValid(true);
                               setValidText("");
                           }
                       }}
                       className={`${!isValid ? 'border border-2 border-red-500 dark:border-red-800' : ''} px-0 w-full px-1`}
                       pattern={filter ? filter : ".*"}
                       placeholder="Type here..."/>
                {validText && <p className="text-xs font-bold text-red-900 bg-red-500 dark:text-red-300 dark:bg-red-800 rounded-t-sm absolute bottom-full right-0 p-1 ">{validText}</p>}
            </div>
            <div className="mt-1">
                <Button variant="outline" size="sm"
                        className="w-full px-2 rounded justify-start"
                        onClick={() => setCollapseColOptions(!collapseColOptions)}>
                    Add Simple {collapseColOptions ? <ChevronDown/> : <ChevronUp/>}
                </Button>
                <div
                    className={`transition-all duration-200 ease-in-out ${collapseColOptions ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'}`}>
                    <input
                        ref={colFilterRef}
                        type="text"
                        className="px-1 w-full mb-2"
                        placeholder="Filter options"
                        onChange={(e) => {
                            colFilter.current = e.target.value.toLowerCase();
                            setRerender(f => !f);
                        }}
                    />
                    {colOptions.current.filter(([key, value]) => !colFilter.current || key.toLowerCase().includes(colFilter.current) || value.toLowerCase().includes(colFilter.current)).map((option) =>
                        (
                            <Button
                                key={option[0]}
                                variant="outline"
                                size="sm"
                                className={`me-1 mb-1 ${value === ("{" + option[0] + "}") ? "hidden" : ""}`}
                                onClick={() => {
                                    const newValue = "{" + option[0] + "}";
                                    setOutputValue(argName, newValue);
                                    setValue(newValue);
                                }}
                            >
                                {option[0]}:&nbsp;<span key={option[0] + "-span"} className="text-xs opacity-50">{option[1]}</span>
                            </Button>
                        )
                    )}
                </div>
            </div>
        </>
    )
}