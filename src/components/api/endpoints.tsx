import {CacheType} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode} from "react";
import type * as ApiTypes from "@/components/api/apitypes.d.ts";
import {useForm, useDisplay, ApiEndpoint, combine, CommonEndpoint} from "@/components/api/endpoint.tsx";
export const WARSCOSTRANKINGBYDAY: CommonEndpoint<ApiTypes.WebGraph, {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warscostrankingbyday",
        "warsCostRankingByDay",
        {"type":{"name":"type","type":"WarCostByDayMode"},"mode":{"name":"mode","type":"WarCostMode"},"time_start":{"name":"time_start","type":"long[Timestamp]"},"time_end":{"name":"time_end","optional":true,"type":"Long[Timestamp]"},"coalition1":{"name":"coalition1","optional":true,"flag":"c1","type":"Set\u003cNationOrAlliance\u003e"},"coalition2":{"name":"coalition2","optional":true,"flag":"c2","type":"Set\u003cNationOrAlliance\u003e"},"coalition3":{"name":"coalition3","optional":true,"flag":"c3","type":"Set\u003cNationOrAlliance\u003e"},"coalition4":{"name":"coalition4","optional":true,"flag":"c4","type":"Set\u003cNationOrAlliance\u003e"},"coalition5":{"name":"coalition5","optional":true,"flag":"c5","type":"Set\u003cNationOrAlliance\u003e"},"coalition6":{"name":"coalition6","optional":true,"flag":"c6","type":"Set\u003cNationOrAlliance\u003e"},"coalition7":{"name":"coalition7","optional":true,"flag":"c7","type":"Set\u003cNationOrAlliance\u003e"},"coalition8":{"name":"coalition8","optional":true,"flag":"c8","type":"Set\u003cNationOrAlliance\u003e"},"coalition9":{"name":"coalition9","optional":true,"flag":"c9","type":"Set\u003cNationOrAlliance\u003e"},"coalition10":{"name":"coalition10","optional":true,"flag":"c10","type":"Set\u003cNationOrAlliance\u003e"},"running_total":{"name":"running_total","optional":true,"flag":"o","type":"boolean"},"allowedWarStatus":{"name":"allowedWarStatus","optional":true,"flag":"s","type":"Set\u003cWarStatus\u003e"},"allowedWarTypes":{"name":"allowedWarTypes","optional":true,"flag":"w","type":"Set\u003cWarType\u003e"},"allowedAttackTypes":{"name":"allowedAttackTypes","optional":true,"flag":"a","type":"Set\u003cAttackType\u003e"},"allowedVictoryTypes":{"name":"allowedVictoryTypes","optional":true,"flag":"v","type":"Set\u003cSuccessType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(WARSCOSTRANKINGBYDAY.endpoint.name, combine(WARSCOSTRANKINGBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WARSCOSTRANKINGBYDAY.endpoint.url, WARSCOSTRANKINGBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const GLOBALSTATS: CommonEndpoint<ApiTypes.CoalitionGraphs, {metrics?: string, start?: string, end?: string, topX?: string}, {metrics?: string, start?: string, end?: string, topX?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.CoalitionGraphs>(
        "globalstats",
        "globalStats",
        {"metrics":{"name":"metrics","type":"Set\u003cAllianceMetric\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"topX":{"name":"topX","type":"int"}},
        (data: unknown) => data as ApiTypes.CoalitionGraphs,
        {},
        "CoalitionGraphs"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metrics?: string, start?: string, end?: string, topX?: string}, render: (data: ApiTypes.CoalitionGraphs) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(GLOBALSTATS.endpoint.name, combine(GLOBALSTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string, topX?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.CoalitionGraphs) => void,
        handle_submit?: (args: {metrics?: string, start?: string, end?: string, topX?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(GLOBALSTATS.endpoint.url, GLOBALSTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TABLE: CommonEndpoint<ApiTypes.WebTable, {type?: string, selection_str?: string, columns?: string[] | string}, {type?: string, selection_str?: string, columns?: string[] | string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "table",
        "table",
        {"type":{"name":"type","type":"Class[PlaceholderType]"},"selection_str":{"name":"selection_str","type":"String"},"columns":{"name":"columns","type":"List\u003cString\u003e[TextArea]"}},
        (data: unknown) => data as ApiTypes.WebTable,
        {},
        "WebTable"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {type?: string, selection_str?: string, columns?: string[] | string}, render: (data: ApiTypes.WebTable) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TABLE.endpoint.name, combine(TABLE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string, selection_str?: string, columns?: string[] | string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTable) => void,
        handle_submit?: (args: {type?: string, selection_str?: string, columns?: string[] | string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TABLE.endpoint.url, TABLE.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ALLIANCEMETRICSAB: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}, {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancemetricsab",
        "allianceMetricsAB",
        {"metric":{"name":"metric","type":"AllianceMetric"},"coalition1":{"name":"coalition1","type":"Set\u003cDBAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ALLIANCEMETRICSAB.endpoint.name, combine(ALLIANCEMETRICSAB.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ALLIANCEMETRICSAB.endpoint.url, ALLIANCEMETRICSAB.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const COMPARESTATS: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}, {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparestats",
        "compareStats",
        {"metric":{"name":"metric","type":"AllianceMetric"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"coalition1":{"name":"coalition1","type":"Set\u003cDBAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBAlliance\u003e"},"coalition3":{"name":"coalition3","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition4":{"name":"coalition4","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition5":{"name":"coalition5","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition6":{"name":"coalition6","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition7":{"name":"coalition7","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition8":{"name":"coalition8","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition9":{"name":"coalition9","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition10":{"name":"coalition10","optional":true,"type":"Set\u003cDBAlliance\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(COMPARESTATS.endpoint.name, combine(COMPARESTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(COMPARESTATS.endpoint.url, COMPARESTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const NTHBEIGELOOTBYSCORERANGE: CommonEndpoint<ApiTypes.WebGraph, {nations?: string, n?: string, snapshotDate?: string}, {nations?: string, n?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "nthbeigelootbyscorerange",
        "NthBeigeLootByScoreRange",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e"},"n":{"name":"n","optional":true,"type":"int","def":"5"},"snapshotDate":{"name":"snapshotDate","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nations?: string, n?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(NTHBEIGELOOTBYSCORERANGE.endpoint.name, combine(NTHBEIGELOOTBYSCORERANGE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, n?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {nations?: string, n?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(NTHBEIGELOOTBYSCORERANGE.endpoint.url, NTHBEIGELOOTBYSCORERANGE.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ALLIANCESDATABYDAY: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}, {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancesdatabyday",
        "AlliancesDataByDay",
        {"metric":{"name":"metric","type":"TypedFunction\u003cDBNation,Double\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"mode":{"name":"mode","type":"AllianceMetricMode"},"alliances":{"name":"alliances","optional":true,"desc":"The alliances to include. Defaults to top 15","type":"Set\u003cDBAlliance\u003e"},"filter":{"name":"filter","optional":true,"type":"Predicate\u003cDBNation\u003e"},"includeApps":{"name":"includeApps","optional":true,"flag":"a","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ALLIANCESDATABYDAY.endpoint.name, combine(ALLIANCESDATABYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ALLIANCESDATABYDAY.endpoint.url, ALLIANCESDATABYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MARK_ALL_READ: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "mark_all_read",
        "mark_all_read",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MARK_ALL_READ.endpoint.name, MARK_ALL_READ.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MARK_ALL_READ.endpoint.url, MARK_ALL_READ.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const WARCOSTSBYDAY: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warcostsbyday",
        "warCostsByDay",
        {"coalition1":{"name":"coalition1","type":"Set\u003cNationOrAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cNationOrAlliance\u003e"},"type":{"name":"type","type":"WarCostByDayMode"},"time_start":{"name":"time_start","type":"long[Timestamp]"},"time_end":{"name":"time_end","optional":true,"type":"Long[Timestamp]"},"running_total":{"name":"running_total","optional":true,"flag":"o","type":"boolean"},"allowedWarStatus":{"name":"allowedWarStatus","optional":true,"flag":"s","type":"Set\u003cWarStatus\u003e"},"allowedWarTypes":{"name":"allowedWarTypes","optional":true,"flag":"w","type":"Set\u003cWarType\u003e"},"allowedAttackTypes":{"name":"allowedAttackTypes","optional":true,"flag":"a","type":"Set\u003cAttackType\u003e"},"allowedVictoryTypes":{"name":"allowedVictoryTypes","optional":true,"flag":"v","type":"Set\u003cSuccessType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(WARCOSTSBYDAY.endpoint.name, combine(WARCOSTSBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WARCOSTSBYDAY.endpoint.url, WARCOSTSBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ALLIANCESTATS: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string, coalition?: string}, {metrics?: string, start?: string, end?: string, coalition?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancestats",
        "allianceStats",
        {"metrics":{"name":"metrics","type":"Set\u003cAllianceMetric\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"coalition":{"name":"coalition","type":"Set\u003cDBAlliance\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metrics?: string, start?: string, end?: string, coalition?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ALLIANCESTATS.endpoint.name, combine(ALLIANCESTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string, coalition?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metrics?: string, start?: string, end?: string, coalition?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ALLIANCESTATS.endpoint.url, ALLIANCESTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_TOKEN: CommonEndpoint<ApiTypes.WebSuccess, {token?: string}, {token?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_token",
        "set_token",
        {"token":{"name":"token","type":"UUID"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {token?: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_TOKEN.endpoint.name, combine(SET_TOKEN.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {token?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {token?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_TOKEN.endpoint.url, SET_TOKEN.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SESSION: CommonEndpoint<ApiTypes.WebSession, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSession>(
        "session",
        "session",
        {},
        (data: unknown) => data as ApiTypes.WebSession,
        {type: CacheType.LocalStorage, duration: 2592000},
        "WebSession"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSession) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SESSION.endpoint.name, SESSION.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSession) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SESSION.endpoint.url, SESSION.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const BALANCE: CommonEndpoint<ApiTypes.WebBalance, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBalance>(
        "balance",
        "balance",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebBalance,
        {},
        "WebBalance"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string}, render: (data: ApiTypes.WebBalance) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(BALANCE.endpoint.name, combine(BALANCE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBalance) => void,
        handle_submit?: (args: {nation?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BALANCE.endpoint.url, BALANCE.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ORBISSTATBYDAY: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string}, {metrics?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "orbisstatbyday",
        "orbisStatByDay",
        {"metrics":{"name":"metrics","type":"Set\u003cOrbisMetric\u003e"},"start":{"name":"start","optional":true,"type":"Long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metrics?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ORBISSTATBYDAY.endpoint.name, combine(ORBISSTATBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metrics?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ORBISSTATBYDAY.endpoint.url, ORBISSTATBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREAD_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "unread_announcement",
        "unread_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id?: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREAD_ANNOUNCEMENT.endpoint.name, combine(UNREAD_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {ann_id?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_ANNOUNCEMENT.endpoint.url, UNREAD_ANNOUNCEMENT.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const REGISTER: CommonEndpoint<ApiTypes.WebSuccess, {confirm?: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "register",
        "register",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {confirm?: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(REGISTER.endpoint.name, combine(REGISTER.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {confirm?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(REGISTER.endpoint.url, REGISTER.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const COMPARETIERSTATS: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}, {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparetierstats",
        "compareTierStats",
        {"metric":{"name":"metric","type":"TypedFunction\u003cDBNation,Double\u003e"},"groupBy":{"name":"groupBy","type":"TypedFunction\u003cDBNation,Double\u003e"},"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition3":{"name":"coalition3","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition4":{"name":"coalition4","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition5":{"name":"coalition5","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition6":{"name":"coalition6","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition7":{"name":"coalition7","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition8":{"name":"coalition8","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition9":{"name":"coalition9","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition10":{"name":"coalition10","optional":true,"type":"Set\u003cDBNation\u003e"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"},"includeApps":{"name":"includeApps","optional":true,"flag":"a","type":"boolean"},"includeVm":{"name":"includeVm","optional":true,"flag":"v","type":"boolean"},"includeInactive":{"name":"includeInactive","optional":true,"flag":"i","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(COMPARETIERSTATS.endpoint.name, combine(COMPARETIERSTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(COMPARETIERSTATS.endpoint.url, COMPARETIERSTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ALLIANCEMETRICSCOMPAREBYTURN: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, alliances?: string, start?: string, end?: string}, {metric?: string, alliances?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancemetricscomparebyturn",
        "allianceMetricsCompareByTurn",
        {"metric":{"name":"metric","type":"AllianceMetric"},"alliances":{"name":"alliances","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, alliances?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ALLIANCEMETRICSCOMPAREBYTURN.endpoint.name, combine(ALLIANCEMETRICSCOMPAREBYTURN.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, alliances?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, alliances?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ALLIANCEMETRICSCOMPAREBYTURN.endpoint.url, ALLIANCEMETRICSCOMPAREBYTURN.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const GLOBALTIERSTATS: CommonEndpoint<ApiTypes.CoalitionGraphs, {metrics?: string, topX?: string, groupBy?: string, total?: string}, {metrics?: string, topX?: string, groupBy?: string, total?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.CoalitionGraphs>(
        "globaltierstats",
        "globalTierStats",
        {"metrics":{"name":"metrics","type":"Set\u003cTypedFunction\u003cDBNation,Double\u003e\u003e"},"topX":{"name":"topX","type":"int"},"groupBy":{"name":"groupBy","optional":true,"type":"TypedFunction\u003cDBNation,Double\u003e","def":"getCities"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"}},
        (data: unknown) => data as ApiTypes.CoalitionGraphs,
        {},
        "CoalitionGraphs"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metrics?: string, topX?: string, groupBy?: string, total?: string}, render: (data: ApiTypes.CoalitionGraphs) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(GLOBALTIERSTATS.endpoint.name, combine(GLOBALTIERSTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, topX?: string, groupBy?: string, total?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.CoalitionGraphs) => void,
        handle_submit?: (args: {metrics?: string, topX?: string, groupBy?: string, total?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(GLOBALTIERSTATS.endpoint.url, GLOBALTIERSTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const BANK_ACCESS: CommonEndpoint<ApiTypes.WebBankAccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBankAccess>(
        "bank_access",
        "bank_access",
        {},
        (data: unknown) => data as ApiTypes.WebBankAccess,
        {},
        "WebBankAccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebBankAccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(BANK_ACCESS.endpoint.name, BANK_ACCESS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBankAccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BANK_ACCESS.endpoint.url, BANK_ACCESS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADEVOLUMEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}, {resource?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradevolumebyday",
        "tradeVolumeByDay",
        {"resource":{"name":"resource","type":"ResourceType"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resource?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADEVOLUMEBYDAY.endpoint.name, combine(TRADEVOLUMEBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resource?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {resource?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEVOLUMEBYDAY.endpoint.url, TRADEVOLUMEBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ANNOUNCEMENTS: CommonEndpoint<ApiTypes.WebAnnouncements, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcements",
        "announcements",
        {},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        {type: CacheType.SessionStorage, duration: 30},
        "WebAnnouncements"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebAnnouncements) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ANNOUNCEMENTS.endpoint.name, ANNOUNCEMENTS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncements) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENTS.endpoint.url, ANNOUNCEMENTS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREGISTER: CommonEndpoint<ApiTypes.WebValue, {confirm?: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebValue>(
        "unregister",
        "unregister",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebValue,
        {},
        "WebValue"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {confirm?: string}, render: (data: ApiTypes.WebValue) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREGISTER.endpoint.name, combine(UNREGISTER.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebValue) => void,
        handle_submit?: (args: {confirm?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREGISTER.endpoint.url, UNREGISTER.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const RAID: CommonEndpoint<ApiTypes.WebTargets, {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "raid",
        "raid",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"},"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*,#position\u003c\u003d1"},"weak_ground":{"name":"weak_ground","optional":true,"type":"boolean","def":"false"},"vm_turns":{"name":"vm_turns","optional":true,"type":"int","def":"0"},"beige_turns":{"name":"beige_turns","optional":true,"type":"int","def":"0"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"time_inactive":{"name":"time_inactive","optional":true,"type":"long[Timediff]","def":"7d"},"min_loot":{"name":"min_loot","optional":true,"type":"double","def":"-1"},"num_results":{"name":"num_results","optional":true,"type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        {},
        "WebTargets"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, render: (data: ApiTypes.WebTargets) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(RAID.endpoint.name, combine(RAID.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTargets) => void,
        handle_submit?: (args: {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RAID.endpoint.url, RAID.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const READ_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "read_announcement",
        "read_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id?: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(READ_ANNOUNCEMENT.endpoint.name, combine(READ_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {ann_id?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(READ_ANNOUNCEMENT.endpoint.url, READ_ANNOUNCEMENT.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TAX_EXPENSE: CommonEndpoint<ApiTypes.TaxExpenses, {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}, {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.TaxExpenses>(
        "tax_expense",
        "tax_expense",
        {"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"nationList":{"name":"nationList","optional":true,"flag":"n","type":"Set\u003cDBNation\u003e"},"dontRequireGrant":{"name":"dontRequireGrant","optional":true,"flag":"g","type":"boolean"},"dontRequireTagged":{"name":"dontRequireTagged","optional":true,"flag":"t","type":"boolean"},"dontRequireExpiry":{"name":"dontRequireExpiry","optional":true,"flag":"e","type":"boolean"},"includeDeposits":{"name":"includeDeposits","optional":true,"flag":"d","type":"boolean"}},
        (data: unknown) => data as ApiTypes.TaxExpenses,
        {},
        "TaxExpenses"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}, render: (data: ApiTypes.TaxExpenses) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TAX_EXPENSE.endpoint.name, combine(TAX_EXPENSE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.TaxExpenses) => void,
        handle_submit?: (args: {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TAX_EXPENSE.endpoint.url, TAX_EXPENSE.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ALLIANCEMETRICSBYTURN: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, coalition?: string, start?: string, end?: string}, {metric?: string, coalition?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancemetricsbyturn",
        "allianceMetricsByTurn",
        {"metric":{"name":"metric","type":"AllianceMetric"},"coalition":{"name":"coalition","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metric?: string, coalition?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ALLIANCEMETRICSBYTURN.endpoint.name, combine(ALLIANCEMETRICSBYTURN.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, coalition?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metric?: string, coalition?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ALLIANCEMETRICSBYTURN.endpoint.url, ALLIANCEMETRICSBYTURN.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const RADIATIONSTATS: CommonEndpoint<ApiTypes.WebGraph, {continents?: string, start?: string, end?: string}, {continents?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "radiationstats",
        "radiationStats",
        {"continents":{"name":"continents","type":"Set\u003cContinent\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {continents?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(RADIATIONSTATS.endpoint.name, combine(RADIATIONSTATS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {continents?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {continents?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RADIATIONSTATS.endpoint.url, RADIATIONSTATS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const COMPARESTOCKPILEVALUEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {stockpile1?: string, stockpile2?: string, numDays?: string}, {stockpile1?: string, stockpile2?: string, numDays?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparestockpilevaluebyday",
        "compareStockpileValueByDay",
        {"stockpile1":{"name":"stockpile1","type":"Map\u003cResourceType,Double\u003e"},"stockpile2":{"name":"stockpile2","type":"Map\u003cResourceType,Double\u003e"},"numDays":{"name":"numDays","type":"int","min":1.0,"max":3000.0}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {stockpile1?: string, stockpile2?: string, numDays?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(COMPARESTOCKPILEVALUEBYDAY.endpoint.name, combine(COMPARESTOCKPILEVALUEBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {stockpile1?: string, stockpile2?: string, numDays?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {stockpile1?: string, stockpile2?: string, numDays?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(COMPARESTOCKPILEVALUEBYDAY.endpoint.url, COMPARESTOCKPILEVALUEBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MILITARIZATIONTIME: CommonEndpoint<ApiTypes.WebGraph, {alliance?: string, start_time?: string, end_time?: string}, {alliance?: string, start_time?: string, end_time?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "militarizationtime",
        "militarizationTime",
        {"alliance":{"name":"alliance","type":"DBAlliance"},"start_time":{"name":"start_time","optional":true,"type":"long[Timestamp]","def":"7d"},"end_time":{"name":"end_time","optional":true,"flag":"e","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {alliance?: string, start_time?: string, end_time?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MILITARIZATIONTIME.endpoint.name, combine(MILITARIZATIONTIME.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {alliance?: string, start_time?: string, end_time?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {alliance?: string, start_time?: string, end_time?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MILITARIZATIONTIME.endpoint.url, MILITARIZATIONTIME.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const INPUT_OPTIONS: CommonEndpoint<ApiTypes.WebOptions, {type?: string}, {type?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebOptions>(
        "input_options",
        "input_options",
        {"type":{"name":"type","type":"String"}},
        (data: unknown) => data as ApiTypes.WebOptions,
        {type: CacheType.LocalStorage, duration: 30},
        "WebOptions"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {type?: string}, render: (data: ApiTypes.WebOptions) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(INPUT_OPTIONS.endpoint.name, combine(INPUT_OPTIONS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebOptions) => void,
        handle_submit?: (args: {type?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(INPUT_OPTIONS.endpoint.url, INPUT_OPTIONS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADEPRICEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, numDays?: string}, {resources?: string, numDays?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradepricebyday",
        "tradePriceByDay",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"numDays":{"name":"numDays","type":"int"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resources?: string, numDays?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADEPRICEBYDAY.endpoint.name, combine(TRADEPRICEBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, numDays?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {resources?: string, numDays?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEPRICEBYDAY.endpoint.url, TRADEPRICEBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const LOGIN_MAIL: CommonEndpoint<ApiTypes.WebUrl, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebUrl>(
        "login_mail",
        "login_mail",
        {"nation":{"name":"nation","type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebUrl,
        {},
        "WebUrl"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string}, render: (data: ApiTypes.WebUrl) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(LOGIN_MAIL.endpoint.name, combine(LOGIN_MAIL.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebUrl) => void,
        handle_submit?: (args: {nation?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGIN_MAIL.endpoint.url, LOGIN_MAIL.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADEMARGINBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, start?: string, end?: string, percent?: string}, {resources?: string, start?: string, end?: string, percent?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "trademarginbyday",
        "tradeMarginByDay",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"},"percent":{"name":"percent","optional":true,"desc":"Use the margin percent instead of absolute difference","type":"boolean","def":"true"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resources?: string, start?: string, end?: string, percent?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADEMARGINBYDAY.endpoint.name, combine(TRADEMARGINBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, start?: string, end?: string, percent?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {resources?: string, start?: string, end?: string, percent?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEMARGINBYDAY.endpoint.url, TRADEMARGINBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MY_WARS: CommonEndpoint<ApiTypes.WebMyWars, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebMyWars>(
        "my_wars",
        "my_wars",
        {},
        (data: unknown) => data as ApiTypes.WebMyWars,
        {},
        "WebMyWars"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebMyWars) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MY_WARS.endpoint.name, MY_WARS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebMyWars) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MY_WARS.endpoint.url, MY_WARS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MY_AUDITS: CommonEndpoint<ApiTypes.WebAudits, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAudits>(
        "my_audits",
        "my_audits",
        {},
        (data: unknown) => data as ApiTypes.WebAudits,
        {type: CacheType.SessionStorage, duration: 30},
        "WebAudits"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebAudits) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MY_AUDITS.endpoint.name, MY_AUDITS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAudits) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MY_AUDITS.endpoint.url, MY_AUDITS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const RECORDS: CommonEndpoint<ApiTypes.WebTable, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "records",
        "records",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebTable,
        {},
        "WebTable"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string}, render: (data: ApiTypes.WebTable) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(RECORDS.endpoint.name, combine(RECORDS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTable) => void,
        handle_submit?: (args: {nation?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RECORDS.endpoint.url, RECORDS.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const LOGOUT: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "logout",
        "logout",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(LOGOUT.endpoint.name, LOGOUT.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGOUT.endpoint.url, LOGOUT.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SCORETIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "scoretiergraph",
        "scoreTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SCORETIERGRAPH.endpoint.name, combine(SCORETIERGRAPH.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SCORETIERGRAPH.endpoint.url, SCORETIERGRAPH.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SPYTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "spytiergraph",
        "spyTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"total":{"name":"total","optional":true,"flag":"t","desc":"Graph the total spies instead of average per nation","type":"boolean"},"barGraph":{"name":"barGraph","optional":true,"flag":"b","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SPYTIERGRAPH.endpoint.name, combine(SPYTIERGRAPH.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SPYTIERGRAPH.endpoint.url, SPYTIERGRAPH.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const STRENGTHTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "strengthtiergraph",
        "strengthTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"n","type":"boolean"},"col1MMR":{"name":"col1MMR","optional":true,"flag":"a","desc":"Use the score/strength of coalition 1 nations at specific military unit levels","type":"MMRDouble"},"col2MMR":{"name":"col2MMR","optional":true,"flag":"b","desc":"Use the score/strength of coalition 2 nations at specific military unit levels","type":"MMRDouble"},"col1Infra":{"name":"col1Infra","optional":true,"flag":"c","desc":"Use the score of coalition 1 nations at specific average infrastructure levels","type":"Double"},"col2Infra":{"name":"col2Infra","optional":true,"flag":"d","desc":"Use the score of coalition 2 nations at specific average infrastructure levels","type":"Double"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(STRENGTHTIERGRAPH.endpoint.name, combine(STRENGTHTIERGRAPH.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(STRENGTHTIERGRAPH.endpoint.url, STRENGTHTIERGRAPH.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREAD_COUNT: CommonEndpoint<ApiTypes.WebInt, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebInt>(
        "unread_count",
        "unread_count",
        {},
        (data: unknown) => data as ApiTypes.WebInt,
        {},
        "WebInt"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebInt) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREAD_COUNT.endpoint.name, UNREAD_COUNT.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebInt) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_COUNT.endpoint.url, UNREAD_COUNT.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_OAUTH_CODE: CommonEndpoint<ApiTypes.WebSuccess, {code?: string}, {code?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_oauth_code",
        "set_oauth_code",
        {"code":{"name":"code","type":"String"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {code?: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_OAUTH_CODE.endpoint.name, combine(SET_OAUTH_CODE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {code?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {code?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_OAUTH_CODE.endpoint.url, SET_OAUTH_CODE.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ANNOUNCEMENT_TITLES: CommonEndpoint<ApiTypes.WebAnnouncements, {read?: string}, {read?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcement_titles",
        "announcement_titles",
        {"read":{"name":"read","optional":true,"flag":"r","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        {},
        "WebAnnouncements"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {read?: string}, render: (data: ApiTypes.WebAnnouncements) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ANNOUNCEMENT_TITLES.endpoint.name, combine(ANNOUNCEMENT_TITLES.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {read?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncements) => void,
        handle_submit?: (args: {read?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENT_TITLES.endpoint.url, ANNOUNCEMENT_TITLES.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const WARATTACKSBYDAY: CommonEndpoint<ApiTypes.WebGraph, {nations?: string, cutoff?: string, allowedTypes?: string}, {nations?: string, cutoff?: string, allowedTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warattacksbyday",
        "warAttacksByDay",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e"},"cutoff":{"name":"cutoff","optional":true,"desc":"Period of time to graph","type":"Long[Timestamp]"},"allowedTypes":{"name":"allowedTypes","optional":true,"desc":"Restrict to a list of attack types","type":"Set\u003cAttackType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nations?: string, cutoff?: string, allowedTypes?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(WARATTACKSBYDAY.endpoint.name, combine(WARATTACKSBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, cutoff?: string, allowedTypes?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {nations?: string, cutoff?: string, allowedTypes?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WARATTACKSBYDAY.endpoint.url, WARATTACKSBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const VIEW_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebAnnouncement, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncement>(
        "view_announcement",
        "view_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebAnnouncement,
        {type: CacheType.SessionStorage, duration: 2592000},
        "WebAnnouncement"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id?: string}, render: (data: ApiTypes.WebAnnouncement) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(VIEW_ANNOUNCEMENT.endpoint.name, combine(VIEW_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncement) => void,
        handle_submit?: (args: {ann_id?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(VIEW_ANNOUNCEMENT.endpoint.url, VIEW_ANNOUNCEMENT.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_GUILD: CommonEndpoint<ApiTypes.SetGuild, {guild?: string}, {guild?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.SetGuild>(
        "set_guild",
        "set_guild",
        {"guild":{"name":"guild","type":"Guild"}},
        (data: unknown) => data as ApiTypes.SetGuild,
        {},
        "SetGuild"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {guild?: string}, render: (data: ApiTypes.SetGuild) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_GUILD.endpoint.name, combine(SET_GUILD.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {guild?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.SetGuild) => void,
        handle_submit?: (args: {guild?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_GUILD.endpoint.url, SET_GUILD.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const METRICBYGROUP: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}, {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "metricbygroup",
        "metricByGroup",
        {"metrics":{"name":"metrics","type":"Set\u003cTypedFunction\u003cDBNation,Double\u003e\u003e"},"nations":{"name":"nations","type":"Set\u003cDBNation\u003e"},"groupBy":{"name":"groupBy","optional":true,"type":"TypedFunction\u003cDBNation,Double\u003e","def":"getCities"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(METRICBYGROUP.endpoint.name, combine(METRICBYGROUP.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(METRICBYGROUP.endpoint.url, METRICBYGROUP.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const CITYTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "citytiergraph",
        "cityTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"barGraph":{"name":"barGraph","optional":true,"flag":"b","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(CITYTIERGRAPH.endpoint.name, combine(CITYTIERGRAPH.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(CITYTIERGRAPH.endpoint.url, CITYTIERGRAPH.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNPROTECTED: CommonEndpoint<ApiTypes.WebTargets, {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "unprotected",
        "unprotected",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"},"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*"},"includeAllies":{"name":"includeAllies","optional":true,"flag":"a","type":"boolean"},"ignoreODP":{"name":"ignoreODP","optional":true,"flag":"o","type":"boolean"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"maxRelativeTargetStrength":{"name":"maxRelativeTargetStrength","optional":true,"flag":"s","desc":"The maximum allowed military strength of the target nation relative to you","type":"Double","def":"1.2"},"maxRelativeCounterStrength":{"name":"maxRelativeCounterStrength","optional":true,"flag":"c","desc":"The maximum allowed military strength of counters relative to you","type":"Double","def":"1.2"},"num_results":{"name":"num_results","optional":true,"desc":"Only list targets within range of ALL attackers","type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        {},
        "WebTargets"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, render: (data: ApiTypes.WebTargets) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNPROTECTED.endpoint.name, combine(UNPROTECTED.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTargets) => void,
        handle_submit?: (args: {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNPROTECTED.endpoint.url, UNPROTECTED.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADEPRICEBYDAYJSON: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, days?: string}, {resources?: string, days?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradepricebydayjson",
        "tradePriceByDayJson",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"days":{"name":"days","type":"int","min":1.0}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resources?: string, days?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADEPRICEBYDAYJSON.endpoint.name, combine(TRADEPRICEBYDAYJSON.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, days?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {resources?: string, days?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEPRICEBYDAYJSON.endpoint.url, TRADEPRICEBYDAYJSON.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const WITHDRAW: CommonEndpoint<ApiTypes.WebTransferResult, {receiver?: string, amount?: string, note?: string}, {receiver?: string, amount?: string, note?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTransferResult>(
        "withdraw",
        "withdraw",
        {"receiver":{"name":"receiver","type":"NationOrAlliance"},"amount":{"name":"amount","type":"Map\u003cResourceType,Double\u003e"},"note":{"name":"note","type":"DepositType"}},
        (data: unknown) => data as ApiTypes.WebTransferResult,
        {},
        "WebTransferResult"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {receiver?: string, amount?: string, note?: string}, render: (data: ApiTypes.WebTransferResult) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(WITHDRAW.endpoint.name, combine(WITHDRAW.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {receiver?: string, amount?: string, note?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTransferResult) => void,
        handle_submit?: (args: {receiver?: string, amount?: string, note?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WITHDRAW.endpoint.url, WITHDRAW.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADETOTALBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}, {resource?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradetotalbyday",
        "tradeTotalByDay",
        {"resource":{"name":"resource","type":"ResourceType"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        {},
        "WebGraph"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resource?: string, start?: string, end?: string}, render: (data: ApiTypes.WebGraph) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADETOTALBYDAY.endpoint.name, combine(TRADETOTALBYDAY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resource?: string, start?: string, end?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebGraph) => void,
        handle_submit?: (args: {resource?: string, start?: string, end?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADETOTALBYDAY.endpoint.url, TRADETOTALBYDAY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TEST: CommonEndpoint<ApiTypes.WebValue, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebValue>(
        "test",
        "test",
        {},
        (data: unknown) => data as ApiTypes.WebValue,
        {type: CacheType.LocalStorage, duration: 2592000},
        "WebValue"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebValue) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TEST.endpoint.name, TEST.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebValue) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TEST.endpoint.url, TEST.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const QUERY: CommonEndpoint<ApiTypes.WebBulkQuery, {queries?: string}, {queries?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBulkQuery>(
        "query",
        "query",
        {"queries":{"name":"queries","type":"List\u003cEntry\u003cString,Map\u003cString,Object\u003e\u003e\u003e"}},
        (data: unknown) => data as ApiTypes.WebBulkQuery,
        {},
        "WebBulkQuery"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {queries?: string}, render: (data: ApiTypes.WebBulkQuery) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(QUERY.endpoint.name, combine(QUERY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {queries?: string},
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBulkQuery) => void,
        handle_submit?: (args: {queries?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(QUERY.endpoint.url, QUERY.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNSET_GUILD: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "unset_guild",
        "unset_guild",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {},
        "WebSuccess"
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNSET_GUILD.endpoint.name, UNSET_GUILD.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, showArguments = [], label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        showArguments?: string[],
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNSET_GUILD.endpoint.url, UNSET_GUILD.endpoint.args, message, default_values, showArguments, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ENDPOINTS = [WARSCOSTRANKINGBYDAY, GLOBALSTATS, TABLE, ALLIANCEMETRICSAB, COMPARESTATS, NTHBEIGELOOTBYSCORERANGE, ALLIANCESDATABYDAY, MARK_ALL_READ, WARCOSTSBYDAY, ALLIANCESTATS, SET_TOKEN, SESSION, BALANCE, ORBISSTATBYDAY, UNREAD_ANNOUNCEMENT, REGISTER, COMPARETIERSTATS, ALLIANCEMETRICSCOMPAREBYTURN, GLOBALTIERSTATS, BANK_ACCESS, TRADEVOLUMEBYDAY, ANNOUNCEMENTS, UNREGISTER, RAID, READ_ANNOUNCEMENT, TAX_EXPENSE, ALLIANCEMETRICSBYTURN, RADIATIONSTATS, COMPARESTOCKPILEVALUEBYDAY, MILITARIZATIONTIME, INPUT_OPTIONS, TRADEPRICEBYDAY, LOGIN_MAIL, TRADEMARGINBYDAY, MY_WARS, MY_AUDITS, RECORDS, LOGOUT, SCORETIERGRAPH, SPYTIERGRAPH, STRENGTHTIERGRAPH, UNREAD_COUNT, SET_OAUTH_CODE, ANNOUNCEMENT_TITLES, WARATTACKSBYDAY, VIEW_ANNOUNCEMENT, SET_GUILD, METRICBYGROUP, CITYTIERGRAPH, UNPROTECTED, TRADEPRICEBYDAYJSON, WITHDRAW, TRADETOTALBYDAY, TEST, QUERY, UNSET_GUILD];
