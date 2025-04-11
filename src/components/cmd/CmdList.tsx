import React, { useCallback, useState, } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Input } from '@/components/ui/input';
// import { CommandWeights, cosineSimilarity, loadWeights, toVector } from '../../utils/Embedding';
import ListComponent from '@/components/cmd/ListComponent';
import TriStateInput from '@/components/cmd/TriStateInput';
import MarkupRenderer from '@/components/ui/MarkupRenderer';
import { getCharFrequency, simpleSimilarity } from '@/utils/StringUtil';
import { Command } from "@/utils/Command.ts";
import { useDialog } from "../layout/DialogContext";

export default function CmdList({ commands, prefix }: { commands: Command[], prefix: string }) {
    const { showDialog } = useDialog();

    // const [weights, setWeights] = useState<CommandWeights | null>(() => (null));
    const [filter, setFilter] = useState('');
    const [filteredCommands, setFilteredCommands] = useState<Command[]>(commands);
    const [showFilters, setShowFilters] = useState(false);
    const [customFilters, setCustomFilters] = useState<{ [key: string]: (cmd: Command) => boolean }>(() => ({}));

    const [cmdArgs] = useState<{ label: string, value: string }[]>(() => {
        const argsUnique = new Map<string, number>();
        for (const cmd of commands) {
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
        return Array.from(argsUnique.entries()).sort().map(([arg, count]) => ({ label: `${arg} (${count})`, value: arg }));
    });
    const [roles] = useState<{ label: string, value: string }[]>(() => {
        const rolesUnique = new Map<string, number>();
        for (const cmd of commands) {
            if (cmd.command.annotations) {
                if (cmd.command.annotations["role"]) {
                    for (const role of (cmd.command.annotations["role"] as { value: string[] })["value"]) {
                        rolesUnique.set(role, (rolesUnique.get(role) || 0) + 1);
                    }
                }
            }
        }
        return Array.from(rolesUnique.entries()).sort().map(([role, count]) => ({ label: `${role} (${count})`, value: role }));
    });

    const updateFilteredCommands = useCallback((filterValue: string, customFilters: { [key: string]: (cmd: Command) => boolean }) => {
        const inputLower = filterValue.toLowerCase();
        const inputFreq = getCharFrequency(inputLower);
        const inputWordFreq = new Set(inputLower.split(" "));
        const newFilteredCommands = commands
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
    }, [commands, setFilteredCommands]);

    const handleKeyUp = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setFilter(value);
        updateFilteredCommands(value, customFilters);
    }, [customFilters, updateFilteredCommands]);

    // const semanticSearch = useCallback(async () => {
    //     let loaded = weights;
    //     if (!loaded) {
    //         loaded = await loadWeights();
    //         setWeights(loaded);
    //     }
    //     if (!loaded || !commands) {
    //         showDialog("Error", "Could not load text weights.");
    //         return;
    //     }
    //     const myVector = await toVector(filter);
    //     const similarityMap: [Command, number][] = [];
    //     for (const cmd of commands) {
    //         const sentence = cmd.toSentence(loaded);
    //         if (sentence) {
    //             console.log("Sentence vector", sentence.vector);
    //             similarityMap.push([cmd, cosineSimilarity(sentence.vector, myVector)]);
    //         }
    //     }
    //     const sortedCommands = similarityMap.sort((a, b) => b[1] - a[1]).map(([cmd]) => cmd);
    //     setFilteredCommands(sortedCommands);
    // }, [weights, commands, filter, setWeights, setFilteredCommands, showDialog]);

    const toggleFilters = useCallback(() => {
        setShowFilters((prev) => !prev);
    }, [setShowFilters]);

    const hasRoleOutput = useCallback((name: string, value: string) => {
        const optionsSplit = new Set(value.split(","));
        const newCustomFilters = { ...customFilters };
        if (value) {
            const func: (cmd: Command) => boolean = (cmd: Command) => {
                if (!cmd.command.annotations || !cmd.command.annotations["role"]) return false;
                const roleAnn: { value: string[], any?: boolean, root?: boolean } = cmd.command.annotations["role"] as { value: string[], any?: boolean, root?: boolean };
                if (roleAnn.root) return false;
                for (const role of roleAnn.value) {
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
    }, [customFilters, setCustomFilters, filter, updateFilteredCommands]);

    const hasArgOutput = useCallback((name: string, value: string) => {
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
    }, [customFilters, setCustomFilters, filter, updateFilteredCommands]);

    const reqArgOutput = useCallback((name: string, value: string) => {
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
    }, [customFilters, setCustomFilters, filter, updateFilteredCommands]);

    return (
        <div>
            <div className="flex w-full items-center pb-1">
                <Input className="relative grow" type="search" placeholder="Description" onKeyUp={handleKeyUp} />
                {/* <Button type="submit" size={'sm'} variant='outline' onClick={semanticSearch} aria-label='search' className='me-1'>🔍</Button> */}
                <Button type="button" size={'sm'} variant='outline' onClick={toggleFilters}>Filter {showFilters ? "▲" : "▼"}</Button>
            </div>
            {roles.length > 0 && cmdArgs.length > 0 && (<div className={`bg-secondary ${showFilters ? 'mb-1 p-1 pt-0' : 'invisible w-0 h-0 p-0 m-0'}`}>
                Whitelisted
                <CustomTriInput annotation="whitelist" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Whitelisted Coalition
                <CustomTriInput annotation="coalition" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Requires Alliance
                <CustomTriInput annotation="isalliance" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Requires API
                <CustomTriInput annotation="hasapi" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Requires Offshore
                <CustomTriInput annotation="hasoffshore" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Restricted Guild
                <CustomTriInput annotation="isguild" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Roles
                <CustomTriInput annotation="role" filter={filter} map={customFilters} set={setCustomFilters} update={updateFilteredCommands} />
                Require Roles (Any)
                <ListComponent argName="hasrole" options={roles} isMulti={true} initialValue={""} setOutputValue={hasRoleOutput} />
                Has Arguments:
                <TriStateInput argName="hasarg" initialValue="0" setOutputValue={hasArgOutput} />
                Require Arguments (All):
                <ListComponent argName="reqarg" options={cmdArgs} isMulti={true} initialValue={""} setOutputValue={reqArgOutput} />
            </div>)}
            {filteredCommands && filteredCommands.length > 0 && (
                <table className="table-auto w-full">
                    <thead>
                        <tr className='bg-card'>
                            <th className="px-4 py-2">Command</th>
                            <th className="px-4 py-2">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCommands.map((cmd) => (
                            <tr key={cmd.name}>
                                <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">
                                    <a href={`#command/${cmd.name}`} className="font-bold no-underline hover:underline text-blue-600 dark:text-blue-500">
                                        {prefix}{cmd.name}
                                    </a>
                                </td>
                                <td className="px-1 py-1 border-2 border-blue-500 border-opacity-75 md:border-opacity-50 bg-secondary">
                                    <MarkupRenderer content={cmd.getDescShort()} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
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
    const handleChange = useCallback((name: string, value: string) => {
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
    }, [annotation, filter, map, set, update]);
    return (
        <TriStateInput
            argName="ignore"
            initialValue="0"
            setOutputValue={handleChange}
        />
    );
}