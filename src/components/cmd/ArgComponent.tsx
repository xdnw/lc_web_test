import { Argument } from "../../utils/Command";
import ListComponent from "./ListComponent";
import { CommandStoreType } from "@/utils/StateUtil";
import NumberInput from "./NumberInput";
import TimeInput from "./TimeInput";
import BooleanInput from "./BooleanInput";
import StringInput from "./StringInput";
import TextComponent from "./TextInput";
import TaxRateInput from "./TaxRateInput";
import MmrInput from "./MmrInput";
import MmrDoubleInput from "./MmrDoubleInput";
import CityRanges from "./CityRanges";
import ColorInput from "./ColorInput";

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
    const argName = arg.name;
    const breakdown = arg.getTypeBreakdown();

    const options = breakdown.getOptionData();
    if (options.options) {
        const labelled = options.options.map((o) => ({label: o, subtext: null, value: o}));
        return <ListComponent options={labelled} isMulti={options.multi} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }

    const placeholder = breakdown.getPlaceholder();
    if (placeholder != null) {
        return "IS PLACEHOLDER: " + breakdown;
    }
    if (breakdown.annotations && breakdown.annotations.includes("TextArea")) {
        return <TextComponent argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
    }
    if ((breakdown.element === 'List' || breakdown.element === 'Set') && breakdown.child && breakdown.child[0].element === 'Integer') {
        const regexPattern = "^\\d+(?:,\\d+)*$";
        return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
    }
    if (breakdown.element === 'Class' && breakdown.annotations && breakdown.annotations.includes("PlaceholderType")) {
        const types = breakdown.map.getPlaceholderTypes(true);
        const labelled = types.map((o) => ({label: o, subtext: null, value: o}));
        return <ListComponent options={labelled} isMulti={false} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }
    switch (breakdown.element.toLowerCase()) {
        case 'map': {
            return "TODO MAP " + JSON.stringify(breakdown);
        }
        case 'typedfunction': {
            return "TODO TYPEDFUNCTION " + JSON.stringify(breakdown);
        }
        case 'set': {
            return "TODO SET " + JSON.stringify(breakdown);
        }
        case "color": {
            return <ColorInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "double": {
            return <NumberInput argName={argName} min={arg.arg.min ? arg.arg.min : undefined} max={arg.arg.max ? arg.arg.max : undefined} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={true} />
        }
        case 'long':
            if (breakdown.annotations != null && (breakdown.annotations.includes("Timediff") || breakdown.annotations.includes("Timestamp"))) {
                return <TimeInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
            }
        case "integer":
        case "int": {
            return <NumberInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={false} />
        }
        case "boolean": {
            return <BooleanInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "transfersheet":
        case "spreadsheet": {
            const regexPattern = "^(sheet:[A-Za-z0-9]+(?:,\\d+)?|https://docs\\.google\\.com/spreadsheets/d/[A-Za-z0-9]+/edit(?:#gid=\\d+)?)$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
        }
        case "googledoc": {
            const regexPattern = "^(doc:[A-Za-z0-9]+|https://docs\\.google\\.com/document/d/[A-Za-z0-9]+/edit)$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
        }
        case "dbwar": {
            const regexPattern = "^(https://politicsandwar.com/nation/war/timeline/war=\\d+)$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
        }
        case "cityranges": {
            return <CityRanges argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "uuid": {
            const regexPattern = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern}/>
        }
        case "mmrint": {
            return <MmrInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "mmrdouble": {
            return <MmrDoubleInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "string": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "taxrate": {
            return <TaxRateInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        default: {
            return breakdown.element + " UNKNOWN TYPE " + JSON.stringify(breakdown);
        }
    }
}