import { useSyncedStateFunc } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";

export default function CityRanges(
    {argName, initialValue, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedStateFunc<[number | null, number | null]>(initialValue, (initial) => {
        const result: [number | null, number | null] = [null, null]
        if (initial && initial.match(/^\d+-\d+$/)) {
            const split = initial.split('/');
            result[0] = parseInt(split[0]);
            result[1] = parseInt(split[1]);
        }
        return result;
    });

    return (
        <div className="flex w-full items-center">
            <div className="flex items-center w-1/2 grow">
                <span className="mr-2">c</span>
                <NumberInput
                    argName={argName}
                    min={0}
                    max={100}
                    initialValue={value[0] ? value[0] + "" : ""}
                    className="grow"
                    setOutputValue={(name, t) => {
                        setValue([t ? parseInt(t) : null, value[1]]);
                        if (!t || value[1] == null) setOutputValue(argName, "");
                        else setOutputValue(argName, "c" + t + "-" + (value[1] || 0));
                    }}
                    isFloat={false}
                />
            </div>
            <div className="flex items-center w-1/2 grow">
                <span className="mx-2">-</span>
                <NumberInput
                    argName={argName}
                    min={0}
                    max={100}
                    initialValue={value[1] ? value[1] + "" : ""}
                    className="grow"
                    setOutputValue={(name, t) => {
                        setValue([value[0], t ? parseInt(t) : null]);
                        if (value[0] == null || !t) setOutputValue(argName, "");
                        else setOutputValue(argName, "c" + (value[0] || 0) + "-" + t);
                    }}
                    isFloat={false}
                />
            </div>
        </div>
    );
}