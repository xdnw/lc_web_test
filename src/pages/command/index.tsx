import React, { useRef, useState } from 'react';
import CommandComponent from '../../components/cmd/CommandComponent'; // Import CommandComponent
import { CommandStoreType, createCommandStore } from '@/utils/StateUtil.ts';
import {Command, COMMAND_MAP} from '@/utils/Command.ts';
import {useParams} from "react-router-dom";
import {BlockCopyButton} from "@/components/ui/block-copy-button.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";

export default function CommandPage() {
    const { command } = useParams();
    const [cmdObj, setCmdObj] = useState<Command | null>(command ? COMMAND_MAP.get(command) : null);
    // COMMAND_MAP.cmdBuildTest()

    const [initialValues, setInitialValues] = useState<{ [key: string]: string }>({});
    const commandStore = useRef(createCommandStore());

    if (!cmdObj) {
        console.log("Not command");
        return <div>Loading...</div>; // or some loading spinner
    }

    return (
        <>
            <CommandComponent key={cmdObj.name} command={cmdObj} filterArguments={() => true} initialValues={initialValues} commandStore={commandStore.current} />
            <OutputValuesDisplay name={cmdObj?.name} store={commandStore.current} />
        </>
    );
}

export function OutputValuesDisplay({name, store}: {name: string, store: CommandStoreType}) {
    const output = store((state) => state.output);
    const textRef: React.RefObject<HTMLParagraphElement> = useRef(null);
    return (
        <div className="relative">
        <TooltipProvider>
            <BlockCopyButton getText={() => textRef.current ? textRef.current.textContent ?? "" : ''} />
        </TooltipProvider>
        <p className="bg-accent p-2" ref={textRef}>/{name}&nbsp;
            {
                Object.entries(output).map(([name, value]) => (
                    <span key={name} className="me-1">
                        {name}: {value}
                    </span>
                ))
            }
        </p>
        </div>
    );
}