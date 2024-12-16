import ArgInput from "./ArgInput";
import { Argument, Command } from "../../utils/Command";
import { Label } from "../ui/label";
import { CommandStoreType } from "@/utils/StateUtil";
import {useCallback, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from "lucide-react";
import MarkupRenderer from "../ui/MarkupRenderer";

interface CommandProps {
    command: Command,
    filterArguments: (arg: Argument) => boolean,
    initialValues: { [key: string]: string },
    commandStore: CommandStoreType
}

export default function CommandComponent({ command, filterArguments, initialValues, commandStore }: CommandProps) {
    const groupedArgs: Argument[][] = [];

    const argsArr = command.getArguments();
    let lastGroupId = -1;
    let lastGroup: Argument[] = [];

    for (let i = 0; i < argsArr.length; i++) {
        const arg = argsArr[i];
        const group = arg.arg.group;
        if (group == null) {
            groupedArgs.push([arg]);
        } else if (group !== lastGroupId) {
            lastGroup = [arg];
            lastGroupId = group;
            groupedArgs.push(lastGroup);
        } else {
            lastGroup.push(arg);
        }
    }

    return (
    <>
        <h2 className="text-2xl">Command: {command.name}</h2>
        {
            groupedArgs.map((group, index) => {
                const groupExists = group[0].arg.group != null;
                const groupDescExists = command.command.group_descs && command.command.group_descs[group[0].arg.group || 0];
                return (
                    <div className="mb-0.5 px-1 pb-1" key={index + "g"}>
                    {groupExists && 
                        <>
                            <p className="font-bold">
                                {command.command.groups?.[group[0].arg.group || 0] ?? ''}
                            </p>
                            {groupDescExists &&
                                <p className="">
                                    {command.command.group_descs?.[group[0].arg.group || 0] ?? ''}
                                </p>
                            }
                        </>
                    }
                    <div>
                        {group.map((arg, argIndex) => (
                            filterArguments(arg) &&
                            <div className="w-full" key={index + "-" + argIndex + "m"}>
                                <ArgDescComponent arg={arg} />
                                <div
                                    className="mb-1 bg-accent border border-slate-500 border-opacity-50 rounded-b-sm rounded-tr-sm p-1">
                                    <ArgInput argName={arg.name} breakdown={arg.getTypeBreakdown()} min={arg.arg.min}
                                              max={arg.arg.max} initialValue={initialValues[arg.name]}
                                              setOutputValue={commandStore((state) => state.setOutput)}/>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>
                );
            })
        }
    </>
    );
}

export function ArgDescComponent(
{ arg, includeType = false, includeDesc = false, includeExamples = false }:
{
    arg: Argument,
    includeType?: boolean,
    includeDesc?: boolean,
    includeExamples?: boolean,
}) {
    const hide = useRef<boolean>(!includeType && !includeDesc && !includeExamples);
    const desc = arg.getTypeDesc();
    const examples: string[] = arg.getExamples() || []
    const [ showType, setShowType ] = useState<boolean>(includeType);
    const [ showDesc, setShowDesc ] = useState<boolean>(includeDesc);
    const [ showExamples, setShowExamples ] = useState<boolean>(includeExamples);

    // useCallback, accepts boolean, sets hide to that value, and updates includeType, includeDesc, includeExamples
    const setHidden = useCallback((hidden: boolean) => {
        hide.current = hidden;
        setShowType(!hidden);
        setShowDesc(!hidden);
        setShowExamples(!hidden);
    }, [hide, setShowType, setShowDesc, setShowExamples]);

    return (
    <Label className="inline-block rounded-t-sm border border-b-0 border-slate-500 border-opacity-50 bg-accent m-0 p-1 align-top top-0 left-0 me-1 text-xs" style={{marginBottom:"-1px"}}>
        {arg.arg.optional ? <div className="inline-block bg-blue-400 text-blue-800 me-0.5 px-0.5">Optional</div> :
        <div className="inline-block bg-red-400 text-red-800 me-0.5 px-0.5">Required</div>}
        <div className="inline-block bg-white bg-opacity-20 px-0.5">{arg.name}{showType ? ": " + arg.arg.type : ""}</div>
        {hide.current ?
            <ChevronRight onClick={() => setHidden(false)} className="rounded-sm ms-1 cursor-pointer inline-block h-4 w-6 hover:bg-background/50 hover:border hover:border-primary/20 active:bg-background" /> :
            <ChevronLeft onClick={() => setHidden(true)} className="rounded-sm ms-1 cursor-pointer inline-block h-4 w-6 hover:bg-background/50 hover:border hover:border-primary/20 active:bg-background" />}
        {showDesc && <>
            <br/><p className="font-thin text-xs mb-1"><MarkupRenderer content={arg.arg.desc ?? ""} highlight={false}/></p>
            {desc && <p className="font-thin text-xs"><MarkupRenderer content={desc} highlight={false} /></p>}
        </>}
        {showExamples && examples.length > 0 && (
        <p className="font-thin">
            Examples:
            <>
            {examples.map(example => <kbd key={example} className="bg-white bg-opacity-20">{example}</kbd>).reduce((prev, curr) => <> {prev}, {curr} </>)}
            </>
        </p>
        )}
    </Label>
    );
}