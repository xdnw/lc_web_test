/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-11-20 07:27:13.

export interface SetGuild {
    id: string;
    name: string;
    icon: string;
}

export interface WebGraph {
    time_format?: TimeFormat;
    number_format?: TableNumberFormat;
    origin?: number;
    title?: string;

    x: string;
    y: string;
    labels: string[];
    data: (number | string)[][];
}

export interface WebAnnouncement {
    id: number;
    type: number;
    active: boolean;
    title: string;
    content: string;
}

export interface WebAnnouncements {
    values: WebAnnouncement[];
}

export interface WebAudit {
    audit: string;
    severity: number;
    value: string;
    description: string;
}

export interface WebAudits {
    values: WebAudit[];
}

export interface WebBalance {
    id: number;
    is_aa: boolean;
    total: number[];
    include_grants: boolean;
    access: { [index: string]: number };
    breakdown: { [index: string]: number[] };
    no_access_msg?: string;
}

export interface WebBankAccess {
    access: { [index: string]: number };
}

export interface WebBulkQuery {
    results: any[];
}

export interface WebInt {
    value: number;
}

export interface WebMyWar {
    id: number;
    target: WebTarget;
    beigeReasons: { [index: string]: string };
    peace: number;
    blockade: number;
    ac: number;
    gc: number;
    ground_str: number;
    att_res: number;
    def_res: number;
    att_map: number;
    def_map: number;
    iron_dome: boolean;
    vds: boolean;
    att_fortified: boolean;
    def_fortified: boolean;
}

export interface WebMyWars {
    offensives: WebMyWar[];
    defensives: WebMyWar[];
    me: WebTarget;
    isFightingActives: boolean;
    soldier_cap: number;
    tank_cap: number;
    aircraft_cap: number;
    ship_cap: number;
    spy_cap: number;
}

export interface WebOptions {
    key_numeric?: number[];
    key_string?: string[];
    icon?: string[];
    text?: string[];
    subtext?: string[];
    color?: string[];
}

export interface WebSession {
    user?: string;
    user_name?: string;
    user_icon?: string;
    user_valid?: boolean;
    nation?: number;
    nation_name?: string;
    alliance?: number;
    alliance_name?: string;
    nation_valid?: boolean;
    expires: number;
    guild?: string;
    guild_name?: string;
    guild_icon?: string;
    registered?: boolean;
    registered_nation?: number;
}

export interface WebSuccess {
    success: boolean;
    message?: string;
}

export interface WebTableError {
    col?: number;
    row?: number;
    msg: string;
}

export interface WebTable {
    cells: any[][];
    renderers?: string[];
    errors?: WebTableError[];
}

export interface WebTarget {
    id: number;
    nation: string;
    alliance_id: number;
    alliance: string;
    avg_infra: number;
    cities: number;
    soldier: number;
    tank: number;
    aircraft: number;
    ship: number;
    missile: number;
    nuke: number;
    spies: number;
    position: number;
    active_ms: number;
    color_id: number;
    beige_turns: number;
    off: number;
    def: number;
    score: number;
    expected: number;
    actual: number;
    strength: number;
}

export interface WebTargets {
    targets: WebTarget[];
    include_strength: boolean;
    self: WebTarget;
}

export interface WebTransferResult {
    status: string;
    status_msg: string;
    status_success: boolean;
    receiver_id: number;
    receiver_is_aa: boolean;
    receiver_name: string;
    messages: string[];
    amount: number[];
    note: string;
}

export interface WebUrl {
    url: string;
}

export interface WebValue {
    value: string;
}

export type CacheType = "None" | "Cookie" | "LocalStorage" | "SessionStorage";

export type TransactionType = "INTERNAL" | "TAX" | "BANK";

export type TimeFormat = "NUMERIC" | "DECIMAL_ROUNDED" | "SI_UNIT" | "TURN_TO_DATE" | "DAYS_TO_DATE" | "MILLIS_TO_DATE" | "SECONDS_TO_DATE";

export type TableNumberFormat = "SI_UNIT" | "PERCENTAGE_ONE" | "PERCENTAGE_100" | "DECIMAL_ROUNDED";

export type GrahpType = "STACKED_BAR" | "SIDE_BY_SIDE_BAR" | "HORIZONTAL_BAR" | "LINE" | "STACKED_LINE" | "FILLED_LINE" | "SCATTER";