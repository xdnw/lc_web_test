import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";
import { useCallback, useMemo, useState } from "react";
import { COMMANDS } from "../../lib/commands";
import { Button } from "../ui/button";
import { getColOptions } from "@/pages/custom_table/table_util";
import LazyIcon from "../ui/LazyIcon";

function isNumeric(str: string | undefined) {
    if (str) {
        switch (str.toLowerCase()) {
            case "boolean":
            case "int":
            case "integer":
            case "double":
            case "long":
                return true;
        }
    }
    return false;
}

interface TypedInputProps {
    argName: string;
    initialValue: string;
    filter?: string;
    filterHelp?: string;
    placeholder: keyof typeof COMMANDS.placeholders;
    type: string;
    setOutputValue: (name: string, value: string) => void;
}

export default function TypedInput({
    argName,
    initialValue,
    filter,
    filterHelp,
    placeholder,
    type,
    setOutputValue,
}: TypedInputProps) {
    const [value, setValue] = useSyncedState(initialValue || '');
    const [isValid, setIsValid] = useState(true);
    const [validText, setValidText] = useState('');

    // Memoize colOptions based on placeholder and type.
    const colOptions = useMemo<[string, string][]>(() =>
        getColOptions(placeholder, (f) =>
            type.toLowerCase() === "double" ? isNumeric(f.command.return_type) : true
        ),
        [placeholder, type]
    );

    // Handle input change via useCallback.
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const myValue = e.target.value;
            setValue(myValue);
            setOutputValue(argName, myValue);
            if (myValue && filter) {
                const newValid = new RegExp(filter).test(myValue);
                setIsValid(newValid);
                setValidText(
                    !newValid
                        ? `Invalid input. Must be ${filterHelp ? filterHelp + " " : ""}matching pattern: ${filter}`
                        : ""
                );
            } else {
                setIsValid(true);
                setValidText("");
            }
        },
        [argName, filter, filterHelp, setOutputValue, setValue]
    );

    return (
        <>
            <InputField
                value={value}
                isValid={isValid}
                validText={validText}
                onChange={handleInputChange}
                filter={filter}
            />
            <div className="mt-1">
                <OptionsSelector
                    argName={argName}
                    value={value}
                    setValue={setValue}
                    setOutputValue={setOutputValue}
                    colOptions={colOptions}
                />
            </div>
        </>
    );
}

interface InputFieldProps {
    value: string;
    isValid: boolean;
    validText: string;
    filter?: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function InputField({ value, isValid, validText, onChange, filter }: InputFieldProps) {
    const inputClass = useMemo(
        () =>
            `${!isValid ? 'border border-2 border-red-500 dark:border-red-800' : ''} relative px-0 w-full px-1`,
        [isValid]
    );

    return (
        <div className="flex items-center px-0 mx-0 m-0">
            <Input
                type="text"
                value={value}
                onChange={onChange}
                className={inputClass}
                pattern={filter ? filter : ".*"}
                placeholder="Type here..."
            />
            {validText && (
                <p className="text-xs font-bold text-red-900 bg-red-500 dark:text-red-300 dark:bg-red-800 rounded-t-sm absolute bottom-full right-0 p-1">
                    {validText}
                </p>
            )}
        </div>
    );
}

interface OptionsSelectorProps {
    argName: string;
    value: string;
    setValue: (value: string) => void;
    setOutputValue: (name: string, value: string) => void;
    colOptions: [string, string][];
}

function OptionsSelector({
    argName,
    value,
    setValue,
    setOutputValue,
    colOptions,
}: OptionsSelectorProps) {
    const [collapseColOptions, setCollapseColOptions] = useState(true);
    const [colFilter, setColFilter] = useState("");

    const toggleCollapse = useCallback(() => {
        setCollapseColOptions((prev) => !prev);
    }, []);

    const handleColFilterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setColFilter(e.target.value.toLowerCase());
    }, []);

    const filteredOptions = useMemo(
        () =>
            colOptions.filter(
                ([key, val]) =>
                    !colFilter ||
                    key.toLowerCase().includes(colFilter) ||
                    val.toLowerCase().includes(colFilter)
            ),
        [colOptions, colFilter]
    );

    const handleOptionClick = useCallback(
        (optionKey: string) => {
            const newValue = `{${optionKey}}`;
            setOutputValue(argName, newValue);
            setValue(newValue);
        },
        [argName, setOutputValue, setValue]
    );

    const collapseIcon = useMemo(
        () =>
            collapseColOptions ? (
                <LazyIcon name="ChevronDown" />
            ) : (
                <LazyIcon name="ChevronUp" />
            ),
        [collapseColOptions]
    );

    return (
        <>
            <Button
                variant="outline"
                size="sm"
                className="w-full px-2 rounded justify-start"
                onClick={toggleCollapse}
            >
                Add Simple {collapseIcon}
            </Button>
            <div
                className={`transition-all duration-200 ease-in-out ${
                    collapseColOptions ? 'max-h-0 opacity-0 overflow-hidden' : 'p-2 opacity-100'
                }`}
            >
                <input
                    type="text"
                    className="px-1 w-full mb-2 relative"
                    placeholder="Filter options"
                    value={colFilter}
                    onChange={handleColFilterChange}
                />
                {filteredOptions.map(([key, desc]) => {
                    const newValue = `{${key}}`;
                    return (
                        <Button
                            key={key}
                            variant="outline"
                            size="sm"
                            className={`me-1 mb-1 ${value === newValue ? "hidden" : ""}`}
                            onClick={() => handleOptionClick(key)}
                        >
                            {key}:&nbsp;
                            <span className="text-xs opacity-50">{desc}</span>
                        </Button>
                    );
                })}
            </div>
        </>
    );
}