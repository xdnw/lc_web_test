import { useSyncedState } from "@/utils/StateUtil";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useCallback } from "react";

export default function MmrInput(
    {argName, allowWildcard, initialValue, setOutputValue}:
    {
        argName: string,
        allowWildcard: boolean,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState<string>(initialValue || "");

    const onChange = useCallback((newValue: string) => {
        setValue(newValue.toUpperCase())
        setOutputValue(argName, newValue.length === 4 ? newValue.toUpperCase() : "");
    }, [setValue, argName, setOutputValue]);

    return (
          <InputOTP
            pattern={allowWildcard ? "[0-9X]*" : "[0-9]*"}
            maxLength={4}
            value={value}
            onChange={onChange}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
      )
}