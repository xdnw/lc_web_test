import React, { useRef, useEffect, KeyboardEventHandler, useState } from "react";
// @ts-expect-error Clusterize is not typed
import Clusterize from 'clusterize.js';
import 'clusterize.js/clusterize.css';
import CreatableSelect from 'react-select/creatable';
import './list.css';
import Select from "node_modules/react-select/dist/declarations/src/Select";
import { useSyncedStateFunc } from "@/utils/StateUtil";

export default function ListComponent(
    {options, isMulti, initialValue, setOutputValue}: 
    {
        options: {label: string, subtext: string | null, value: string}[], 
        isMulti: boolean, 
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = useSyncedStateFunc(initialValue || '', (v) => v ? v.split(',').map((v) => ({label: v, value: v})) : []);
  
    const handleKeyDown: KeyboardEventHandler = (event) => {
      if (!inputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
            const option = options.find((o) => o.label === inputValue);
            addValue(option, inputValue);
            event.preventDefault();
        }
      }
    };

    function addValue(option: {label: string, value: string} | undefined, input: string) {
        if (option) {
            if (!value.find((v) => v.value === option.value)) {
                if (isMulti) {
                    const copy = [...value];
                    copy.push(option);
                    const valueStr = copy.map((v) => v.label).join(',');
                    setOutputValue('value', valueStr);
                    setValue(copy);
                } else {
                    setValue([option]);
                    setOutputValue('value', option.label);
                }
                setInputValue('');
            } else {
                alert('Value already exists: ' + option.label);
            }
        } else {
            alert('Invalid value: ' + input);
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
            for (const option of options) {
                if (option.label.includes(inputValue)) {
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
        scrollElement.addEventListener('focus', handleFocus, true);
        scrollElement.addEventListener('blur', handleBlur, true);
    
        return () => {
          scrollElement.removeEventListener('focus', handleFocus, true);
          scrollElement.removeEventListener('blur', handleBlur, true);
        };
      }, []);
    
    return (
        <>
         <CreatableSelect
         ref={selectRef}
         className="react-select-container"
         classNamePrefix="react-select"
        inputValue={inputValue}
        isClearable={false}
        isMulti={isMulti}
        menuIsOpen={false}
        onChange={(newValue) => {
                setValue(newValue)
                const valueStr = newValue.map((v) => v.label).join(',');
                setOutputValue('value', valueStr);
            }
        }
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
      className={`absolute z-10 ${isFocused ? '' : 'invisible'} w-full bg-background shadow-lg clusterize-scroll`}
      ref={scrollRef}
      >
        <ol className="clusterize-content" ref={contentRef} onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName.toLowerCase() === 'li') {
                    const option = options.find((o) => o.label === target.innerText);
                    if (option) {
                        if (value.find((v) => v.value === option.value)) {
                            setValue((prev) => prev.filter((v) => v.value !== option.value));
                        } else {
                            addValue(option, option.label);
                        }
                    }
                }
            }}>
            <li className="clusterize-no-data">Loading data…</li>
        </ol>
        </div>
    </>
    );
}