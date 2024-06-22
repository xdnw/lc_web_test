import { getCommands } from '@/utils/CommandUtil';
import { withCommands } from '@/utils/StateUtil';
import { useEffect, useState } from 'react';
import TextInput from 'react-autocomplete-input';
import 'react-autocomplete-input/dist/bundle.css';


export default function AutoComplete() {
    const type = "DBNation";
    let [options, setOptions] = useState<string[]>([]);

    return <>
    <TextInput matchAny={true} className="bg-background" requestOnlyIfNoOptions={true} options={options} trigger="#" maxOptions={8} onRequestOptions={() => {
        withCommands().then(async f => {
            const obj = f.data.placeholders[type];
            setOptions(Object.keys(obj));
        });
    }}/>
    </>
}