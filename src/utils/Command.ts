import { commandCompletions } from "./CompletionUtil";
import { CommandWeights, Sentence } from "./Embedding";
import { findMatchingBracket, getCharFrequency, splitIgnoringBrackets } from "./StringUtil";

export type IArgument = {
    name: string;
    optional: boolean | null;
    flag: string | null;
    desc: string;
    group: number | null;
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
    breakdown: TypeBreakdown | null = null;
    constructor(name: string, arg: IArgument, command: Command) {
        this.name = name;
        this.arg = arg;
        this.command = command;
    }

    getMap(): CommandMap {
        return this.command.ref;
    }

    clone(): Argument {
        const clonedArg = Object.assign(Object.create(Object.getPrototypeOf(this.arg)), this.arg);
        return new Argument(this.name, clonedArg, this.command);
    }

    getKeyData(): IKeyData {
        const result = this.command.ref.data.keys[this.arg.type];
        if (result == null) {
            return {desc: "", examples: null};
        }
        return result;
    }

    getTypeDesc(): string {
        return this.getKeyData().desc;
    }

    getExamples(): string[] {
        return this.getKeyData().examples || [];
    }

    getOptionData(): OptionData {
        const breakdown = this.getTypeBreakdown();
        let options: IOptionData | null = null;
        let multi = false;
        if ((breakdown.element === "Set" || breakdown.element === "TypedFunction" || breakdown.element === "Predicate") && breakdown.child !== null) {
            options = breakdown.child[0].getOptionData();
            multi = true;
        } else {
            options = breakdown.getOptionData();
        }
        if (options != null) {
            return new OptionData(this.command.ref, options, multi);
        }
        return new OptionData(this.command.ref, {options: null, query: false, completions: false, guild: false, nation: false, user: false}, false);
    }

    getTypeBreakdown(): TypeBreakdown {
        if (this.breakdown != null) return this.breakdown;
        return this.breakdown = getTypeBreakdown(this.command.ref, this.arg.type);
    }
}

class OptionData {
    options: string[] | null;
    query: boolean;
    completions: boolean;
    guild: boolean;
    nation: boolean;
    user: boolean;
    multi: boolean;
    map: CommandMap;

    constructor(map: CommandMap, data: IOptionData, multi: boolean) {
        this.map = map;
        this.options = data.options;
        this.query = data.query || false;
        this.completions = data.completions || false;
        this.guild = data.guild || false;
        this.nation = data.nation || false;
        this.user = data.user || false;
        this.multi = multi;
    }
}

export function getTypeBreakdown(ref: CommandMap, type: string): TypeBreakdown {
    let annotations: string | null = null;
    if (type.endsWith(']')) {
        const annotationStart = type.indexOf('[');
        annotations = type.substring(annotationStart + 1, type.length - 1);
        type = type.substring(0, annotationStart);
    }
    if (type.endsWith('>')) {
        const openBracket = type.indexOf('<');
        const childStr = splitIgnoringBrackets(type.substring(openBracket + 1, type.length - 1), ",");
        const element = type.substring(0, openBracket).trim();
        const child = childStr.map((childType) => getTypeBreakdown(ref, childType.trim()));
        return new TypeBreakdown(ref, element, annotations, child);
    } else {
        return new TypeBreakdown(ref, type, annotations, null);
    }
}

export class Command {
    command: ICommand;
    name: string;
    ref: CommandMap;
    arguments: Argument[] | null = null;
    charFreq: { [key: string]: number } | null = null;
    descWordFreq: Set<string> | null = null;
    
    constructor(name: string, command: ICommand, ref: CommandMap) {
        this.command = command;
        this.name = name;
        this.ref = ref;
    }

    getCharFrequency(): { [key: string]: number } {
        if (this.charFreq == null) this.charFreq = getCharFrequency(this.name);
        return this.charFreq;
    }

    getWordFrequency(): Set<string> {
        if (this.descWordFreq == null) {
            this.descWordFreq = new Set();
            this.command.desc.split(" ").forEach((word) => {
                this.descWordFreq!.add(word.toLowerCase());
            });
            for (const arg of this.getArguments()) {
                for (const child of arg.getTypeBreakdown().getAllChildren()) {
                    this.descWordFreq.add(child.toLowerCase());
                }
                if (arg.arg.desc) {
                    arg.arg.desc.split(/[\s_]+/).forEach((word) => {
                        this.descWordFreq!.add(word.toLowerCase());
                    });
                }
                this.descWordFreq.add(arg.name.toLowerCase());
            }
        }
        return this.descWordFreq;
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
        if (this.arguments == null) {
            if (this.command.arguments) {
                this.arguments = Object.entries(this.command.arguments).map(([name, arg]) => new Argument(name, arg, this));
            } else {
                this.arguments = [];
            }
        }
        return this.arguments;
    }
}

export type Completion = {
    placeholder_type: string,
    command?: ICommand,
    argument?: IArgument,
    options: {
        name: string,
        value: string
    }[]
}

export const STRIP_PREFIXES = ["get", "is", "can", "has"];

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
                    const cmd = new Command(newKey, value as ICommand, this);
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

    getPlaceholderTypes(toSimpleName: boolean): string[] {
        const result = Object.keys(this.data.placeholders);
        if (toSimpleName) {
            return result.map((type) => toPlaceholderName(type));
        }
        return result;
    }

    get(text: string): Command {
        const commands = this.getCommands();
        return commands[text];
    }

    builder(name: string): CommandBuilder {
        return new CommandBuilder(name, this);
    }

    buildTest(): Command {
        // get all argument types
        const allArgs: {[key: string]: IArgument} = {};

        // iterate all commands
        // iterate their arguments
        // add the arg.arg (the IArgument) to the allArgs with the type as the key
        Object.values(this.getCommands()).forEach((cmd) => {
            if (!cmd.command.arguments) {
                return;
            }
            Object.values(cmd.command.arguments).forEach((arg) => {
                if (!allArgs[arg.type]) {
                    allArgs[arg.type] = arg;
                }
            });
        });

        const builder = this.builder("test");
        builder.help("This is a test command")
            .desc("This is a test description");

        // add all the arguments to the command
        Object.entries(allArgs).forEach(([key, arg]) => {
            builder.argument(key, arg.optional == null ? false : arg.optional, arg.desc, arg.type, arg.default, arg.choices, arg.filter);
        });
        return builder.build();
    }

    // getArguments(method: string, placeholder_type: string, argument_content: string): { [key: string]: string } {
    
    // }

    // getType(method: string, placeholder_type: string, argument: string): string {
    
    // }

    searchPlaceholders(placeholder_type: string, functionString: string) {
        const commands: ICommandGroup = this.data.placeholders[placeholder_type];
        const startsWith: {[key: string]: ICommand} = {};
        const completeMatch: {[key: string]: ICommand} = {};
        const funcStrLower = functionString.toLowerCase();
        for (const [key, value] of Object.entries(commands)) {
            if (key === funcStrLower) {
                completeMatch[key] = value as ICommand;
            } else if (key.startsWith(funcStrLower)) {
                startsWith[key] = value as ICommand;
            } else {
                for (const prefix of STRIP_PREFIXES) {
                    const prefixed = prefix + funcStrLower;
                    if (key === prefixed) {
                        completeMatch[key] = value as ICommand;
                    } else if (key.startsWith(prefixed)) {
                        startsWith[key] = value as ICommand;
                    }
                }
            }
        }
        return {
            completeMatch,
            startsWith
        };
    }

    getPlaceholderCommand(placeholder_type: string, functionString: string) {
        const result = this.searchPlaceholders(placeholder_type, functionString);
        return Object.keys(result.completeMatch).length > 0 ? result.completeMatch[Object.keys(result.completeMatch)[0]] : undefined;
    }
    
    getCurrentlyTypingFunction(content: string, token: string, caretPosition: number, placeholder_type: string): Completion {
        // The text typed into the textArea may be in the form:
        // #myFunc(a: blah b: blah2),#myFunc2(a: blah3 b: blah4),#myFuncWithoutArgs,#myFuncEmpty(),#myFuncArgNoValue(a: b:)
        // check the following:
        // - # character, find the end of the argument (if it has brackets, it'll be the matching bracket, otherwise any character that isn't a valid function character)
        // - brackets (skip the contents if the caret isn't inside the brackets)
    
        // Not sure if I want to use the above, but that's a regex for functions
    
        // I want to iterate by character here, starting from 0, I can skip any function if it closes before the caret position
        // If that function has arguments, i need to call the getArguments function

        // # -> function
        // : -> arg value
        // , -> function or arg value (if multiple)
        // space: arg type or arg value
        
        // co
        console.log("CONTENT " + content);
        for (let i = 0; i < caretPosition; i++) {
            const char = content.charAt(i);
            // switch (char) {
            //     case "#":
            //     case "(":
            //     case ",":
            //     case " ":
            //     case ":":
            //         break;
            // }
            if (char === "#") {
                // find the index of the first non valid function character
                let endOfFunction = content.substring(i + 1).search(/[^a-zA-Z0-9_$]/);
                if (endOfFunction == -1) endOfFunction = caretPosition;
                else endOfFunction += i + 1;
                let endOfFunctionAndArgs = endOfFunction;
                const functionString = content.substring(i + 1, endOfFunction);
                console.log("Function " + functionString + " " + endOfFunction);
                // check if the next character is a bracket
                const nextChar = content.charAt(endOfFunction);
                let functionContent = "";

                console.log("NEXT " + nextChar);
                if (nextChar === "(") {
                    // get the bracket end using the bracket matching function StringUtils.findMatchingBracket
                    const bracketEnd = findMatchingBracket(content, endOfFunction);
                    // if its not -1
                    if (bracketEnd !== -1) {
                        console.log("Bracket end " + bracketEnd);
                        functionContent = content.substring(endOfFunction + 1, bracketEnd);
                        endOfFunctionAndArgs = bracketEnd;
                    } else {
                        // suggest arguments
                        console.log("No matching bracket found")
                    }
                }
                // set i to end of function if caret is past it
                if (caretPosition > endOfFunctionAndArgs + 1) {
                    console.log("Caret past function " + caretPosition + " " + endOfFunctionAndArgs)
                    if (endOfFunctionAndArgs > i) {
                        i = endOfFunctionAndArgs;
                    } else {
                        return {
                            placeholder_type: placeholder_type,
                            options: [{
                                name: "BREAK",
                                value: token
                            }]
                        };
                    }
                    continue;
                }
                // if caret position is the bracket, suggest the arguments
                if (functionContent) {
                    if (caretPosition === endOfFunctionAndArgs + 1) {
                        return {
                            placeholder_type: placeholder_type,
                            options: [{
                                name: "END-BRACKET",
                                value: token
                            }]
                        };
                        // is end bracket
                    } else if (caretPosition > endOfFunction) {
                        // get command
                        const command = this.getPlaceholderCommand(placeholder_type, functionString);
                        if (command) {
                            // 1: typing an argument name
                            // 2: typing an argument value
                            // 3: space or comma (and optional space) and about to type an argument name
                            const keys = Object.keys(command.arguments);
                            // anything starting with `key:` and then the text after it
                            // TODO get the arg at the caret position
                            return {
                                placeholder_type: placeholder_type,
                                options: [{
                                    name: "ARGS " + functionContent,
                                    value: token
                                }]
                            };
                        } else {
                            return {
                                placeholder_type: placeholder_type,
                                options: [{
                                    name: "ARGS, UNKNOWN COMMAND " + functionString,
                                    value: token
                                }]
                            };
                        }
                    } else if (caretPosition === endOfFunction) {
                        // is first bracket
                        return {
                            placeholder_type: placeholder_type,
                            options: [{
                                name: "START-BRACKET",
                                value: token
                            }]
                        };
                    } else {
                        // is function part
                        return {
                            placeholder_type: placeholder_type,
                            options: [{
                                name: "MID-FUNC-HAS-ARGS",
                                value: token
                            }]
                        };
                    }
                } else if (caretPosition == endOfFunction) {
                    const commands: ICommandGroup = this.data.placeholders[placeholder_type];
                    const startsWith: {[key: string]: ICommand} = {};
                    const completeMatch: {[key: string]: ICommand} = {};
                    const funcStrLower = functionString.toLowerCase();
                    for (const [key, value] of Object.entries(commands)) {
                        if (key === funcStrLower) {
                            completeMatch[key] = value as ICommand;
                        } else if (key.startsWith(funcStrLower)) {
                            startsWith[key] = value as ICommand;
                        } else {
                            for (const prefix of STRIP_PREFIXES) {
                                const prefixed = prefix + funcStrLower;
                                if (key === prefixed) {
                                    completeMatch[key] = value as ICommand;
                                } else if (key.startsWith(prefixed)) {
                                    startsWith[key] = value as ICommand;
                                }
                            }
                        }
                    }
                    if (Object.keys(completeMatch).length > 0) {
                        // TODO suggest arguments
                        // TODO suggest completions
                        const command = completeMatch[0];
                        return {
                            placeholder_type: placeholder_type,
                            command: command,
                            options: [{
                                name: "COMPLETE-MATCH",
                                value: token
                            }]
                        };
                    } else if (Object.keys(startsWith).length > 0) {
                        let valPrefix = "#";
                        // if token contains # then prefix is all the characters up to and including the LAST #
                        if (token.indexOf("#") !== -1) {
                            valPrefix = token.substring(0, token.lastIndexOf("#") + 1);
                        }
                        return {
                            placeholder_type: placeholder_type,
                            options: commandCompletions(startsWith, valPrefix)
                        };
                    } else {
                        return {
                            placeholder_type: placeholder_type,
                            options: [{
                                name: "END-FUNC-NO-ARGS-NO-MATCH",
                                value: token
                            }]
                        };
                    }
                } else {
                    // middle of function
                    // check if function is valid, provide suggestions
                    return {
                        placeholder_type: placeholder_type,
                        options: [{
                            name: "MID-FUNC-NO_ARGS",
                            value: token
                        }]
                    };
                }
            }
        }
        return {
            placeholder_type: placeholder_type,
            options: [{
                name: "NO-RESULT",
                value: token
            }]
        };
    }


}


export class CommandBuilder {
    command: ICommand;
    name: string;
    parent: CommandMap;

    constructor(name: string, map: CommandMap) {
        this.command = {
            help: "",
            desc: "",
            groups: [],
            group_descs: [],
            annotations: {},
            arguments: {}
        };
        this.name = name;
        this.parent = map;
    }

    help(help: string): CommandBuilder {
        this.command.help = help;
        return this;
    }

    desc(desc: string): CommandBuilder {
        this.command.desc = desc;
        return this;
    }

    argument(name: string, optional: boolean = false, desc: string, type: string, def: string | null, choices: string[] | null, filter: string | null): CommandBuilder {
        const arg: IArgument = {
            name,
            optional,
            flag: null,
            desc,
            group: null,
            type,
            default: def,
            choices,
            min: null,
            max: null,
            filter
        };
        this.command.arguments[name] = arg;
        return this;
    }

    build(): Command {
        return new Command(this.name, this.command, this.parent)
    }
}

function isCommand(obj: ICommandGroup | ICommand): obj is ICommand {
    return (obj as ICommand).help !== undefined && (obj as ICommand).desc !== undefined;
}

export class TypeBreakdown {
    map: CommandMap;
    element: string;
    annotations: string | null;
    child: TypeBreakdown[] | null;

    constructor(map: CommandMap, element: string, annotations: string | null, child: TypeBreakdown[] | null) {
        this.map = map;
        this.element = element;
        this.annotations = annotations;
        this.child = child;
    }

    getAllChildren(): string[] {
        if (this.child == null) return [this.element];
        return this.child.flatMap((child) => child.getAllChildren());
    }

    getPlaceholderTypeName(): string {
        if (this.child != null && this.child.length == 1) {
            return this.child[0].getPlaceholderTypeName();
        }
        return toPlaceholderName(this.element);
    }

    toJSON() {
        return {
            element: this.element,
            annotations: this.annotations,
            child: this.child,
        };
    }

    getPlaceholder(): ICommandGroup | null {
        if (this.child == null || this.element === "Map") return null;
        // const phName = this.getPlaceholderTypeName();
        // console.log("phName" + phName);
        return this.map.data.placeholders[this.child[0].element];
    }

    getOptionData(): OptionData {
        let options: IOptionData | null = null;
        let multi = false;
        if ((this.element === "Set" || this.element === "TypedFunction" || this.element === "Predicate") && this.child !== null) {
            options = this.map.data.options[this.child[0].element];
            multi = true;
        } else {
            options = this.map.data.options[this.element];
        }
        if (options != null) {
            return new OptionData(this.map, options, multi);
        }
        return new OptionData(this.map, {options: null, query: false, completions: false, guild: false, nation: false, user: false}, false);
    }
}

function toPlaceholderName(type: string): string {
    return type.replace("DB", "").replace("Wrapper", "").replace(/[0-9]/g, "");
}