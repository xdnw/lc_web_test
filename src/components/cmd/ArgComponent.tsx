import { Argument } from "../../utils/Command";
import ListComponent from "./ListComponent";
import { CommandStoreType } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";
import BooleanInput from "./BooleanInput";
import StringInput from "./StringInput";
import TextComponent from "./TextInput";
import TaxRateInput from "./TaxRateInput";

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
    console.log("Ann " + breakdown.annotations);
    if (breakdown.annotations && breakdown.annotations.includes("TextArea")) {
        return <TextComponent arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
    }
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
        case "spreadsheet": {
            const regexPattern = "^(sheet:[A-Za-z0-9]+(?:,\\d+)?|https://docs\\.google\\.com/spreadsheets/d/[A-Za-z0-9]+/edit(?:#gid=\\d+)?)$";
            return <StringInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
        }
        case "string": {
            return <StringInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case 'set': {
            return "TODO SET " + JSON.stringify(breakdown);
        }
        case "taxrate": {
            return <TaxRateInput arg={arg} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        default: {
            return breakdown.element + " UNKNOWN TYPE " + JSON.stringify(breakdown);
        }
    }
}