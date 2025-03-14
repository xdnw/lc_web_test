import { useSyncedState } from "@/utils/StateUtil";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

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
    
    return (
          <InputOTP
            pattern={allowWildcard ? "[0-9X]*" : "[0-9]*"}
            maxLength={4}
            value={value}
            onChange={(value) => {
                setValue(value.toUpperCase())
                setOutputValue(argName, value.length == 4 ? value.toUpperCase() : "");
            }}
          >
            <InputOTPGroup>
              <InputOTPSlot className="" index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
      )
}