import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import CommandComponent from '../../components/cmd/CommandComponent'; // Import CommandComponent
import { withCommands } from '../../utils/StateUtil';
import { Command } from '../../utils/Command';

export default function CommandPage() {
    const [command, setCommand] = useState<Command | null>(null);
    const [initialValues, setInitialValues] = useState<{ [key: string]: string }>({});
    const outputValues = useRef<{ [key: string]: string }>({});

    function setOutputValue(name: string, value: string) {
        if (value) outputValues.current[name] = value;
        else delete outputValues.current[name];
    }

    useEffect(() => {
        (async () => {
            const cmdMap = (await withCommands());
            console.log(Object.keys(cmdMap.data.options))
            console.log(cmdMap.data.keys)
            const commandName: string = "announcement watermark";
            const fetchedCommand = cmdMap.get(commandName);
            // const fetchedCommand = cmdMap.buildTest();
            setCommand(fetchedCommand);
        })();
    }, []);

    if (!command) {
        console.log("Not command");
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <>
            <CommandComponent key={command.name} command={command} filterArguments={() => true} initialValues={initialValues} setOutputValue={setOutputValue} />
            <p className="bg-blue-500">/{command?.name}&nbsp;
                {
                    Object.entries(outputValues.current).map(([name, value]) => (
                        <span key={name} className="me-1">
                            {name}: {value}
                        </span>
                    ))
                }
            </p>
        </>
    );
    
}