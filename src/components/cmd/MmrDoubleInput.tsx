import { useSyncedStateFunc } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import React, { useCallback } from "react";

export default function MmrDoubleInput(
    { argName, initialValue, setOutputValue }:
        {
            argName: string,
            initialValue: string,
            setOutputValue: (name: string, value: string) => void
        }
) {
    const [value, setValue] = useSyncedStateFunc<(number | null)[]>(initialValue, (initial) => {
        const result: [number | null, number | null, number | null, number | null] = [null, null, null, null]
        if (initial && initial.match(/^(?:5(?:\.0+)?|[0-4](?:\.\d+)?)(?:\/(?:5(?:\.0+)?|[0-4](?:\.\d+)?)){3}$/)) {
            const split = initial.split('/');
            result[0] = parseFloat(split[0]);
            result[1] = parseFloat(split[1]);
            result[2] = parseFloat(split[2]);
            result[3] = parseFloat(split[3]);
        }
        return result;
    });

    const setOutputFunc = useCallback((name: string, value: string) => {
        const index = parseInt(name);
        const valueFloat = value ? parseFloat(value) : null;
        setValue(f => {
            if (f[index] !== valueFloat) {
                const updatedValues = [...f];
                updatedValues[index] = valueFloat;

                const outputString = valueFloat === null ? "" : updatedValues.join("/");
                setOutputValue(argName, outputString);

                return updatedValues;
            }
            return f;
        });
    }, [setValue, argName, setOutputValue]);

    return (
        <div className="flex items-center">
            {value.map((val, index) => {
                return (
                    <React.Fragment key={index}>
                        {index > 0 && <span>/</span>}
                        <NumberInput
                            argName={index + ""}
                            min={0}
                            max={index == 3 ? 3 : 5}
                            initialValue={val ? val + "" : ""}
                            className="w-8"
                            setOutputValue={setOutputFunc}
                            isFloat={true}
                        />
                    </React.Fragment>
                );
            })}
        </div>
    );
}