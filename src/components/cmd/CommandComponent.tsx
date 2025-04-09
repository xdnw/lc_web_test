import ArgInput from "./ArgInput";
import { Argument, Command } from "../../utils/Command";
import { Label } from "../ui/label";
import { useCallback, useMemo, useRef, useState } from "react";
import MarkupRenderer from "../ui/MarkupRenderer";
import LazyIcon from "../ui/LazyIcon";

interface CommandProps {
    command: Command,
    overrideName?: string,
    filterArguments: (arg: Argument) => boolean,
    initialValues: { [key: string]: string },
    setOutput: (key: string, value: string) => void
}

export default function CommandComponent({ command, overrideName, filterArguments, initialValues, setOutput }: CommandProps) {
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
            <h2 className="text-lg">{overrideName ?? command.name}</h2>
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
                                        <p>
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
                                                setOutputValue={setOutput} />
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
    const [hide, setHide] = useState<boolean>(!includeType && !includeDesc && !includeExamples);
    const desc = arg.getTypeDesc();
    const examples = useMemo(() => {
        const ex = arg.getExamples();
        if (ex) {
            return Array.isArray(ex) ? ex : [ex];
        }
        return [];
    }, [arg]);
    const [showType, setShowType] = useState<boolean>(includeType);
    const [showDesc, setShowDesc] = useState<boolean>(includeDesc);
    const [showExamples, setShowExamples] = useState<boolean>(includeExamples);


    const optionalBadge = useMemo(() => {
        return arg.arg.optional
            ? <div className="inline-block bg-blue-400 text-blue-800 me-0.5 px-0.5">Optional</div>
            : <div className="inline-block bg-red-400 text-red-800 me-0.5 px-0.5">Required</div>;
    }, [arg.arg.optional]);

    const toggleIcon = useMemo(() => {
        return hide ?
            <LazyIcon name="ChevronRight" className="rounded-sm ms-1 inline-block h-4 w-6 active:bg-background" /> :
            <LazyIcon name="ChevronLeft" className="rounded-sm ms-1 inline-block h-4 w-6 active:bg-background" />;
    }, [hide]);

    const descriptionContent = useMemo(() => {
        if (!showDesc) return null;
        return (
            <>
                <br />
                <p className="font-thin text-xs mb-1"><MarkupRenderer content={arg.arg.desc ?? ""} highlight={false} /></p>
                {desc && <p className="font-thin text-xs"><MarkupRenderer content={desc} highlight={false} /></p>}
            </>
        );
    }, [showDesc, arg.arg.desc, desc]);

    const examplesContent = useMemo(() => {
        if (!showExamples || examples.length === 0) return null;
        return (
            <p className="font-thin">
                Examples:
                {examples
                    .map(example => <kbd key={example} className="bg-white bg-opacity-20">{example}</kbd>)
                    .reduce((prev, curr) => <> {prev}, {curr} </>)}
            </p>
        );
    }, [showExamples, examples]);

    const toggleHidden = useCallback(() => {
        setHide(f => !f);
        setShowType(f => !f);
        setShowDesc(f => !f);
        setShowExamples(f => !f);
    }, [setHide, setShowType, setShowDesc, setShowExamples]);


    return (
        <Label className="inline-block rounded-t-sm border border-slate-500 border-b-0 bg-accent m-0 p-1 align-top top-0 left-0 me-1 text-xs" style={{ marginBottom: "-1px" }}>
            {optionalBadge}
            <div className="inline-block cursor-pointer rounded border border-transparent hover:bg-background/50 hover:border hover:border-primary/20" onClick={toggleHidden}>
                <span className="bg-white/20 px-0.5">
                    {arg.name}{showType ? ": " + arg.arg.type : ""}
                </span>
                {toggleIcon}
            </div>
            {descriptionContent}
            {examplesContent}
        </Label>
    );
}