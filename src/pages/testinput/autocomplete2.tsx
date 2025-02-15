import { useMemo, useRef, useState } from "react";
import "@webscopeio/react-textarea-autocomplete/style.css";
import { Button } from "@/components/ui/button.tsx";
import {COMMAND_MAP} from "@/utils/Command";
import {ICommand} from "../../utils/Command";
import { ItemType } from "@/components/api/internaltypes";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";

export default function AutoComplete2() {
    return <AutoComplete2Input type="DBNation" />;
}

export function AutoComplete2Input(
{type}:
{
    type: string
}) {
    const [defaultValue, setDefaultValue] = useState<string>("*,#position>1,#vm_turns=0,#isIn(\"AA:Singularity\")=0,#color=blue,#istaxable,#cities>=5,#cities<=2000,Borg");

    const rtaRef = useRef<ReactTextareaAutocomplete<ItemType> | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

    const [outputInfo, setOutputInfo] = useState<string>("");

    const options = useMemo(() => {
        const stripPrefixes = ["get", "is", "can", "has"];
        const obj = COMMAND_MAP.data.placeholders[type].commands;
        const options: ItemType[] = [];
        for (const [id, command] of Object.entries(obj)) {
            let modifiedId = id;
            for (const prefix of stripPrefixes) {
                if (modifiedId.startsWith(prefix)) {
                    modifiedId = modifiedId.slice(prefix.length);
                    break;
                }
            }
            let hasArguments = false;
            const requiredArguments: string[] = [];
            if (command.arguments) {
                for (const arg of Object.values((command as ICommand).arguments ?? {})) {
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
        return options;
    }, [type]);
  
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
                <ReactTextareaAutocomplete<ItemType>
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
                    innerRef={(ref: HTMLTextAreaElement) => {
                        textAreaRef.current = ref;
                    }}
                    onCaretPositionChange={onCaretPositionChange}
                    value={defaultValue}
                    onChange={(e) => setDefaultValue(e.target.value)}
                />
            </div>
        </>
    );
}
//
// function findCompletion(cmdMap: CommandMap, rtaRef: React.MutableRefObject<ReactTextareaAutocomplete<ItemType> | null>, textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>, type: string) {
//     return {
//         dataProvider: (token: string) => {
//             console.log("Current token " + token);
//             if (!cmdMap) return [];
//             const position = rtaRef.current?.getCaretPosition();
//             const content = textAreaRef.current?.value || "";
//             const completion = cmdMap?.getCurrentlyTypingFunction(content, token, position, type)
//             return completion.options.map(({ name, value }) => ({
//                 name,
//                 value,
//                 nameLower: name.toLowerCase(),
//             }));
//           // const tokenLower = token.toLowerCase();
//           // const filtered = options.filter(option => option.nameLower.includes(tokenLower));
//           // const sorted = filtered.sort((a, b) => a.nameLower.indexOf(tokenLower) - b.nameLower.indexOf(tokenLower));
//           // return sorted;
//         },
//         component: Item,
//         output: (item: ItemType, trigger: string) => {
//           console.log("Current item " + item, typeof(item), trigger);
//           return item.value;
//         }
//       };
// }


// function Item({ entity: { name } }: { entity: ItemType }) {
//     return <div>{name}</div>;
// }