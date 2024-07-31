import React, { useEffect, useState, } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withCommands } from '../../utils/StateUtil';
import { Command, CommandMap, getTypeBreakdown, TypeBreakdown } from '../../utils/Command';
import { CommandWeights, cosineSimilarity, loadWeights, toVector } from '../../utils/Embedding';
import BooleanInput from '@/components/cmd/BooleanInput';
import ListComponent from '@/components/cmd/ListComponent';
import TriStateInput from '@/components/cmd/TriStateInput';

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
            const argsUnique = new Set<string>(
                Object.keys(f.data.keys).flatMap(typeStr => getTypeBreakdown(f, typeStr).getAllChildren())
            );
            const rolesUnique = new Set<string>();

            for (const cmd of allCmds) {
                if (cmd.command.annotations) {
                  if (cmd.command.annotations["role"]) {
                      for (const role of (cmd.command.annotations["role"] as { value: string[] })["value"]) {
                        rolesUnique.add(role);
                      }
                  }
                }
            }
            setCmdArguments(Array.from(argsUnique).map((arg) => ({label: arg, value: arg})));
            setRoles(Array.from(rolesUnique).map((role) => ({label: role, value: role})));
        });
    }, []);

    const updateFilteredCommands = (filterValue: string, customFilters: {[key: string]: (cmd: Command) => boolean}) => {
      const newFilteredCommands = commands && Object.values(commands.getCommands()).filter((cmd) => {
        const matchesFilter = cmd.name.includes(filterValue) || (cmd.command.desc != null && cmd.command.desc.split(' ').includes(filterValue));
        const matchesCustomFilters = Object.values(customFilters).every((filterFunc) => filterFunc(cmd));
        return matchesFilter && matchesCustomFilters;
      });
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
        // command => sentence map
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
          <Button type="submit" size={'sm'} variant='outline' onClick={semanticSearch}>Semantic Search</Button>
          <Button type="button" size={'sm'} variant='outline' onClick={() => setShowFilters(!showFilters)}>Filter Tools {showFilters ? "▲" : "▼"}</Button>
        </div>
        {roles.length > 0 && cmdArgs.length > 0 && (<div className={`bg-secondary mb-1 p-1 pt-0 ${showFilters ? '' : 'invisible h-0'}`}>
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
              console.log(optionsSplit);
              const newCustomFilters = { ...customFilters };
              if (value) {
                  const func: (cmd: Command) => boolean = (cmd: Command) => {
                    if (!cmd.command.arguments) return false;
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
            }
          }/>
        </div>)}
        {filteredCommands && filteredCommands.map((cmd) => (
          <Card key={cmd.name}>
            <CardHeader>
              <CardTitle>/{cmd.name}</CardTitle>
              <CardDescription>
              desc: {cmd.command.desc}
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