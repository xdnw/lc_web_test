import { Argument } from "@/utils/Command";
import { useSyncedState, useSyncedStateFunc } from "@/utils/StateUtil";
import { useState } from "react";
import NumberInput from "./NumberInput";

export default function TaxRateInput(
    {arg, initialValue, setOutputValue}:
    {
        arg: Argument,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedStateFunc<[number | null, number | null]>(initialValue, (initial) => {
        const result: [number | null, number | null] = [null, null]
        if (initial && initial.match(/^\d+\/\d+$/)) {
            const split = initial.split('/');
            result[0] = parseInt(split[0]);
            result[1] = parseInt(split[1]);
        }
        return result;
    });
    
    arg.arg.min = 0;
    arg.arg.max = 100;

    return <div className="flex items-center">
    <NumberInput arg={arg} initialValue={value[0] ? value[0] + "" : ""} className="w-8"
    setOutputValue={
        (name, t) => {
            setValue([t ? parseInt(t) : null, value[1]]);
            if (!t && value[1] == null) setOutputValue(arg.name, "");
            else setOutputValue(arg.name, t + "/" + (value[1] || 0))
        }
    } isFloat={false} />
    <span>/</span>
    <NumberInput arg={arg} initialValue={value[1] ? value[1] + "" : ""} className="w-8"
        setOutputValue={
        (name, t) => {
            setValue([value[0], t ? parseInt(t) : null]);
            if (value[0]== null && !t) setOutputValue(arg.name, "");
            else setOutputValue(arg.name, (value[0] || 0) + "/" + t)
        }
    } isFloat={false} />
    </div>
}