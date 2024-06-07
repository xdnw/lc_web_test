import React, { useEffect, useState, } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { withCommands } from '../../utils/StateUtil';
import { Command, CommandMap } from '../../utils/Command';
import { CommandWeights, cosineSimilarity, loadWeights, toVector } from '../../utils/Embedding';

export default function CommandsPage() {
    const [commands, setCommands] = useState<CommandMap | null>(() => (null));
    const [weights, setWeights] = useState<CommandWeights | null>(() => (null));
    const [filter, setFilter] = useState('');
    const [filteredCommands, setFilteredCommands] = useState<Command[] | null>(null);

    useEffect(() => {
        withCommands().then(async f => {
            setCommands(f);
            setFilteredCommands(Object.values(f.getCommands()));
        });
    }, []);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setFilter(value);
        const newFilteredCommands = commands && Object.values(commands.getCommands()).filter((cmd) => cmd.name.includes(value) || (cmd.command.desc != null && cmd.command.desc.split(' ').includes(value)));
        setFilteredCommands(newFilteredCommands);
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
        console.log("Filter: ", filter);
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
        </div>
        {filteredCommands && filteredCommands.map((cmd) => (
          <Card key={cmd.name}>
            <CardHeader>
              <CardTitle>/{cmd.name}</CardTitle>
              <CardDescription>{cmd.command.desc}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
      );
}