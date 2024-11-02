import { TypeBreakdown } from "../../utils/Command";
import ListComponent from "./ListComponent";
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
import MapInput from "./MapInput";
import TriStateInput from "./TriStateInput";
import QueryComponent from "./QueryComponent";

interface ArgProps {
    argName: string,
    breakdown: TypeBreakdown,
    min: number | null,
    max: number | null,
    initialValue: string,
    setOutputValue: (key: string, value: string) => void
}

export default function ArgInput({ argName, breakdown, min, max, initialValue, setOutputValue }: ArgProps) {
    const options = breakdown.getOptionData();
    if (options.options) {
        const labelled: {label: string, value: string}[] = options.options.map((o) => ({label: o, value: o}));
        return <ListComponent argName={argName} options={labelled} isMulti={options.multi} initialValue={initialValue} setOutputValue={setOutputValue}/>
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
        return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a comma separated list of numbers"/>
    }
    if (breakdown.element === 'Class' && breakdown.annotations && breakdown.annotations.includes("PlaceholderType")) {
        const types = breakdown.map.getPlaceholderTypes(true);
        const labelled = types.map((o) => ({label: o, value: o}));
        return <ListComponent argName={argName} options={labelled} isMulti={false} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }
    /* eslint-disable no-fallthrough */
    switch (breakdown.element.toLowerCase()) {
        case 'map': {
            return <MapInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} children={breakdown.child!} />
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
            return <NumberInput argName={argName} min={min ? min : undefined} max={max ? max : undefined} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={true} />
        }
        case 'long':
            if (breakdown.annotations != null && (breakdown.annotations.includes("Timediff") || breakdown.annotations.includes("Timestamp"))) {
                return <TimeInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />;
            }
            return <NumberInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={false} />;
        case 'integer':
            return <NumberInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={false} />;
        case 'int':
            return <NumberInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} isFloat={false} />;
        case "boolean": {
            if (breakdown.element === "Boolean") {
                return <TriStateInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
            }
            return <BooleanInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "transfersheet":
        case "spreadsheet": {
            const regexPattern = "^(sheet:[A-Za-z0-9]+(?:,\\d+)?|https://docs\\.google\\.com/spreadsheets/d/[A-Za-z0-9_-]+/edit(?:#gid=\\d+)?)(?:\\?.*)?$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a link to a google sheet"/>
        }
        case "googledoc": {
            const regexPattern = "^(doc:[A-Za-z0-9]+|https://docs\\.google\\.com/document/d/[A-Za-z0-9_-]+/edit)(?:\\?.*)?$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a link to a google document"/>
        }
        case "dbwar": {
            const regexPattern = "^(https://politicsandwar.com/nation/war/timeline/war=\\d+)$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a war timeline url"/>
        }
        case "message": {
            const regexPattern = "^(https://discord\\.com/channels/\\d+/\\d+/\\d+)$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a discord message url"/>
        }
        case "cityranges": {
            return <CityRanges argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "uuid": {
            const regexPattern = "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$";
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={regexPattern} filterHelp="a uuid in the form XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"/>
        }
        case "mmrint": {
            return <MmrInput allowWildcard={false} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "mmrmatcher": {
            return <MmrInput allowWildcard={true} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
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
            if (options.query) {
                return <QueryComponent element={breakdown.element} multi={options.multi} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
            }
            return <UnknownType breakdown={breakdown} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
    }
    /* eslint-enable no-fallthrough */
}

export function UnknownType({ breakdown, argName, initialValue, setOutputValue }: { breakdown: TypeBreakdown, argName: string, initialValue: string, setOutputValue: (key: string, value: string) => void }) {
    return (
        <>
            {breakdown.element} UNKNOWN TYPE {JSON.stringify(breakdown)} `{breakdown.element.toLowerCase()}`
        <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        </>
    );
}