import { Input } from "@/components/ui/input";
import { Argument } from "../../utils/Command";
import { Label } from "@/components/ui/label";
import { useEffect, useRef, useState } from "react";
// @ts-expect-error Clusterize is not typed
import Clusterize from 'clusterize.js';
import 'clusterize.js/clusterize.css';
import ReactSelect from "@/components/ui/ReactSelect";
import { AsyncPaginate } from 'react-select-async-paginate';

export default function ArgComponent({ arg, initValue, onInputChange }: {arg: Argument, initValue: string | null, onInputChange: (name: string, value: string) => void}) {

    const [value, setValue] = useState<string>(initValue || '');

    const handleChange = (newValue: string) => {
        setValue(newValue);
        onInputChange(arg.name, newValue);
    };

    let options: string[] | null = null;
    if (arg.arg.choices != null) {
        console.log("Generate choices");
        // options = Object.values(arg.arg.choices);
        // Generate dummy data of 5000 uuids
        options = Array.from({length: 50000}, () => Math.random().toString(36));
    }
    // Choices makes it a list input
    // min/max make it a number input
    // Filter add a pattern
    // default sets the default if no value is set
    return (
        <>
            <div className="w-full mb-1">
                <Label>
                    {arg.arg.optional ? <span className="inline-block rounded-md bg-blue-400 text-blue-800 me-1 text-xs px-1">Optional</span> : 
                    <span className="inline-block rounded-md bg-red-400 text-red-800 me-1 text-xs px-1">Required</span>}
                    {arg.name}: {arg.arg.type}<br/><p className="font-thin mb-1">{arg.arg.desc}</p>
                </Label>
                <ListComponent options={options} value={value} handleChange={handleChange} />
            </div>
        </>
    )
}

export function ListComponent({options, value, handleChange}: {options: string[] | null, value: string, handleChange: (newValue: string) => void}) {
    // {/* <p>default: {arg.arg.default}</p> */}
    //         {/* <p>choices: {arg.arg.choices}</p> */}
    //         {/* <p>min: {arg.arg.min}</p> */}
    //         {/* <p>max: {arg.arg.max}</p> */}
    //         {/* <p>filter: {arg.arg.filter}</p> */}

    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
        if (scrollRef.current && contentRef.current && options) {
            console.log(scrollRef.current, contentRef.current);
            console.log("Options " + JSON.stringify(options));
            const inTr = [];
            for (const option of options) {
                inTr.push("<tr><td>" + option + "</td></tr>");
            }
            const clusterize = new Clusterize({
                rows: inTr,
                scrollElem: scrollRef.current,
                contentElem: contentRef.current,
            });
    
            return () => {
                clusterize.destroy(true);
            };
        }
    }, [options]);
    if (options) {
        // return (
        //     <ReactSelect
        //     options={labelled}
        //     onChange={(selectedValue) => setSelectedOption(selectedValue)}
        //     value={selectedOption}
        //   />
        // );
        return (
            <>
            <Input className="form-control form-control-sm" type="text" placeholder="Select.." />
            <div className="clusterize">
                <table className="">
                    <thead>
                    <tr>
                        <th>Option</th>
                    </tr>
                    </thead>
                </table>
                <div className="clusterize-scroll" ref={scrollRef}>
                    <table className="">
                        <tbody className="clusterize-content" ref={contentRef}>
                        <tr className="clusterize-no-data">
                            <td>Loading data…</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </>
        );
    } else {
    return (
        <Input type="text" value={value} onChange={(e) => handleChange(e.target.value)} placeholder="Type here..." className="p-0 h-5" />
    );
}
}