

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