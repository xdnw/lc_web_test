import { CommandWeights, Sentence } from "./Embedding";

export type IArgument = {
    name: string;
    optional: boolean | null;
    flag: string | null;
    desc: string;
    type: string;
    default: string | null;
    choices: string[] | null;
    min: number | null;
    max: number | null;
    filter: string | null;
}
  
export type ICommand = {
    help: string;
    desc: string;
    groups: string[];
    group_descs: string[];
    annotations: { [key: string]: object };
    arguments: { [name: string]: IArgument };
}

export type ICommandGroup = {
    [name: string]: ICommandGroup | ICommand;
}

export type IKeyData = {
    desc: string;
    examples: string[] | null;
}
  
export type IOptionData = {
    options: string[] | null;
    query: boolean | null;
    completions: boolean | null;
    guild: boolean | null;
    nation: boolean | null;
    user: boolean | null;
  }
  
export type ICommandMap = {
    commands: ICommandGroup;
    placeholders: { [name: string]: ICommandGroup };
    keys: { [name: string]: IKeyData };
    options: { [name: string]: IOptionData };
}

export class Argument {
    name: string;
    arg: IArgument;
    command: Command;
    constructor(name: string, arg: IArgument, command: Command) {
        this.name = name;
        this.arg = arg;
        this.command = command;
    }
}

export class Command {
    command: ICommand;
    name: string;
    ref: CommandMap;
    constructor(name: string, command: ICommand, ref: CommandMap) {
        this.command = command;
        this.name = name;
        this.ref = ref;
    }

    getFullText(): string {
        return `${this.name} ${this.command.desc}`;
    }

    toSentence(weights: CommandWeights): Sentence {
        const weight = weights[this.name];
        return weight && {
            text: this.getFullText(),
            vector: weight.vector
        };
    }

    getArguments(): Argument[] {
        return Object.entries(this.command.arguments).map(([name, arg]) => new Argument(name, arg, this));
    }
}

export class CommandMap {
    data: ICommandMap;
    flat: { [key: string]: Command } | null = null;
    constructor(commands: ICommandMap) {
        this.data = commands;
    }

    getCommands(): {[key: string]: Command} {
        if (this.flat !== null) return this.flat;
        const flatCommands: { [key: string]: Command } = {};
        const flattenCommands = (commandGroup: ICommandGroup, prefix: string) => {
            Object.keys(commandGroup).forEach(key => {
                const value = commandGroup[key];
                const newKey: string = prefix ? `${prefix} ${key}` : key;
                if (isCommand(value)) {
                    const cmd = new Command(newKey, value as ICommand);
                    flatCommands[newKey] = cmd;
                } else {
                    flattenCommands(value, newKey);
                }
            });
        };
        flattenCommands(this.data.commands, "");
        this.flat = flatCommands;
        return flatCommands;
    }

    get(text: string): Command {
        const commands = this.getCommands();
        return commands[text];
    }
}

function isCommand(obj: ICommandGroup | ICommand): obj is ICommand {
    return (obj as ICommand).help !== undefined && (obj as ICommand).desc !== undefined;
}