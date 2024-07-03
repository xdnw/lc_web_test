import { ICommand, STRIP_PREFIXES } from "./Command";

export function commandCompletions(commands: {[key: string]: ICommand}, valPrefix: string): {name: string, value: string}[] {
    // iterate commands
    const options = [];
    for (const [id, command] of Object.entries(commands)) {
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
                value = (modifiedId + "(" + requiredArguments.join(": ") + ": )");
            } else {
                value = (modifiedId + "()");
            }
        } else {
            value = (modifiedId);
        }
        options.push({ name: modifiedId, value: valPrefix + value });
    }
    return options;
}