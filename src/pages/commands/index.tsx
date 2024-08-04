import React, { useEffect, useState, } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withCommands } from '../../utils/StateUtil';
import { Command, CommandMap } from '../../utils/Command';
import { CommandWeights, cosineSimilarity, loadWeights, toVector } from '../../utils/Embedding';
import ListComponent from '@/components/cmd/ListComponent';
import TriStateInput from '@/components/cmd/TriStateInput';
import MarkupRenderer from '@/components/ui/MarkupRenderer';
import { getCharFrequency } from '@/utils/StringUtil';

function simpleSimilarity(input: string, 
  inputFreq: { [key: string]: number },
  inputWordFreq: Set<string>,
  cmd: Command): number {
  const command = cmd.name.toLowerCase();
  if (command.includes(input)) {
    if (command.startsWith(input)) {
      return 5;
    }
    return 4;
  }
  let inputIndex = 0;
  for (let i = 0; i < command.length; i++) {
    if (command[i] === input[inputIndex]) {
      inputIndex++;
      if (inputIndex === input.length) {
        return 2;
      }
    }
  }
  const commandFreq = cmd.getCharFrequency();
  let freqMatchScore = 0;
  for ( const [char, freq] of Object.entries(inputFreq)) {
    const foundAmt = commandFreq[char] || 0;
    if (foundAmt >= freq) {
      freqMatchScore += Math.min(freq, foundAmt);
    } else {
      const wordFreq = cmd.getWordFrequency();
      for (const word of inputWordFreq) {
        if (!wordFreq.has(word)) {
          return 0;
        }
      }
      return 3;
    }
  }
  return freqMatchScore / input.length;
}

export default function CommandsPage() {
    const [commands, setCommands] = useState<CommandMap | null>(() => (null));
    const [weights, setWeights] = useState<CommandWeights | null>(() => (null));
    const [filter, setFilter] = useState('');
    const [filteredCommands, setFilteredCommands] = useState<Command[] | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [customFilters, setCustomFilters] = useState<{[key: string]: (cmd: Command) => boolean}>(() => ({}));
    const [cmdArgs, setCmdArguments] = useState<{label: string, value: string}[]>([]);
    const [roles, setRoles] = useState<{label: string, value: string}[]>([]);


    useEffect(() => {
        withCommands().then(async f => {
            setCommands(f);
            const allCmds = Object.values(f.getCommands());
            setFilteredCommands(allCmds);
            const argsUnique = new Map<string, number>();
            const rolesUnique = new Map<string, number>();

            for (const cmd of allCmds) {
              if (cmd.command.annotations) {
                if (cmd.command.annotations["role"]) {
                  for (const role of (cmd.command.annotations["role"] as { value: string[] })["value"]) {
                    rolesUnique.set(role, (rolesUnique.get(role) || 0) + 1);
                  }
                }
            }
              
            const args = cmd.getArguments();
            const uniqueArgs: Set<string> = new Set();
            for (const arg of args) {
              for (const child of arg.getTypeBreakdown().getAllChildren()) {
                uniqueArgs.add(child);
              }
            }
            for (const arg of uniqueArgs) {
              argsUnique.set(arg, (argsUnique.get(arg) || 0) + 1);
            }
          }

          setCmdArguments(Array.from(argsUnique.entries()).sort().map(([arg, count]) => ({ label: `${arg} (${count})`, value: arg })));
          setRoles(Array.from(rolesUnique.entries()).sort().map(([role, count]) => ({ label: `${role} (${count})`, value: role })));
        });
    }, []);

    const updateFilteredCommands = (filterValue: string, customFilters: {[key: string]: (cmd: Command) => boolean}) => {
      const inputLower = filterValue.toLowerCase();
      const inputFreq = getCharFrequency(inputLower);
      const inputWordFreq = new Set(inputLower.split(" "));
      const newFilteredCommands = commands && Object.values(commands.getCommands())
        .map((cmd) => ({
          cmd,
          similarityScore: simpleSimilarity(inputLower, inputFreq, inputWordFreq, cmd)
        }))
        .filter(({ cmd, similarityScore }) => {
          const matchesCustomFilters = Object.values(customFilters).every((filterFunc) => filterFunc(cmd));
          return similarityScore > 0 && matchesCustomFilters;
        })
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .map(({ cmd }) => cmd);
    
      setFilteredCommands(newFilteredCommands);
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setFilter(value);
      updateFilteredCommands(value, customFilters);
    };

    async function semanticSearch() {
        let loaded = weights;
        if (!loaded) {
            loaded = await loadWeights();
            setWeights(loaded);
        }
        if (!loaded || !commands) {
            alert("Could not load text weights.");
            return;
        }
        const myVector = await toVector(filter);
        const similarityMap: {[key: string]: number} = {};
        for (const [key, cmd] of Object.entries(commands.getCommands())) {
            const sentence = cmd.toSentence(loaded!);
            if (sentence) {
                similarityMap[key] = cosineSimilarity(sentence.vector,myVector);
            }
        }
        const similarityArray = Object.entries(similarityMap);
        similarityArray.sort((a, b) => b[1] - a[1]);
        const sortedCommands = similarityArray.map(([key]) => commands.get(key));
        setFilteredCommands(sortedCommands);
    }

    return (
        <div>
        <div className="flex w-max max-w-sm items-center space-x-2 pb-1">
          <Input type="search" placeholder="Description" onKeyUp={handleKeyUp} />
          <Button type="submit" size={'sm'} variant='outline' onClick={semanticSearch}>Search</Button>
          <Button type="button" size={'sm'} variant='outline' onClick={() => setShowFilters(!showFilters)}>Filter {showFilters ? "▲" : "▼"}</Button>
        </div>
        {roles.length > 0 && cmdArgs.length > 0 && (<div className={`bg-secondary ${showFilters ? 'mb-1 p-1 pt-0' : 'invisible w-0 h-0 p-0 m-0'}`}>
          Whitelisted
          <CustomTriInput annotation="whitelist" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Whitelisted Coalition
          <CustomTriInput annotation="coalition" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Requires Alliance
          <CustomTriInput annotation="isalliance" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Requires API
          <CustomTriInput annotation="hasapi" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Requires Offshore
          <CustomTriInput annotation="hasoffshore" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Restricted Guild
          <CustomTriInput annotation="isguild" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Roles
          <CustomTriInput annotation="role" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands}/>
          Require Roles (Any)
          <ListComponent options={roles} isMulti={true} initialValue={""} setOutputValue={
            (name: string, value: string) => {
              const optionsSplit = new Set(value.split(","));
              const newCustomFilters = { ...customFilters };
              if (value) {
                const func: (cmd: Command) => boolean = (cmd: Command) => {
                  if (!cmd.command.annotations || !cmd.command.annotations["role"]) return false;
                  const roleAnn: {value: string[], any?: boolean, root?: boolean} = cmd.command.annotations["role"] as {value: string[], any?: boolean, root?: boolean};
                  if (roleAnn.root) return false;
                  for (const role of roleAnn.value as string[]) {
                    if (optionsSplit.has(role)) {
                      return true;
                    }
                  }
                  return false;
                };
                newCustomFilters["hasrole"] = func;
                setCustomFilters(newCustomFilters);
              } else {
                delete newCustomFilters["hasrole"];
                setCustomFilters(newCustomFilters);
              }
              updateFilteredCommands(filter, newCustomFilters);
            }
          }/>
          Has Arguments:
          <TriStateInput argName="hasarg" initialValue="0" setOutputValue={
            (name: string, value: string) => {
              const newCustomFilters = { ...customFilters };
              if (value === "1" || value === "-1") {
                const valueBool = value === "1";
                const func: (cmd: Command) => boolean = (cmd: Command) => !!(cmd.command.arguments && Object.values(cmd.command.arguments).length > 0) === valueBool;
                newCustomFilters["hasarg"] = func;
                setCustomFilters(newCustomFilters);
              } else {
                delete newCustomFilters["hasarg"];
                setCustomFilters(newCustomFilters);
              }
              updateFilteredCommands(filter, newCustomFilters);
            }
          }/>
          Require Arguments (All):
          <ListComponent options={cmdArgs} isMulti={true} initialValue={""} setOutputValue={
            (name: string, value: string) => {
              const optionsSplit = new Set(value.split(","));
              const newCustomFilters = { ...customFilters };
              if (value) {
                  const func: (cmd: Command) => boolean = (cmd: Command) => {
                    if (!cmd.command.arguments) {
                      return false;
                    }
                    const allChildren = new Set(
                      cmd.getArguments().flatMap(arg => arg.getTypeBreakdown().getAllChildren())
                    );
                  for (const required of optionsSplit) {
                    if (!allChildren.has(required)) {
                      return false;
                    }
                  }
                  return true;
                };
                newCustomFilters["hasargs"] = func;
                setCustomFilters(newCustomFilters);
              } else {
                delete newCustomFilters["hasargs"];
                setCustomFilters(newCustomFilters);
              }
              updateFilteredCommands(filter, newCustomFilters);
            }
          }/>
        </div>)}
        {filteredCommands && filteredCommands.map((cmd) => (
          <Card key={cmd.name} className=''>
            <CardHeader>
              <CardTitle><a href={`#command?${cmd.name}`} className="font-bold no-underline hover:underline text-blue-600 dark:text-blue-500">/{cmd.name}</a></CardTitle>
              <CardDescription className="break-words">
              <MarkupRenderer content={cmd.command.desc} highlight={false} />
              <br />annotations: {JSON.stringify(cmd.command.annotations)}
              <br />arguments: {cmd.command.arguments ? Object.keys(cmd.command.arguments) : ""}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      );
}

export function CustomTriInput({
  annotation,
  filter,
  map,
  set,
  update,
}: {
  annotation: string;
  filter: string;
  map: Record<string, (cmd: Command) => boolean>;
  set: React.Dispatch<React.SetStateAction<Record<string, (cmd: Command) => boolean>>>;
  update: (filterValue: string, map: Record<string, (cmd: Command) => boolean>) => void;
}) {
  const handleChange = (name: string, value: string) => {
    const newCustomFilters = { ...map };
    if (value === "1" || value === "-1") {
      const valueBool = value === "1";
      const func: (cmd: Command) => boolean = (cmd: Command) => !!(cmd.command.annotations && cmd.command.annotations[annotation]) === valueBool;
      newCustomFilters[annotation] = func;
      set(newCustomFilters);
    } else {
      delete newCustomFilters[annotation];
      set(newCustomFilters);
    }
    update(filter, newCustomFilters);
  };
  return (
    <TriStateInput
      argName="ignore"
      initialValue="0"
      setOutputValue={handleChange}
    />
  );
}