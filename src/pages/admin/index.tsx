import { BlockCopyButton } from '@/components/ui/block-copy-button';
import { Button } from '@/components/ui/button.tsx';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { TooltipProvider } from '@/components/ui/tooltip';
import { hashWithMD5, loadWeights, toVector } from '@/utils/Embedding';
import React, { useRef } from 'react';
import {COMMAND_MAP} from "@/utils/Command.ts";
import {UNPACKR} from "@/lib/utils.ts";

async function testDeserialization() {
    const url = `${process.env.API_URL}test`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/msgpack',
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const serializedData = await response.arrayBuffer();
        const data = new Uint8Array(serializedData);
        const deserializedData = UNPACKR.unpack(data);

        console.log(deserializedData);
        alert(deserializedData);
    } catch (error) {
        console.error('Error fetching or deserializing data:', error);
    }
}

export default function Admin() {
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
    const [progress, setProgress] = React.useState(0);
    const [progressText, setProgressText] = React.useState("");
    const [isSetupRunning, setIsSetupRunning] = React.useState(false);

    async function setup() {
        if (isSetupRunning) {
            alert('Setup is already running');
            return;
        }
        setIsSetupRunning(true);
        try {
            setProgressText("Loading weights...");
            const weights = await loadWeights();
            textareaRef.current!.value = JSON.stringify(weights);

            const commands = COMMAND_MAP;
            const cmdLen = Object.keys(commands).length;
            console.log("Commands: ", cmdLen);

            const funcs = Object.entries(commands).map(([name, group], i) => async () => {
                const fullText = name + " " + group.command.desc;
                const hash = hashWithMD5(fullText);
                const existing = weights[name]
                if (existing && existing.hash === hash) {
                    console.log("Skipping: ", name);
                    return;
                }
                const vector = await toVector(fullText);
                weights[name] = {
                    vector,
                    hash
                };
                await new Promise(r => setTimeout(r, 10));
                return { name, percent: Math.floor((i / cmdLen) * 100) };
            });

            for (const func of funcs) {
                const result = await func();
                if (result) {
                    setProgressText(`- Processing ${result.name}...`);
                    if (result.percent !== progress) {
                        setProgress(result.percent);
                    }
                    console.log("Processed: ", result.name);
                }
            }
            textareaRef.current!.value = JSON.stringify(weights);
        } catch (e) {
            alert(e);
        }
        setProgress(100);
        setProgressText("Done!");
        setIsSetupRunning(false);
    }

    return (
        <>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <hr/>
            <h2 className="text-lg font-bold">Command embeddings</h2>
            <section className="ps-4 pb-4 shadow">
                <p className="">
                    Test the sentence transformer for the command text similarity vectors and hashes for semantic search.
                    The contents should match the weights.json (temp) file
                </p>
                </section>
            <div className="relative">
                <Textarea 
                    disabled
                    ref={textareaRef}
                    placeholder="The command weights will be displayed here..." 
                >
                </Textarea>
                <TooltipProvider>
                <BlockCopyButton getText={() => textareaRef.current ? textareaRef.current.value : ''} />
                </TooltipProvider>
            </div>
            <Button type="submit" className="w-full" variant="outline" size='sm' onClick={async () => {setup();}}>Load Weights</Button>
            <div className="relative">
                <Progress value={progress} max={100} />
                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">
                    <span>{progress}%&nbsp;{progressText}</span>
                </div>
            </div>
            <hr className="my-2"/>
            <h1 className="text-2xl font-bold">Test Deserialization</h1>
            <Button type="submit" className="w-full" variant="outline" size='sm' onClick={async () => {testDeserialization();}}>Test Deserialization</Button>
        </>
    );
}