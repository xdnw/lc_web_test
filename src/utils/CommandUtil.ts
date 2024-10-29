import { CommandMap, ICommandMap } from "./Command";

export async function getCommands(): Promise<CommandMap> {
    const url = `${import.meta.env.BASE_URL}assets/commands.json`;
    console.log("Fetching commands from: ", url);
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const commands: ICommandMap = await response.json();
    return new CommandMap(commands);
}