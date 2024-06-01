import { create } from 'zustand';
import { getCommands } from './CommandUtil';
import { CommandMap } from './Command';

type State = {
  commands: CommandMap | null;
  setCommands: (commands: CommandMap) => void;
};

export const cmdStore = create<State>((set) => ({
  commands: null,
  setCommands: (commands) => set({ commands }),
}));

export async function withCommands(): Promise<CommandMap> {
    let commands = cmdStore.getState().commands;
  
    if (!commands) {
      commands = await getCommands();
      cmdStore.getState().setCommands(commands);
    }
  
    return commands;
}