import { Argument } from "@/utils/Command";
import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";

export default function BooleanInput(
    {arg, initialValue, setOutputValue}:
    {
        arg: Argument,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    return (
        <label className="">
                <Input type="checkbox" className="sr-only peer" 
                    checked={value === "1" || value === "true"}
                    onChange={(e) => {
                            setValue(e.target.checked ? "1" : "0");
                            setOutputValue(arg.name, e.target.checked ? "1" : '');
                    }}
                />
                <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white-200 dark:peer-checked:after:border-gray-700 after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white dark:after:bg-gray-800 after:border-gray-300 dark:after:border-gray-700 after:border after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
    )
}