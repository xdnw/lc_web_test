import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "@webscopeio/react-textarea-autocomplete/style.css";
import { Button } from "@/components/ui/button.tsx";
import {COMMAND_MAP, CommandMap} from "@/utils/Command";

type ItemType = {
    name: string;
    nameLower: string;
    value: string;
}

function Item({ entity: { name } }: { entity: ItemType }) {
    return <div>{name}</div>;
}


// TODO both { and # not just the latter
// TODO cursor move event
// TODO get the current function
// TODO get the current argument
// TODO list the optional arguments
// display the currently typing argument
// TODO generate completions for the argument if it has a type and that type has either options or fetchable options
// OR if the option is placeholder type generate new completions for that placeholder type


export default function AutoComplete2() {
    const rtaRef = useRef<ReactTextareaAutocomplete<ItemType> | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const setTextAreaRef = (element: HTMLTextAreaElement) => {
        textAreaRef.current = element;
    };

    const [options, setOptions] = useState<ItemType[]>([]);
    const [outputInfo, setOutputInfo] = useState<string>("");
    

    const type = "DBNation";

    // effect set options
    useEffect(() => {
        const stripPrefixes = ["get", "is", "can", "has"];
        const obj = COMMAND_MAP.data.placeholders[type].commands;
        // value -> ICommand -> arguments -> iterate and check if `optional` exists and is true
        const options: ItemType[] = [];
        // loop key and value of obj
        for (const [id, command] of Object.entries(obj)) {
            // strip prefixes from id
            let modifiedId = id;
            for (const prefix of stripPrefixes) {
                if (modifiedId.startsWith(prefix)) {
                    modifiedId = modifiedId.slice(prefix.length);
                    break;
                }
            }
            let hasArguments = false; // Changed to let for mutability
            const requiredArguments: string[] = [];
            if (command.arguments) { // Ensure command.arguments exists
                for (const arg of Object.values(command.arguments)) { // Correctly iterate over values
                    hasArguments = true;
                    if (!arg.optional) {
                        requiredArguments.push(arg.name);
                    }
                }
            }

            let value;
            if (hasArguments) {
                if (requiredArguments.length > 0) {
                    value = "#" + (modifiedId + "(" + requiredArguments.join(": ") + ": )");
                } else {
                    value = "#" + (modifiedId + "()");
                }
            } else {
                value = "#" + (modifiedId);
            }
            options.push({ name: modifiedId, nameLower: id.toLowerCase(), value });
        }
        setOptions(options);
    }, []);
  
    const onCaretPositionChange = (position: number) => {
        const content = textAreaRef.current?.value as string;
        const token = "";
        const info = COMMAND_MAP?.getCurrentlyTypingFunction(content, token, position, type);
        setOutputInfo(JSON.stringify(info));
    };
  
    const resetCaretPosition = () => {
        rtaRef.current?.setCaretPosition(0);
    };
  
    const printCurrentCaretPosition = () => {
        const caretPosition = rtaRef.current?.getCaretPosition();
        const content = textAreaRef.current?.value;
        console.log(`Caret position is equal to ${caretPosition}`);
        console.log(`Content is equal to ${content}`);
    };
  
    return (
        <>
            <div className="app">
                <div className="controls">
                    <Button variant="outline" size="sm" onClick={resetCaretPosition}>Reset caret position</Button>
                    <Button variant="outline" size="sm" onClick={printCurrentCaretPosition}>Print current caret position
                        to the console</Button>
                </div>
                <div className="h-64">
                    {outputInfo}
                </div>
                <ReactTextareaAutocomplete
                    className="my-textarea h-64"
                    loadingComponent={() => <span>Loading</span>}
                    minChar={0}
                    movePopupAsYouType={true}
                    trigger={{
                        // "#": findCompletion(cmdMap!, rtaRef, textAreaRef, type),
                        // "(": findCompletion(cmdMap!, rtaRef, textAreaRef, type),
                        // ":": findCompletion(cmdMap!, rtaRef, textAreaRef, type),
                        // ",": findCompletion(cmdMap!, rtaRef, textAreaRef, type),
                        // " ": findCompletion(cmdMap!, rtaRef, textAreaRef, type),
                    }}
                    ref={rtaRef}
                    innerRef={setTextAreaRef}
                    onCaretPositionChange={onCaretPositionChange}
                />
            </div>
        </>
    );
}

function findCompletion(cmdMap: CommandMap, rtaRef: React.MutableRefObject<ReactTextareaAutocomplete<ItemType> | null>, textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>, type: string) {
    return {
        dataProvider: (token: string) => {
            console.log("Current token " + token);
            if (!cmdMap) return [];
            const position = rtaRef.current?.getCaretPosition();
            const content = textAreaRef.current?.value || "";
            const completion = cmdMap?.getCurrentlyTypingFunction(content, token, position, type)
            return completion.options.map(({ name, value }) => ({
                name,
                value,
                nameLower: name.toLowerCase(),
            }));
          // const tokenLower = token.toLowerCase();
          // const filtered = options.filter(option => option.nameLower.includes(tokenLower));
          // const sorted = filtered.sort((a, b) => a.nameLower.indexOf(tokenLower) - b.nameLower.indexOf(tokenLower));
          // return sorted;
        },
        component: Item,
        output: (item: ItemType, trigger: string) => {
          console.log("Current item " + item, typeof(item), trigger);
          return item.value;
        }
      };
}