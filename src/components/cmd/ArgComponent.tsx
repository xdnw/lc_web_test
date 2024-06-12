import { Argument } from "../../utils/Command";
import ListComponent from "./ListComponent";
import { CommandStoreType } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";
import BooleanInput from "./BooleanInput";
import StringInput from "./StringInput";

interface ArgProps {
    arg: Argument,
    initialValue: string,
    commandStore: CommandStoreType
}

export interface ArgInputProps {
    arg: Argument,
    value: string,
    setValue: (value: string) => void,
    setOutputValue: (name: string, value: string) => void
}

export default function ArgComponent({ arg, initialValue, commandStore }: ArgProps) {
    const setOutputValue = commandStore((state) => state.setOutput);
    const options = arg.getOptionData();
    if (options.options) {
        const labelled = options.options.map((o) => ({label: o, subtext: null, value: o}));
        return <ListComponent options={labelled} isMulti={options.multi} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }

    console.log("Render " + arg.name);

    const placeholder = arg.getPlaceholder();
    if (placeholder != null) {
        return "IS PLACEHOLDER: " + arg.arg.type;
    }

    const breakdown = arg.getTypeBreakdown();
    switch (breakdown.element.toLowerCase()) {
        case 'map': {
            return "TODO MAP " + JSON.stringify(breakdown);
        }
        case 'typedfunction': {
            return "TODO TYPEDFUNCTION " + JSON.stringify(breakdown);
        }
        case "double": {
            return <NumberInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={true} />
        }
        case 'long':
            if (breakdown.annotations != null && (breakdown.annotations.includes("Timediff") || breakdown.annotations.includes("Timestamp"))) {
                return <TimeInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
            }
        case "integer":
        case "int": {
            return <NumberInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={false} />
        }
        case "boolean": {
            return <BooleanInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "string": {
            return <StringInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case 'set': {
            return "TODO SET " + JSON.stringify(breakdown);
        }
        default: {
            return breakdown.element + " UNKNOWN TYPE " + JSON.stringify(breakdown);
        }
    }
}