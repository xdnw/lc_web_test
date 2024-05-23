import React, { useState } from 'react';
import pnwkit from 'pnwkit-2.0'; // Import the 'pnwkit' module
import { nation } from 'pnwkit-2.0/build/src/interfaces/queries/nation';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

async function fetchName(id: number) {
    const nations: nation[] = await pnwkit.nationQuery({id: [id], first: 1}, `nation_name`);
    console.log("Nations: ", nations);
    return nations[0].nation_name;
}

export default function Start() {
    const [id, setId] = useState<number>(6);
    const location = useLocation();
    const search = location.search.substring(1); // remove the '#' at start
    const params = new URLSearchParams(search);
    const key = params.get('key') as string;

    console.log("Key is: ", key);
    console.log("Location ", location);

    if (key) {
        pnwkit.setKeys(key);
    } else {
        console.log("No key provided. Set `key` in the URL query parameters.");
    }

    const handleClick = async () => {
        if (!key) {
            alert("No key provided. Set `key` in the URL query parameters.");
        } 
        const name = await fetchName(id);
        alert("Name: " + name);
    }

    return (
        <Card>
            <Input type="number" value={id} onChange={(e) => setId(Number(e.target.value))} />
            <Button onClick={handleClick}>Fetch Name</Button>
        </Card>
    );
}