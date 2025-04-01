import { useSyncedState } from "@/utils/StateUtil";
import { Button } from "../ui/button.tsx";

export default function TriStateInput(
    { argName, initialValue, setOutputValue }:
    {
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '0');

    const handleClick = (newValue: string) => {
        setValue(newValue);
        setOutputValue(argName, newValue);
    };

    return (
        <div>
            <Button size={'sm'}
                    className={`m-0 ${value === '-1' ? 'bg-red-500 text-secondary' : 'bg-gray-500'}`}
                    onClick={() => handleClick('-1')}
            >X</Button>
            <Button size={'sm'}
                    className={`m-0 ${value === '0' ? 'bg-blue-500 text-secondary' : 'bg-gray-500'}`}
                    onClick={() => handleClick('0')}
            >/</Button>
            <Button size={'sm'}
                    className={`m-0 ${value === '1' ? 'bg-green-500 text-secondary' : 'bg-gray-500'}`}
                    onClick={() => handleClick('1')}
            >✔</Button>
        </div>
    );
}