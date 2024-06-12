import { Argument } from "@/utils/Command";
import { useSyncedState } from "@/utils/StateUtil";
import { Input } from "../ui/input";

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
        <Input type="text" 
                    value={value}
                    onChange={(e) => {
                    setValue(e.target.value);
                    setOutputValue(arg.name, e.target.value);
                }} placeholder="Type here..." />
    )
}