import { useSyncedState } from "@/utils/StateUtil";
import { Input } from '../ui/input';
import { Button } from '../ui/button.tsx';
import { useCallback } from "react";

export default function ColorInput(
    {argName, initialValue, setOutputValue}:
    {
        argName: string,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState(initialValue || '');

    const handleClear = useCallback(() => {
        setValue('');
        setOutputValue(argName, '');
    }, [argName, setOutputValue, setValue]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue); 
        setOutputValue(argName, newValue);
    }, [argName, setOutputValue, setValue]);

    return (
        <div className='flex items-center'>
            <Input type="color"
                   value={value}
                   onChange={handleChange} />
            <Button onClick={handleClear} variant="outline" size="sm" className="ml-1" disabled={!value}>X</Button>
            <span className="text-sm ml-1">{value}</span>
        </div>
    )
}