import { useSyncedStateFunc } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import { useCallback } from "react";

export default function TaxRateInput(
    {argName, initialValue, setOutputValue}:
    {
        argName: string,
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
    
    const moneyRate = useCallback((name: string, t: string) => {
        setValue([t ? parseInt(t) : null, value[1]]);
        if (!t && value[1] == null) setOutputValue(argName, "");
        else setOutputValue(argName, t + "/" + (value[1] || 0))
    }, [argName, setOutputValue, setValue, value]);

    const rssRate = useCallback((name: string, t: string) => {
        setValue([value[0], t ? parseInt(t) : null]);
            if (value[0]== null && !t) setOutputValue(argName, "");
            else setOutputValue(argName, (value[0] || 0) + "/" + t);
    }, [argName, setOutputValue, setValue, value]);

    return <div className="flex items-center">
    <NumberInput argName={argName} min={0} max={100} initialValue={value[0] ? value[0] + "" : ""} className="w-8"
    setOutputValue={moneyRate} isFloat={false} />
    <span>/</span>
    <NumberInput argName={argName} min={0} max={100} initialValue={value[1] ? value[1] + "" : ""} className="w-8"
        setOutputValue={rssRate} isFloat={false} />
    </div>
}