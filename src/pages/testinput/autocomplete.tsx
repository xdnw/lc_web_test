import {CM, ICommand} from '@/utils/Command';
import { useCallback, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';
import {STRIP_PREFIXES} from "../../utils/Command";

export default function AutoComplete() {
    const type = "DBNation";
    const [options, setOptions] = useState<string[]>([]);

    // TODO both { and # not just the latter
    // TODO cursor move event
    // TODO get the current function
    // TODO get the current argument
    // TODO list the optional arguments
    // display the currently typing argument
    // TODO generate completions for the argument if it has a type and that type has either options or fetchable options
    // OR if the option is placeholder type generate new completions for that placeholder type

    const requestOptions = useCallback(() => {
        const obj = CM.data.placeholders[type].commands;
        // value -> ICommand -> arguments -> iterate and check if `optional` exists and is true
        const options: string[] = [];
        // loop key and value of obj
        for (const [id, command] of Object.entries(obj)) {
            // strip prefixes from id
            let modifiedId = id;
            for (const prefix of STRIP_PREFIXES) {
                if (modifiedId.startsWith(prefix)) {
                    modifiedId = modifiedId.slice(prefix.length);
                    break;
                }
            }
            let hasArguments = false; // Changed to let for mutability
            const requiredArguments: string[] = [];
            if (command.arguments) { // Ensure command.arguments exists
                for (const arg of Object.values((command as ICommand).arguments ?? {})) { // Correctly iterate over values
                    hasArguments = true;
                    if (!arg.optional) {
                        requiredArguments.push(arg.name);
                    }
                }
            }
            if (hasArguments) {
                if (requiredArguments.length > 0) {
                    options.push(modifiedId + "(" + requiredArguments.join(": ") + ": )");
                } else {
                    options.push(modifiedId + "()");
                }
            } else {
                options.push(modifiedId);
            }
        }
        setOptions(options);
    }, [type]);

    return <>
    <TextInput matchAny={true} className="bg-background w-full h-6" requestOnlyIfNoOptions={true} options={options} trigger="#" maxOptions={0} spacer={""} onRequestOptions={requestOptions}/>
    </>
}