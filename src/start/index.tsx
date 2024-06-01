import React, { useEffect, useState, } from 'react';
import pnwkit from 'pnwkit-2.0'; // Import the 'pnwkit' module
import { nation } from 'pnwkit-2.0/build/src/interfaces/queries/nation';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ModeToggle } from '@/components/ui/mode-toggle';
import classes from './start.module.css';
import { withCommands } from './StateUtil';
import { CommandMap } from './Command';

// async function fetchName(id: number) {
//     const nations: nation[] = await pnwkit.nationQuery({id: [id], first: 1}, `nation_name`);
//     console.log("Nations: ", nations);
//     return nations[0].nation_name;
// }
export default function Start() {
    // const [id, setId] = useState<number>(6);
    // const location = useLocation();
    // const search = location.search.substring(1); // remove the '#' at start
    // const params = new URLSearchParams(search);
    // const key = params.get('key') as string;

    // if (key) {
    //     pnwkit.setKeys(key);
    // }

    // const handleClick = async () => {
    //     if (!key) {
    //         alert("No key provided. Set `key` in the URL query parameters.");
    //         return;
    //     } 
    //     const name = await fetchName(id);
    //     alert("Name: " + name);
    // }

    const [commands, setCommands] = useState<CommandMap | null>(() => (null));
    const [filter, setFilter] = useState('');
    useEffect(() => {
        withCommands().then(setCommands);
    }, []);

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      setFilter(event.currentTarget.value);
  };
    const filteredCommands = commands && Object.entries(commands.getCommands()).filter(([name, cmd]) => name.includes(filter) || (cmd.command.desc != null && cmd.command.desc.split(' ').includes(filter)));

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="search" placeholder="Description" onKeyUp={handleKeyUp} />
              <Button type="submit">Semantic Search</Button>
          </div>
        {filteredCommands && filteredCommands.map(([name, group]) => (
            <Card>
                <CardHeader>
                    <CardTitle>/{name}</CardTitle>
                    <CardDescription>{group.command.desc}</CardDescription>
                </CardHeader>
            </Card>
        ))}
        </ThemeProvider>
      );
}