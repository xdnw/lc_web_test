import React, { memo, useEffect, useMemo, useState } from 'react';
import CommandComponent from '../../components/cmd/CommandComponent'; // Import CommandComponent
import { withCommands } from '../../utils/StateUtil';
import { Command } from '../../utils/Command';

export default function CommandPage() {
    const [command, setCommand] = useState<Command | null>(null);
    const [initialValues, setInitialValues] = useState<{ [key: string]: string }>({});
    const [outputValues, setOutputValues] = useState<{ [key: string]: string }>({});

    function setOutputValue(name: string, value: string) {
        const copy = { ...outputValues };
        if (value) copy[name] = value;
        else delete copy[name];
        setOutputValues(copy);
    }

    useEffect(() => {
        (async () => {
            const cmdMap = (await withCommands());
            console.log(Object.keys(cmdMap.data.options))
            console.log(cmdMap.data.keys)
            // const commandName: string = "announcement watermark";
            // const fetchedCommand = cmdMap.get(commandName);
            const fetchedCommand = cmdMap.buildTest();
            setCommand(fetchedCommand);
        })();
    }, []);

    const outputValuesDisplay = useMemo(() => (
        <p className="bg-blue-500">/{command?.name}&nbsp;
            {
                Object.entries(outputValues).map(([name, value]) => (
                    <span key={name} className="me-1">
                        {name}: {value}
                    </span>
                ))
            }
        </p>
    ), [outputValues, command?.name]);

    if (!command) {
        console.log("Not command");
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <>
            <CommandComponent key={command.name} command={command} filterArguments={() => true} initialValues={initialValues} setOutputValue={setOutputValue} />
            {outputValuesDisplay}
        </>
    );
    
}