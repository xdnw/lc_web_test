import { Input } from "@/components/ui/input";
import { Argument } from "../../utils/Command";
import { useEffect, useRef, useState } from "react";
import { string } from "prop-types";
import ListComponent from "./ListComponent";

interface ArgProps {
    arg: Argument,
    initialValue: string,
    setOutputValue: (value: string) => void
}

export default function ArgComponent({ arg, initialValue, setOutputValue }: ArgProps) {
    const [value, setValue] = useState(initialValue || '');
    const [lastInitial, setLastInitial] = useState(initialValue || '');

    const [isValid, setIsValid] = useState(true);
    const [validText, setValidText] = useState('');

    if ((initialValue || '') !== lastInitial) {
        setValue(initialValue || '');
        setLastInitial(initialValue || '');
        console.log("Initial value changed for " + arg.name + " to " + initialValue);
    }

    // TODO get the primitive type from the command map
    // TODO handle options
    const options = arg.getOptionData();
    if (options.options) {
        const labelled = options.options.map((o) => ({label: o, value: o}));
        return <>
        <ListComponent options={labelled} isMulti={options.multi} />
        </>
    }


    const breakdown = arg.getTypeBreakdown();
    switch (breakdown.element.toLowerCase()) {
        case 'map': {
            return "TODO MAP " + JSON.stringify(breakdown);
        }
        case 'typedfunction': {
            return "TODO TYPEDFUNCTION " + JSON.stringify(breakdown);
        }
        case "double": {
            return (
                <>
                <p className="text-xs text-red-600">{validText}</p>
                <Input type="number" 
                    {...(arg.arg.min !== null ? { min: arg.arg.min } : {})}
                    {...(arg.arg.max !== null ? { max: arg.arg.max } : {})}
                    step="any"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setOutputValue(e.target.value);
                        setIsValid(e.target.checkValidity());
                        setValidText(e.target.validationMessage);
                    }} placeholder="Type here..." 
                    className={`${!isValid ? 'border border-2 border-red-500' : ''}`}
                    />
                </>
            )
        }
        case 'long':
        case "integer":
        case "int": {
            return (
                <>
                <p className="text-xs text-red-600">{validText}</p>
                <Input type="number" 
                    {...(arg.arg.min !== null ? { min: arg.arg.min } : {})}
                    {...(arg.arg.max !== null ? { max: arg.arg.max } : {})}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setOutputValue(e.target.value);
                        setIsValid(e.target.checkValidity());
                        setValidText(e.target.validationMessage);
                    }} placeholder="Type here..." 
                    className={`${!isValid ? 'border border-2 border-red-500' : ''}`}
                    />
                </>
            )
        }
        case "boolean": {
            return <label className="">
                <Input type="checkbox" className="sr-only peer" 
                    checked={value === "1" || value === "true"}
                    onChange={(e) => {
                            setValue(e.target.checked ? "1" : "0");
                            setOutputValue(e.target.checked ? "1" : '');
                    }}
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white-200 dark:peer-checked:after:border-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-800 after:border-gray-300 dark:after:border-gray-700 after:border after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
        }
        case "string": {
            return (
                <Input type="text" 
                    value={value}
                    onChange={(e) => {
                        console.log("Setting value for " + arg.name + " to " + e.target.value);
                    setValue(e.target.value);
                    setOutputValue(e.target.value);
                }} placeholder="Type here..." />
            )
        }
        case 'set': {
            return "TODO SET " + JSON.stringify(breakdown);
        }
        default: {
            return breakdown.element + " UNKNOWN TYPE " + JSON.stringify(breakdown);
        }
    }
}