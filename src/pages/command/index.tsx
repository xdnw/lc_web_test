import React, { createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import CommandComponent from '../../components/cmd/CommandComponent'; // Import CommandComponent
import { CommandStoreType, createCommandStore, withCommands } from '../../utils/StateUtil';
import { Argument, Command } from '../../utils/Command';
import {useParams} from "react-router-dom";

export default function CommandPage() {
    const { command } = useParams();
    const [cmdObj, setCmdObj] = useState<Command | null>(null);
    const [initialValues, setInitialValues] = useState<{ [key: string]: string }>({});
    const commandStore = useRef(createCommandStore());

    useEffect(() => {
        (async () => {
            const cmdMap = (await withCommands());
            console.log(Object.keys(cmdMap.data.options))
            console.log(cmdMap.data.keys)
            // const commandName: string = "announcement watermark";
            let fetchedCommand;
            if (command) {
                fetchedCommand = cmdMap.get(command);
                if (!fetchedCommand) {
                    alert("Command not found: " + command);
                    return;
                }
            } else {
                fetchedCommand = cmdMap.buildTest();
            }
            // const fetchedCommand = cmdMap.buildTest();

            setCmdObj(fetchedCommand);
        })();
    }, []);

    if (!cmdObj) {
        console.log("Not command");
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <>
            <CommandComponent key={cmdObj.name} command={cmdObj} filterArguments={() => true} initialValues={initialValues} commandStore={commandStore.current} />
            <OutputValuesDisplay command={cmdObj} store={commandStore.current} />
        </>
    );
}

export function OutputValuesDisplay({command, store}: {command: Command, store: CommandStoreType}) {
    const output = store((state) => state.output);
    return (
        <p className="bg-blue-500">/{command?.name}&nbsp;
            {
                Object.entries(output).map(([name, value]) => (
                    <span key={name} className="me-1">
                        {name}: {value}
                    </span>
                ))
            }
        </p>
    );
}