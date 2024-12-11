import React, { useRef, useEffect, KeyboardEventHandler, useState } from "react";
// @ts-expect-error Clusterize is not typed
import Clusterize from 'clusterize.js';
import 'clusterize.js/clusterize.css';
import CreatableSelect from 'react-select/creatable';
import './list.css';
import { useSyncedStateFunc } from "@/utils/StateUtil";
import Select from "react-select/base";
import { useDialog } from "../layout/DialogContext";
import {Button} from "../ui/button";

export default function ListComponent(
    { argName, options, isMulti, initialValue, setOutputValue }:
    {
        argName: string,
        options: { label: string, value: string, subtext?: string, color?: string }[],
        isMulti: boolean,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = useSyncedStateFunc(initialValue || '', (v) => v ? v.split(',').map((v) => ({ label: v, value: v })) : []);
    const { showDialog } = useDialog();

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab': {
                const option = options.find((o) => o.label === inputValue || o.value === inputValue);
                addValue(option, inputValue);
                event.preventDefault();
                break;
            }
        }
    };

    function addValue(option: { label: string, value: string } | undefined, input: string) {
        if (option) {
            if (!value.find((v) => v.value === option.value)) {
                if (isMulti) {
                    const copy = [...value];
                    copy.push(option);
                    const valueStr = copy.map((v) => v.value).join(',');
                    setOutputValue(argName, valueStr);
                    setValue(copy);
                } else {
                    setValue([option]);
                    setOutputValue(argName, option.value);
                }
                setInputValue('');
            } else {
                showDialog("Value already exists", <>The value <kbd className='bg-secondary rounded px-0.5'>{option.value}</kbd> already exists in the list.</>);
            }
        } else {
            showDialog("Invalid value", <>The value <kbd className='bg-secondary rounded px-0.5'>{input}</kbd> is not a valid option.</>);
        }
    }

    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLOListElement>(null);
    const selectRef = useRef<Select>(null);
    const [clusterize, setClusterize] = useState<Clusterize | null>(null);

    useEffect(() => {
        if (scrollRef.current && contentRef.current && options) {
            const filteredOptions: string[] = [];
            const selectedValueSet: Set<string> = new Set(value.map((v) => v.value));
            const inputLower = inputValue.toLowerCase();
            for (const option of options) {
                if (option.label.toLowerCase().includes(inputLower)) {
                    let li;
                    if (selectedValueSet.has(option.value)) {
                        li = "<li class='bg-input'>" + option.label + "</li>";
                    } else {
                        li = "<li>" + option.label + "</li>";
                    }
                    filteredOptions.push(li);
                }
            }

            if (clusterize) {
                clusterize.update(filteredOptions);
            } else {
                const newClusterize = new Clusterize({
                    rows: filteredOptions,
                    scrollElem: scrollRef.current,
                    contentElem: contentRef.current,
                    tag: 'ol',
                });
                setClusterize(newClusterize);
            }
        }
    }, [inputValue, value]);

    useEffect(() => {
        return () => {
            if (clusterize) clusterize.destroy(true);
        };
    }, []);

    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => {
        setIsFocused(true);
    }
    const handleBlur = () => {
        setTimeout(() => {
            const activeElement = document.activeElement;
            if (scrollRef.current && (scrollRef.current === activeElement || scrollRef.current.contains(activeElement))) {
                return;
            }
            const selectControlElement = selectRef.current?.controlRef;
            if (selectControlElement && (selectControlElement === activeElement || selectControlElement.contains(activeElement))) {
                return;
            }
            setIsFocused(false);
        }, 0);
    };
    useEffect(() => {
        const scrollElement = scrollRef.current;
        scrollElement?.addEventListener('focus', handleFocus, true);
        scrollElement?.addEventListener('blur', handleBlur, true);

        return () => {
            scrollElement?.removeEventListener('focus', handleFocus, true);
            scrollElement?.removeEventListener('blur', handleBlur, true);
        };
    }, []);

    const selectAll = () => {
        setValue(options);
        const valueStr = options.map((v) => v.value).join(',');
        setOutputValue(argName, valueStr);
    };

    return (
        <div className="relative">
            <CreatableSelect
                ref={selectRef}
                className="react-select-container"
                classNamePrefix="react-select"
                inputValue={inputValue}
                isClearable={false}
                isMulti={isMulti}
                menuIsOpen={false}
                onChange={(newValue) => {
                    setValue(newValue as { label: string, value: string }[]);
                    const valueStr = (newValue as { label: string, value: string }[]).map((v) => v.value).join(',');
                    setOutputValue(argName, valueStr);
                }}
                onInputChange={(newValue, actionMeta) => {
                    if (actionMeta.action !== 'input-blur' && actionMeta.action !== 'set-value' && actionMeta.action !== 'menu-close') {
                        setInputValue(newValue);
                    }
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type something and press enter..."
                value={value}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div
                className={`absolute z-10 ${isFocused ? '' : 'invisible'} inset-x-0 bg-background drop-shadow-md shadow-2xl border border-input ps-1 clusterize-scroll`}
                ref={scrollRef}
            >
                <ol className="clusterize-content" ref={contentRef} onClick={(e) => {
                    const target = e.target as HTMLElement;
                    if (target.tagName.toLowerCase() === 'li') {
                        const option = options.find((o) => o.label === target.innerText);
                        if (option) {
                            if (value.find((v) => v.value === option.value)) {
                                const newValue = value.filter((v) => v.value !== option.value);
                                setValue(newValue);
                                const valueStr = (newValue as { label: string, value: string }[]).map((v) => v.value).join(',');
                                setOutputValue(argName, valueStr);
                            } else {
                                addValue(option, option.label);
                            }
                        }
                    }
                }}>
                    <li className="clusterize-no-data">Loading data…</li>
                </ol>
            </div>
            {isMulti && (
                <Button variant="outline" className="w-full rounded-t-none" size="sm" onClick={selectAll}>
                    Select All
                </Button>
            )}
        </div>
    );
}