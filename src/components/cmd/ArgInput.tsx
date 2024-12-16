import { TypeBreakdown } from "../../utils/Command";
import {ListComponentBreakdown, ListComponentOptions} from "./ListComponent";
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
import {REGEX_PATTERN} from "../../lib/regex-patterns";
import {useMemo} from "react";

interface ArgProps {
    argName: string,
    breakdown: TypeBreakdown,
    min?: number,
    max?: number,
    initialValue: string,
    setOutputValue: (key: string, value: string) => void
}

export function ArgSet(
    { argName, breakdown, initialValue, setOutputValue }: ArgProps) {
    const childOptions = useMemo(() => breakdown.child![0].getOptionData(), [breakdown]);
    if (childOptions.options) {
        return <ListComponentOptions argName={argName} options={childOptions.options} isMulti={true} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }
    if (childOptions.query) {
        return <QueryComponent element={breakdown.child![0].element} multi={true} argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
    }
    return "TODO SET " + JSON.stringify(breakdown);
}

export default function ArgInput({ argName, breakdown, min, max, initialValue, setOutputValue }: ArgProps) {
    const options = useMemo(() => breakdown.getOptionData(), [breakdown]);
    if (options.options) {
        return <ListComponentOptions argName={argName} options={options.options} isMulti={options.multi} initialValue={initialValue} setOutputValue={setOutputValue}/>
    }

    const placeholder = breakdown.getPlaceholder();
    if (placeholder != null) {
        return "IS PLACEHOLDER: " + breakdown;
    }
    if (breakdown.annotations && breakdown.annotations.includes("TextArea")) {
        return <TextComponent argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
    }
    if ((breakdown.element === 'List' || breakdown.element === 'Set') && breakdown.child && breakdown.child[0].element === 'Integer') {
        return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.NUMBER_LIST} filterHelp="a comma separated list of numbers"/>
    }
    if (breakdown.element === 'Class' && breakdown.annotations && breakdown.annotations.includes("PlaceholderType")) {
        return <ListComponentBreakdown breakdown={breakdown} argName={argName} isMulti={false} initialValue={initialValue} setOutputValue={setOutputValue}/>
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
            return <ArgSet argName={argName} breakdown={breakdown} initialValue={initialValue} setOutputValue={setOutputValue} />
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

            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.SPREADSHEET} filterHelp="a link to a google sheet"/>
        }
        case "googledoc": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.GOOGLE_DOC} filterHelp="a link to a google document"/>
        }
        case "dbwar": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.WAR} filterHelp="a war timeline url"/>
        }
        case "dbcity": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.CITY} filterHelp="a city url"/>
        }
        case "message": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.CHANNEL} filterHelp="a discord message url"/>
        }
        case "cityranges": {
            return <CityRanges argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} />
        }
        case "uuid": {
            return <StringInput argName={argName} initialValue={initialValue} setOutputValue={setOutputValue} filter={REGEX_PATTERN.UUID} filterHelp="a uuid in the form XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"/>
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