import { CommandMap, ICommandMap } from "./Command";

// function to read the value of commands.js file and cache it in memory via zustand
export async function getCommands(): Promise<CommandMap> {
    const url = `${import.meta.env.BASE_URL}/assets/commands.json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const commands: ICommandMap = await response.json();
    return new CommandMap(commands);
}

export async function loadWeights(): Promise<{[key: string]: {
    vector: number[],
    hash: string
}}> {
    const url = `${import.meta.env.BASE_URL}/assets/weights.json`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const weights = await response.json();
    return weights;
}