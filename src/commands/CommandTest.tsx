import React, { useEffect, useState } from 'react';
import CommandComponent from './CommandComponent'; // Import CommandComponent
import { withCommands } from './StateUtil';
import { Command } from './Command';

export default function CommandTest() {
    const commandName: string = "alerts beige beigealert";
    const [command, setCommand] = useState<Command | null>(null);

    useEffect(() => {
        (async () => {
            const fetchedCommand = (await withCommands()).get(commandName);
            setCommand(fetchedCommand);
        })();
    }, [commandName]);

    if (!command) {
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <div>
            <h1>This page tests displaying a command component</h1>
            <CommandComponent command={command} />
        </div>
    );
}