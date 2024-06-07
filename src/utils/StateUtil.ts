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

export function limitConcurrency(funcs, limit) {
  let active = 0;
  let i = 0;
  const results = new Array(funcs.length);
  return new Promise((resolve, reject) => {
      const run = async () => {
          if (i === funcs.length) {
              if (active === 0) resolve(results);
              return;
          }
          const index = i++;
          const func = funcs[index];
          results[index] = await func();
          active--;
          run();
      };
      while (active < limit && i < funcs.length) {
          active++;
          run();
      }
  });
}


// export function runInWorker(func: (...args: unknown[]) => void, ...args: unknown[]) {
//   return new Promise((resolve, reject) => {
//       // Convert the function to a string of JavaScript code
//       const funcStr = `(${func.toString()})(${args.map(JSON.stringify).join(',')})`;

//       // Create a blob from the function string
//       const blob = new Blob([funcStr], { type: 'text/javascript' });

//       // Create a URL for the blob
//       const url = URL.createObjectURL(blob);

//       // Create a new worker with the blob URL
//       const worker = new Worker(url);

//       // Listen for messages from the worker
//       worker.onmessage = (event) => {
//           // Resolve the promise with the result from the worker
//           resolve(event.data);

//           // Terminate the worker
//           worker.terminate();
//       };

//       // Listen for errors from the worker
//       worker.onerror = (error) => {
//           // Reject the promise with the error from the worker
//           reject(error);

//           // Terminate the worker
//           worker.terminate();
//       };
//   });
// }