import { useState } from "react";
import ArgComponent from "./ArgComponent";
import { Argument, Command } from "../../utils/Command";

export default function CommandComponent({ command, filterArguments, defaults }: {command: Command, filterArguments: (arg: Argument) => boolean, defaults: { [key: string]: string }}) {
    const [argValues, setArgValues] = useState<{ [key: string]: string }>({});

    const handleInputChange = (name: string, value: string) => {
        const copy = { ...argValues };
        if (value) copy[name] = value;
        else delete copy[name];
        setArgValues(copy);
    };

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
                    <div className="m-1 shadow-md border-2 rounded-lg p-1" key={index}>
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
                    <div key={index} className="">
                        {group.map((arg, argIndex) => (
                            filterArguments(arg) &&
                            <ArgComponent key={argIndex} arg={arg} initValue={defaults[arg.name || '']} onInputChange={handleInputChange} />
                        ))}
                    </div>
                    </div>
                );
            })
        }
        <p className="bg-blue-500">/{command.name}&nbsp;
            {
                argValues &&
                Object.entries(argValues).map(([name, value]) => (
                    <span key={name} className="me-1">
                        {name}: {value}
                    </span>
                ))
            }
        </p>
        </>
    );
}