import ArgInput from "./ArgInput";
import { Argument, Command } from "../../utils/Command";
import { Label } from "../ui/label";
import { CommandStoreType } from "@/utils/StateUtil";
import { useCallback } from "react";

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
                    <div className="mb-0.5 bg-black bg-opacity-10 px-1 pb-1" key={index + "g"}>
                    {groupExists && 
                        <>
                            <p className="font-bold">
                                {command.command.groups[group[0].arg.group || 0]}
                            </p>
                            {groupDescExists &&
                                <p className="">
                                    {command.command.group_descs[group[0].arg.group || 0]}
                                </p>
                            }
                        </>
                    }
                    <div>
                        {group.map((arg, argIndex) => (
                            filterArguments(arg) &&
                            <div className="w-full" key={index + "-" + argIndex + "m"}>
                                <ArgDescComponent arg={arg} />
                                <ArgInput argName={arg.name} breakdown={arg.getTypeBreakdown()} min={arg.arg.min} max={arg.arg.max} initialValue={initialValues[arg.name]} setOutputValue={commandStore((state) => state.setOutput)} />
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

export function ArgDescComponent({ arg }: { arg: Argument }) {
    const desc = arg.getTypeDesc();
    const examples: string[] = arg.getExamples() || []
    return (
    <Label>
        {arg.arg.optional ? <span className="inline-block bg-blue-400 text-blue-800 me-1 text-xs px-0.5">Optional</span> : 
        <span className="inline-block bg-red-400 text-red-800 me-1 text-xs px-0.5">Required</span>}
        <span className="text-xs bg-white bg-opacity-20 px-1">{arg.name}: {arg.arg.type}</span><br/><p className="font-thin mb-1">{arg.arg.desc}</p>
        {desc && <p className="text-xs font-thin mb-1">{desc}</p>}
        {examples.length > 0 && (
        <p className="text-xs font-thin mb-1">
            Examples: 
            <>
            {examples.map(example => <kbd key={example} className="bg-white bg-opacity-20">{example}</kbd>).reduce((prev, curr) => <> {prev}, {curr} </>)}
            </>
        </p>
        )}
    </Label>
    );
}