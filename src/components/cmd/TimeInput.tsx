import { Argument } from "@/utils/Command";
import { useSyncedState } from "@/utils/StateUtil";

export default function TimeInput(
    {arg, initialValue, setOutputValue}:
    {
        arg: Argument,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    return (
        <input type="datetime-local"
            className="dark:bg-gray-800 bg-gray-200"
            value={value}
            onChange={(e) => {
                const localDateTimeString = e.target.value;
                const date = new Date(localDateTimeString);
                setValue(e.target.value);
                setOutputValue(arg.name, "timestamp:" + Math.floor(date.getTime()));
            }} />
    )
}