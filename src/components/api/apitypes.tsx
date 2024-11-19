/* tslint:disable */
/* eslint-disable */
// Generated using typescript-generator version 3.2.1263 on 2024-11-14 05:15:44.

export interface SetGuild extends WebSuccess {
    id: string;
    name: string;
    icon: string;
}

export interface TradePriceByDayJson {
    x: string;
    y: string;
    labels: string[];
    data: number[][];
}

export interface WebAnnouncement extends WebSuccess {
    id: number;
    type: number;
    active: boolean;
    title: string;
    content: string;
}

export interface WebAnnouncements extends WebSuccess {
    values: WebAnnouncement[];
}

export interface WebAudit {
    audit: string;
    severity: number;
    value: string;
    description: string;
}

export interface WebAudits extends WebSuccess {
    values: WebAudit[];
}

export interface WebBalance extends WebSuccess {
    id: number;
    is_aa: boolean;
    total: number[];
    include_grants: boolean;
    access: { [index: string]: number };
    breakdown: { [index: string]: number[] };
    no_access_msg?: string;
}

export interface WebBulkQuery {
    results: WebSuccess[];
}

export interface WebSession extends WebSuccess {
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

export interface WebTargets extends WebSuccess {
    targets: WebTarget[];
    include_strength: boolean;
    self: WebTarget;
}

export interface WebTarget {
    id: number;
    nation: string;
    alliance_id: number;
    alliance: string;
    avg_infra: number;
    soldier: number;
    tank: number;
    aircraft: number;
    ship: number;
    missile: number;
    nuke: number;
    spies: number;
    rank: string;
    active_ms: number;
    color: number;
    beige_turns: number;
    off: number;
    def: number;
    score: number;
    expected: number;
    actual: number;
    strength: number;
}

export interface WebUrl extends WebSuccess {
    url: string;
}

export interface WebValue extends WebSuccess {
    value: string;
}

export interface WebTransferResult extends WebSuccess {
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

export interface WebTable extends WebSuccess {
    cells: string[][];
}

export interface WebSuccessInt extends WebSuccess {
    value: number;
}

export interface WebBankAccess extends WebSuccess {
    access: { [index: string]: number };
}

export interface WebOptions extends WebSuccess {
    key_numeric?: number[];
    key_string?: string[];
    icon?: string[];
    text?: string[];
    subtext?: string[];
    color?: string[];
}

///

