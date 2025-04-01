import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";

export default function BooleanInput(
    {argName, initialValue, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');
    return (
        <label>
                <Input type="checkbox" className="sr-only peer"
                    checked={value === "1" || value === "true"}
                    onChange={(e) => {
                            setValue(e.target.checked ? "1" : "0");
                            setOutputValue(argName, e.target.checked ? "1" : '');
                    }}
                />
            </label>
    )
}