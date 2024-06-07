import React, { useRef, useEffect, KeyboardEventHandler, useState } from "react";
// @ts-expect-error Clusterize is not typed
import Clusterize from 'clusterize.js';
import 'clusterize.js/clusterize.css';
import CreatableSelect from 'react-select/creatable';
import './select.css';
import Select from "node_modules/react-select/dist/declarations/src/Select";


export default function TestInput() {
    const [options, setOptions] = useState<{label: string, value: string}[]>(
        Array.from({length: 100000}, (_, i) => ({label: Math.random().toString(36), value: i.toString()}))
    );

    const [inputValue, setInputValue] = React.useState('');
    const [value, setValue] = useState<{label: string, value: string}[]>([]);
  
    const handleKeyDown: KeyboardEventHandler = (event) => {
      if (!inputValue) return;
      switch (event.key) {
        case 'Enter':
        case 'Tab': {
            const option = options.find((o) => o.label === inputValue);
            // setScrollPosition(0);
            addValue(option, inputValue);
            event.preventDefault();
        }
      }
    };


    // rewrite the above as a function so i can call addValue from the clusterize click event and elsewhere
    function addValue(option: {label: string, value: string} | undefined, input: string) {
        if (option) {
            if (!value.find((v) => v.value === option.value)) {
                setValue((prev) => [...prev, {label: option.label, value: option.value}]);
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
    // const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        if (scrollRef.current && contentRef.current && options) {
            const filteredOptions: string[] = [];
            const selectedValueSet: Set<string> = new Set(value.map((v) => v.value));
            for (const option of options) {
                if (option.label.includes(inputValue)) {
                    let li;
                    if (selectedValueSet.has(option.value)) {
                        li = "<li class='bg-secondary'>" + option.label + "</li>";
                    } else {
                        li = "<li>" + option.label + "</li>";
                    }
                    filteredOptions.push(li);
                }
            }

            if (clusterize) {
                clusterize.update(filteredOptions);
                // if (scrollPosition != 0) {
                    // setTimeout(() => {
                    //     clusterize.update(filteredOptions);
                    //     if (scrollRef.current) {
                    //         scrollRef.current.scrollTop = scrollPosition;
                    //     }
                    // }, 0);
                // }
            } else {
                // If clusterize is not initialized, create a new instance
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
        <h1 className="text-2xl font-bold">
            Test Input</h1>
        <p>
            Num options: {options.length}
        </p>
         <CreatableSelect
         ref={selectRef}
         className="react-select-container"
         classNamePrefix="react-select"
        inputValue={inputValue}
        isClearable={false}
        isMulti
        menuIsOpen={false}
        onChange={(newValue) => setValue(newValue)}
        onInputChange={(newValue, actionMeta) => {
        if (actionMeta.action !== 'input-blur' && actionMeta.action !== 'menu-close' && actionMeta.action !== 'set-value') {
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
      className={`absolute z-10 ${isFocused ? '' : 'invisible'} w-full rounded-md bg-background shadow-lg clusterize-scroll`}
      ref={scrollRef}
      >
        <ol className="clusterize-content" ref={contentRef} onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName.toLowerCase() === 'li') {
                    const option = options.find((o) => o.label === target.innerText);
                    if (option) {
                        // const scrollPos = inputValue === '' ? scrollRef.current?.scrollTop || 0 : 0;
                        // setScrollPosition(scrollPos);
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