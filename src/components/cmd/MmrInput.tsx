import { Argument } from "@/utils/Command";
import { useSyncedState, useSyncedStateFunc } from "@/utils/StateUtil";
import { useState } from "react";
import NumberInput from "./NumberInput";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function MmrInput(
    {arg, initialValue, setOutputValue}:
    {
        arg: Argument,
        initialValue: string,
        setOutputValue: (name: string, value: string) => void
    }
) {
    const [value, setValue] = useSyncedState<string>(initialValue || "");
    

    return (
          <InputOTP
            maxLength={4}
            value={value}
            onChange={(value) => {
                setValue(value)
                setOutputValue(arg.name, value.length == 4 ? value : "");
            }}
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