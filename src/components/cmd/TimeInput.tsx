import { useSyncedState } from "@/utils/StateUtil";

export default function TimeInput(
    {argName, initialValue, setOutputValue}:
    {
        argName: string,
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
                setOutputValue(argName, "timestamp:" + Math.floor(date.getTime()));
            }} />
    )
}