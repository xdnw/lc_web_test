import { useSyncedStateFunc } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import { TypeBreakdown } from "@/utils/Command";
import ArgInput from "./ArgInput";
import { useState } from "react";
import { Button } from "../ui/button";

function toMapString(value: {[key: string]: string}[]) {
    return value.map((v) => Object.keys(v)[0] + ":" + Object.values(v)[0]).join('\n');
}

export default function MapInput(
    {argName, children, initialValue, setOutputValue}:
    {
        argName: string,
        children: TypeBreakdown[],
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedStateFunc<{[key: string]: string}[]>(initialValue, (initial) => {
        // split by newline, have empty string be empty map
        const result: {[key: string]: string}[] = [];
        if (initial) {
            const split = initial.split('\n');
            for (const s of split) {
                const kv = s.split('=');
                if (kv.length == 2) {
                    result.push({[kv[0]]: kv[1]});
                }
            }
        }
        return result;
    });

    const [addKey, setAddKey] = useState("");
    const [addValue, setAddValue] = useState("");
    return (
        <>
          <div className="mb-1 border-b-2 border-gray-500">
            <p>Map:</p>
            {value.map((v, i) => {
                const key = Object.keys(v)[0];
                const val = v[key];
                return (
                <div key={i} className="bg-input border-foreground p-0.5 ps-1 mt-1 text-sm flex justify-between items-center">
                    <span className="mr-4">{key}: {val}</span>
                    <button 
                    onClick={() => {
                        const newValue = value.filter((_, index) => index !== i);
                        setValue(newValue)
                        setOutputValue(argName, toMapString(newValue));
                    }}
                    className="bg-red-500 p-1 rounded shadow-md text-xs"
                    >
                    X
                    </button>
                </div>
                );
            })}
            </div>
          <div className="flex items-center space-x-2">
            <div>
              <p>Key: </p>
              <ArgInput argName="key" breakdown={children[0]} min={null} max={null} initialValue={addKey} setOutputValue={(key, value) => {
                setAddKey(value);
              }} />
            </div>
            <div>
              <p>Value: </p>
              <ArgInput argName="value" breakdown={children[1]} min={null} max={null} initialValue={addValue} setOutputValue={(key, value) => {
                setAddValue(value);
              }} />
            </div>
            <Button onClick={() => {
                const keyCopy = addKey;
                const valueCopy = addValue;
                if (keyCopy === "") {
                    alert("Key cannot be empty");
                    return;
                }
                if (valueCopy === "") {
                    alert("Value cannot be empty");
                    return;
                }
                const newValue = [...value, {[keyCopy]: valueCopy}];
                setValue(newValue);
                setOutputValue(argName, toMapString(newValue));
                setAddKey("");
                setAddValue("");
            }}>Add</Button>
          </div>
        </>
      );
}