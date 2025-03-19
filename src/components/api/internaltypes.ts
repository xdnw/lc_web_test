

export type ButtonInfoHref = {
    href: string;
    label: string;
};

export type ButtonInfoCmd = {
    cmd: string;
    label: string;
};

export type ItemType = {
    name: string;
    nameLower: string;
    value: string;
}

export type CommandBehavior = "DELETE_MESSAGE" | "UNPRESS" | "DELETE_BUTTONS" | "DELETE_PRESSED_BUTTON" | "EPHEMERAL";

export type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

export interface JSONObject {
    [key: string]: JSONValue;
}

export type JSONArray = Array<JSONValue>;