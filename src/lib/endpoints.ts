import React, {ReactNode} from "react";
import { DisplayProps } from "@/components/api/bulkwrapper";
import { ApiEndpoint, CommonEndpoint } from "./BulkQuery";
import type * as ApiTypes from "@/lib/apitypes.d.ts";
import { ApiFormInputsProps } from "@/components/api/apiform";
export const WARSCOSTRANKINGBYDAY: CommonEndpoint<ApiTypes.WebGraph, {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warscostrankingbyday",
        "warsCostRankingByDay",
        {"type":{"name":"type","type":"WarCostByDayMode"},"mode":{"name":"mode","type":"WarCostMode"},"time_start":{"name":"time_start","type":"long[Timestamp]"},"time_end":{"name":"time_end","optional":true,"type":"Long[Timestamp]"},"coalition1":{"name":"coalition1","optional":true,"flag":"c1","type":"Set\u003cNationOrAlliance\u003e"},"coalition2":{"name":"coalition2","optional":true,"flag":"c2","type":"Set\u003cNationOrAlliance\u003e"},"coalition3":{"name":"coalition3","optional":true,"flag":"c3","type":"Set\u003cNationOrAlliance\u003e"},"coalition4":{"name":"coalition4","optional":true,"flag":"c4","type":"Set\u003cNationOrAlliance\u003e"},"coalition5":{"name":"coalition5","optional":true,"flag":"c5","type":"Set\u003cNationOrAlliance\u003e"},"coalition6":{"name":"coalition6","optional":true,"flag":"c6","type":"Set\u003cNationOrAlliance\u003e"},"coalition7":{"name":"coalition7","optional":true,"flag":"c7","type":"Set\u003cNationOrAlliance\u003e"},"coalition8":{"name":"coalition8","optional":true,"flag":"c8","type":"Set\u003cNationOrAlliance\u003e"},"coalition9":{"name":"coalition9","optional":true,"flag":"c9","type":"Set\u003cNationOrAlliance\u003e"},"coalition10":{"name":"coalition10","optional":true,"flag":"c10","type":"Set\u003cNationOrAlliance\u003e"},"running_total":{"name":"running_total","optional":true,"flag":"o","type":"boolean"},"allowedWarStatus":{"name":"allowedWarStatus","optional":true,"flag":"s","type":"Set\u003cWarStatus\u003e"},"allowedWarTypes":{"name":"allowedWarTypes","optional":true,"flag":"w","type":"Set\u003cWarType\u003e"},"allowedAttackTypes":{"name":"allowedAttackTypes","optional":true,"flag":"a","type":"Set\u003cAttackType\u003e"},"allowedVictoryTypes":{"name":"allowedVictoryTypes","optional":true,"flag":"v","type":"Set\u003cSuccessType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph of cost by day of each coalitions wars vs everyone`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {type?: string, mode?: string, time_start?: string, time_end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> => {
        return {
            endpoint: WARSCOSTRANKINGBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: WARSCOSTRANKINGBYDAY.endpoint.cache_duration,
            args: WARSCOSTRANKINGBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const GLOBALSTATS: CommonEndpoint<ApiTypes.CoalitionGraphs, {metrics?: string, start?: string, end?: string, topX?: string}, {metrics?: string, start?: string, end?: string, topX?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.CoalitionGraphs>(
        "globalstats",
        "globalStats",
        {"metrics":{"name":"metrics","type":"Set\u003cAllianceMetric\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"topX":{"name":"topX","type":"int"}},
        (data: unknown) => data as ApiTypes.CoalitionGraphs,
        2592000,
        'None',
        "CoalitionGraphs",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string, topX?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metrics?: string, start?: string, end?: string, topX?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.CoalitionGraphs, {metrics?: string, start?: string, end?: string, topX?: string}> => {
        return {
            endpoint: GLOBALSTATS.endpoint.name,
            default_values: default_values,
            cache_duration: GLOBALSTATS.endpoint.cache_duration,
            args: GLOBALSTATS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TABLE: CommonEndpoint<ApiTypes.WebTable, {type?: string, selection_str?: string, columns?: string[] | string}, {type?: string, selection_str?: string, columns?: string[] | string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "table",
        "table",
        {"type":{"name":"type","type":"Class[PlaceholderType]"},"selection_str":{"name":"selection_str","type":"String"},"columns":{"name":"columns","type":"List\u003cString\u003e[TextArea]"}},
        (data: unknown) => data as ApiTypes.WebTable,
        2592000,
        'None',
        "WebTable",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string, selection_str?: string, columns?: string[] | string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {type?: string, selection_str?: string, columns?: string[] | string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebTable, {type?: string, selection_str?: string, columns?: string[] | string}> => {
        return {
            endpoint: TABLE.endpoint.name,
            default_values: default_values,
            cache_duration: TABLE.endpoint.cache_duration,
            args: TABLE.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const COMPARESTATS: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}, {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparestats",
        "compareStats",
        {"metric":{"name":"metric","type":"AllianceMetric"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"coalition1":{"name":"coalition1","type":"Set\u003cDBAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBAlliance\u003e"},"coalition3":{"name":"coalition3","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition4":{"name":"coalition4","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition5":{"name":"coalition5","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition6":{"name":"coalition6","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition7":{"name":"coalition7","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition8":{"name":"coalition8","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition9":{"name":"coalition9","optional":true,"type":"Set\u003cDBAlliance\u003e"},"coalition10":{"name":"coalition10","optional":true,"type":"Set\u003cDBAlliance\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Compare the stats of up to 10 alliances/coalitions on a single time graph`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string}> => {
        return {
            endpoint: COMPARESTATS.endpoint.name,
            default_values: default_values,
            cache_duration: COMPARESTATS.endpoint.cache_duration,
            args: COMPARESTATS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ALLIANCEMETRICAB: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}, {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancemetricab",
        "allianceMetricAB",
        {"metric":{"name":"metric","type":"AllianceMetric"},"coalition1":{"name":"coalition1","type":"Set\u003cDBAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph an alliance metric over time for two coalitions`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, coalition1?: string, coalition2?: string, start?: string, end?: string}> => {
        return {
            endpoint: ALLIANCEMETRICAB.endpoint.name,
            default_values: default_values,
            cache_duration: ALLIANCEMETRICAB.endpoint.cache_duration,
            args: ALLIANCEMETRICAB.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ALLIANCEMETRICBYTURN: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, coalition?: string, start?: string, end?: string}, {metric?: string, coalition?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancemetricbyturn",
        "allianceMetricByTurn",
        {"metric":{"name":"metric","type":"AllianceMetric"},"coalition":{"name":"coalition","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph the metric over time for a coalition`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, coalition?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, coalition?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, coalition?: string, start?: string, end?: string}> => {
        return {
            endpoint: ALLIANCEMETRICBYTURN.endpoint.name,
            default_values: default_values,
            cache_duration: ALLIANCEMETRICBYTURN.endpoint.cache_duration,
            args: ALLIANCEMETRICBYTURN.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const NTHBEIGELOOTBYSCORERANGE: CommonEndpoint<ApiTypes.WebGraph, {nations?: string, n?: string, snapshotDate?: string}, {nations?: string, n?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "nthbeigelootbyscorerange",
        "NthBeigeLootByScoreRange",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e"},"n":{"name":"n","optional":true,"type":"int","def":"5"},"snapshotDate":{"name":"snapshotDate","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Get nth loot beige graph by score range`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, n?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nations?: string, n?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {nations?: string, n?: string, snapshotDate?: string}> => {
        return {
            endpoint: NTHBEIGELOOTBYSCORERANGE.endpoint.name,
            default_values: default_values,
            cache_duration: NTHBEIGELOOTBYSCORERANGE.endpoint.cache_duration,
            args: NTHBEIGELOOTBYSCORERANGE.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ALLIANCESDATABYDAY: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}, {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancesdatabyday",
        "AlliancesDataByDay",
        {"metric":{"name":"metric","type":"TypedFunction\u003cDBNation,Double\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"mode":{"name":"mode","type":"AllianceMetricMode"},"alliances":{"name":"alliances","optional":true,"desc":"The alliances to include. Defaults to top 15","type":"Set\u003cDBAlliance\u003e"},"filter":{"name":"filter","optional":true,"type":"Predicate\u003cDBNation\u003e"},"includeApps":{"name":"includeApps","optional":true,"flag":"a","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Get alliance attributes by day
If your metric does not relate to cities, set \`skipCityData\` to true to speed up the process.`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, start?: string, end?: string, mode?: string, alliances?: string, filter?: string, includeApps?: string}> => {
        return {
            endpoint: ALLIANCESDATABYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: ALLIANCESDATABYDAY.endpoint.cache_duration,
            args: ALLIANCESDATABYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MARK_ALL_READ: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "mark_all_read",
        "mark_all_read",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, Record<string, never>> => {
        return {
            endpoint: MARK_ALL_READ.endpoint.name,
            default_values: default_values,
            cache_duration: MARK_ALL_READ.endpoint.cache_duration,
            args: MARK_ALL_READ.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const WARCOSTSBYDAY: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}, {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warcostsbyday",
        "warCostsByDay",
        {"coalition1":{"name":"coalition1","type":"Set\u003cNationOrAlliance\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cNationOrAlliance\u003e"},"type":{"name":"type","type":"WarCostByDayMode"},"time_start":{"name":"time_start","type":"long[Timestamp]"},"time_end":{"name":"time_end","optional":true,"type":"Long[Timestamp]"},"running_total":{"name":"running_total","optional":true,"flag":"o","type":"boolean"},"allowedWarStatus":{"name":"allowedWarStatus","optional":true,"flag":"s","type":"Set\u003cWarStatus\u003e"},"allowedWarTypes":{"name":"allowedWarTypes","optional":true,"flag":"w","type":"Set\u003cWarType\u003e"},"allowedAttackTypes":{"name":"allowedAttackTypes","optional":true,"flag":"a","type":"Set\u003cAttackType\u003e"},"allowedVictoryTypes":{"name":"allowedVictoryTypes","optional":true,"flag":"v","type":"Set\u003cSuccessType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Get a line graph by day of the war stats between two coalitions`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, type?: string, time_start?: string, time_end?: string, running_total?: string, allowedWarStatus?: string, allowedWarTypes?: string, allowedAttackTypes?: string, allowedVictoryTypes?: string}> => {
        return {
            endpoint: WARCOSTSBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: WARCOSTSBYDAY.endpoint.cache_duration,
            args: WARCOSTSBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ALLIANCESTATS: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string, coalition?: string}, {metrics?: string, start?: string, end?: string, coalition?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "alliancestats",
        "allianceStats",
        {"metrics":{"name":"metrics","type":"Set\u003cAllianceMetric\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"coalition":{"name":"coalition","type":"Set\u003cDBAlliance\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string, coalition?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metrics?: string, start?: string, end?: string, coalition?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string, coalition?: string}> => {
        return {
            endpoint: ALLIANCESTATS.endpoint.name,
            default_values: default_values,
            cache_duration: ALLIANCESTATS.endpoint.cache_duration,
            args: ALLIANCESTATS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SET_TOKEN: CommonEndpoint<ApiTypes.WebSuccess, {token?: string}, {token?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_token",
        "set_token",
        {"token":{"name":"token","type":"UUID"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {token?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {token?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, {token?: string}> => {
        return {
            endpoint: SET_TOKEN.endpoint.name,
            default_values: default_values,
            cache_duration: SET_TOKEN.endpoint.cache_duration,
            args: SET_TOKEN.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SESSION: CommonEndpoint<ApiTypes.WebSession, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSession>(
        "session",
        "session",
        {},
        (data: unknown) => data as ApiTypes.WebSession,
        2592000,
        'LocalStorage',
        "WebSession",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSession, Record<string, never>> => {
        return {
            endpoint: SESSION.endpoint.name,
            default_values: default_values,
            cache_duration: SESSION.endpoint.cache_duration,
            args: SESSION.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const BALANCE: CommonEndpoint<ApiTypes.WebBalance, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBalance>(
        "balance",
        "balance",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebBalance,
        2592000,
        'None',
        "WebBalance",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebBalance, {nation?: string}> => {
        return {
            endpoint: BALANCE.endpoint.name,
            default_values: default_values,
            cache_duration: BALANCE.endpoint.cache_duration,
            args: BALANCE.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ORBISSTATBYDAY: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string}, {metrics?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "orbisstatbyday",
        "orbisStatByDay",
        {"metrics":{"name":"metrics","type":"Set\u003cOrbisMetric\u003e"},"start":{"name":"start","optional":true,"type":"Long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Get a game graph by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metrics?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metrics?: string, start?: string, end?: string}> => {
        return {
            endpoint: ORBISSTATBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: ORBISSTATBYDAY.endpoint.cache_duration,
            args: ORBISSTATBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const UNREAD_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "unread_announcement",
        "unread_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {ann_id?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, {ann_id?: string}> => {
        return {
            endpoint: UNREAD_ANNOUNCEMENT.endpoint.name,
            default_values: default_values,
            cache_duration: UNREAD_ANNOUNCEMENT.endpoint.cache_duration,
            args: UNREAD_ANNOUNCEMENT.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const REGISTER: CommonEndpoint<ApiTypes.WebSuccess, {confirm?: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "register",
        "register",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {confirm?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, {confirm?: string}> => {
        return {
            endpoint: REGISTER.endpoint.name,
            default_values: default_values,
            cache_duration: REGISTER.endpoint.cache_duration,
            args: REGISTER.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const COMPARETIERSTATS: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}, {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparetierstats",
        "compareTierStats",
        {"metric":{"name":"metric","type":"TypedFunction\u003cDBNation,Double\u003e"},"groupBy":{"name":"groupBy","type":"TypedFunction\u003cDBNation,Double\u003e"},"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition3":{"name":"coalition3","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition4":{"name":"coalition4","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition5":{"name":"coalition5","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition6":{"name":"coalition6","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition7":{"name":"coalition7","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition8":{"name":"coalition8","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition9":{"name":"coalition9","optional":true,"type":"Set\u003cDBNation\u003e"},"coalition10":{"name":"coalition10","optional":true,"type":"Set\u003cDBNation\u003e"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"},"includeApps":{"name":"includeApps","optional":true,"flag":"a","type":"boolean"},"includeVm":{"name":"includeVm","optional":true,"flag":"v","type":"boolean"},"includeInactive":{"name":"includeInactive","optional":true,"flag":"i","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Compare the tier stats of up to 10 alliances/nations on a single graph`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, groupBy?: string, coalition1?: string, coalition2?: string, coalition3?: string, coalition4?: string, coalition5?: string, coalition6?: string, coalition7?: string, coalition8?: string, coalition9?: string, coalition10?: string, total?: string, includeApps?: string, includeVm?: string, includeInactive?: string, snapshotDate?: string}> => {
        return {
            endpoint: COMPARETIERSTATS.endpoint.name,
            default_values: default_values,
            cache_duration: COMPARETIERSTATS.endpoint.cache_duration,
            args: COMPARETIERSTATS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const RADIATIONBYTURN: CommonEndpoint<ApiTypes.WebGraph, {continents?: string, start?: string, end?: string}, {continents?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "radiationbyturn",
        "radiationByTurn",
        {"continents":{"name":"continents","type":"Set\u003cContinent\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph global and per continent radiation by turn over a specified time period`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {continents?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {continents?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {continents?: string, start?: string, end?: string}> => {
        return {
            endpoint: RADIATIONBYTURN.endpoint.name,
            default_values: default_values,
            cache_duration: RADIATIONBYTURN.endpoint.cache_duration,
            args: RADIATIONBYTURN.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const GLOBALTIERSTATS: CommonEndpoint<ApiTypes.CoalitionGraphs, {metrics?: string, topX?: string, groupBy?: string, total?: string}, {metrics?: string, topX?: string, groupBy?: string, total?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.CoalitionGraphs>(
        "globaltierstats",
        "globalTierStats",
        {"metrics":{"name":"metrics","type":"Set\u003cTypedFunction\u003cDBNation,Double\u003e\u003e"},"topX":{"name":"topX","type":"int"},"groupBy":{"name":"groupBy","optional":true,"type":"TypedFunction\u003cDBNation,Double\u003e","def":"getCities"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"}},
        (data: unknown) => data as ApiTypes.CoalitionGraphs,
        2592000,
        'None',
        "CoalitionGraphs",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, topX?: string, groupBy?: string, total?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metrics?: string, topX?: string, groupBy?: string, total?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.CoalitionGraphs, {metrics?: string, topX?: string, groupBy?: string, total?: string}> => {
        return {
            endpoint: GLOBALTIERSTATS.endpoint.name,
            default_values: default_values,
            cache_duration: GLOBALTIERSTATS.endpoint.cache_duration,
            args: GLOBALTIERSTATS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const BANK_ACCESS: CommonEndpoint<ApiTypes.WebBankAccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBankAccess>(
        "bank_access",
        "bank_access",
        {},
        (data: unknown) => data as ApiTypes.WebBankAccess,
        2592000,
        'None',
        "WebBankAccess",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebBankAccess, Record<string, never>> => {
        return {
            endpoint: BANK_ACCESS.endpoint.name,
            default_values: default_values,
            cache_duration: BANK_ACCESS.endpoint.cache_duration,
            args: BANK_ACCESS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const COMMAND: CommonEndpoint<ApiTypes.WebViewCommand, {data?: string}, {data?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebViewCommand>(
        "command",
        "command",
        {"data":{"name":"data","type":"Map\u003cString,Object\u003e"}},
        (data: unknown) => data as ApiTypes.WebViewCommand,
        2592000,
        'None',
        "WebViewCommand",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {data?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {data?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebViewCommand, {data?: string}> => {
        return {
            endpoint: COMMAND.endpoint.name,
            default_values: default_values,
            cache_duration: COMMAND.endpoint.cache_duration,
            args: COMMAND.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TRADEVOLUMEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}, {resource?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradevolumebyday",
        "tradeVolumeByDay",
        {"resource":{"name":"resource","type":"ResourceType"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of average trade buy and sell volume by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resource?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {resource?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}> => {
        return {
            endpoint: TRADEVOLUMEBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: TRADEVOLUMEBYDAY.endpoint.cache_duration,
            args: TRADEVOLUMEBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ANNOUNCEMENTS: CommonEndpoint<ApiTypes.WebAnnouncements, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcements",
        "announcements",
        {},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        30,
        'SessionStorage',
        "WebAnnouncements",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebAnnouncements, Record<string, never>> => {
        return {
            endpoint: ANNOUNCEMENTS.endpoint.name,
            default_values: default_values,
            cache_duration: ANNOUNCEMENTS.endpoint.cache_duration,
            args: ANNOUNCEMENTS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const UNREGISTER: CommonEndpoint<ApiTypes.WebValue, {confirm?: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebValue>(
        "unregister",
        "unregister",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebValue,
        2592000,
        'None',
        "WebValue",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {confirm?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebValue, {confirm?: string}> => {
        return {
            endpoint: UNREGISTER.endpoint.name,
            default_values: default_values,
            cache_duration: UNREGISTER.endpoint.cache_duration,
            args: UNREGISTER.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const RAID: CommonEndpoint<ApiTypes.WebTargets, {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "raid",
        "raid",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"},"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*,#position\u003c\u003d1"},"weak_ground":{"name":"weak_ground","optional":true,"type":"boolean","def":"false"},"vm_turns":{"name":"vm_turns","optional":true,"type":"int","def":"0"},"beige_turns":{"name":"beige_turns","optional":true,"type":"int","def":"0"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"time_inactive":{"name":"time_inactive","optional":true,"type":"long[Timediff]","def":"7d"},"min_loot":{"name":"min_loot","optional":true,"type":"double","def":"-1"},"num_results":{"name":"num_results","optional":true,"type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        2592000,
        'None',
        "WebTargets",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebTargets, {nation?: string, nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}> => {
        return {
            endpoint: RAID.endpoint.name,
            default_values: default_values,
            cache_duration: RAID.endpoint.cache_duration,
            args: RAID.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const READ_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "read_announcement",
        "read_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {ann_id?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, {ann_id?: string}> => {
        return {
            endpoint: READ_ANNOUNCEMENT.endpoint.name,
            default_values: default_values,
            cache_duration: READ_ANNOUNCEMENT.endpoint.cache_duration,
            args: READ_ANNOUNCEMENT.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TAX_EXPENSE: CommonEndpoint<ApiTypes.TaxExpenses, {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}, {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.TaxExpenses>(
        "tax_expense",
        "tax_expense",
        {"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","type":"long[Timestamp]"},"nationList":{"name":"nationList","optional":true,"flag":"n","type":"Set\u003cDBNation\u003e"},"dontRequireGrant":{"name":"dontRequireGrant","optional":true,"flag":"g","type":"boolean"},"dontRequireTagged":{"name":"dontRequireTagged","optional":true,"flag":"t","type":"boolean"},"dontRequireExpiry":{"name":"dontRequireExpiry","optional":true,"flag":"e","type":"boolean"},"includeDeposits":{"name":"includeDeposits","optional":true,"flag":"d","type":"boolean"}},
        (data: unknown) => data as ApiTypes.TaxExpenses,
        2592000,
        'None',
        "TaxExpenses",
        `Show cumulative tax expenses over a period by nation/bracket`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.TaxExpenses, {start?: string, end?: string, nationList?: string, dontRequireGrant?: string, dontRequireTagged?: string, dontRequireExpiry?: string, includeDeposits?: string}> => {
        return {
            endpoint: TAX_EXPENSE.endpoint.name,
            default_values: default_values,
            cache_duration: TAX_EXPENSE.endpoint.cache_duration,
            args: TAX_EXPENSE.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const COMPARESTOCKPILEVALUEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {stockpile1?: string, stockpile2?: string, numDays?: string}, {stockpile1?: string, stockpile2?: string, numDays?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "comparestockpilevaluebyday",
        "compareStockpileValueByDay",
        {"stockpile1":{"name":"stockpile1","type":"Map\u003cResourceType,Double\u003e"},"stockpile2":{"name":"stockpile2","type":"Map\u003cResourceType,Double\u003e"},"numDays":{"name":"numDays","type":"int","min":1.0,"max":3000.0}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph comparing market values of two resource amounts by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {stockpile1?: string, stockpile2?: string, numDays?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {stockpile1?: string, stockpile2?: string, numDays?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {stockpile1?: string, stockpile2?: string, numDays?: string}> => {
        return {
            endpoint: COMPARESTOCKPILEVALUEBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: COMPARESTOCKPILEVALUEBYDAY.endpoint.cache_duration,
            args: COMPARESTOCKPILEVALUEBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MILITARIZATIONTIME: CommonEndpoint<ApiTypes.WebGraph, {alliance?: string, start_time?: string, end_time?: string}, {alliance?: string, start_time?: string, end_time?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "militarizationtime",
        "militarizationTime",
        {"alliance":{"name":"alliance","type":"DBAlliance"},"start_time":{"name":"start_time","optional":true,"type":"long[Timestamp]","def":"7d"},"end_time":{"name":"end_time","optional":true,"flag":"e","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph militarization (soldier, tank, aircraft, ship) over time of an alliance`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {alliance?: string, start_time?: string, end_time?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {alliance?: string, start_time?: string, end_time?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {alliance?: string, start_time?: string, end_time?: string}> => {
        return {
            endpoint: MILITARIZATIONTIME.endpoint.name,
            default_values: default_values,
            cache_duration: MILITARIZATIONTIME.endpoint.cache_duration,
            args: MILITARIZATIONTIME.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const INPUT_OPTIONS: CommonEndpoint<ApiTypes.WebOptions, {type?: string}, {type?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebOptions>(
        "input_options",
        "input_options",
        {"type":{"name":"type","type":"String"}},
        (data: unknown) => data as ApiTypes.WebOptions,
        30,
        'LocalStorage',
        "WebOptions",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {type?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebOptions, {type?: string}> => {
        return {
            endpoint: INPUT_OPTIONS.endpoint.name,
            default_values: default_values,
            cache_duration: INPUT_OPTIONS.endpoint.cache_duration,
            args: INPUT_OPTIONS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TRADEPRICEBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, numDays?: string}, {resources?: string, numDays?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradepricebyday",
        "tradePriceByDay",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"numDays":{"name":"numDays","type":"int"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of average buy and sell trade price by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, numDays?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {resources?: string, numDays?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {resources?: string, numDays?: string}> => {
        return {
            endpoint: TRADEPRICEBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: TRADEPRICEBYDAY.endpoint.cache_duration,
            args: TRADEPRICEBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const LOGIN_MAIL: CommonEndpoint<ApiTypes.WebUrl, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebUrl>(
        "login_mail",
        "login_mail",
        {"nation":{"name":"nation","type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebUrl,
        2592000,
        'None',
        "WebUrl",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebUrl, {nation?: string}> => {
        return {
            endpoint: LOGIN_MAIL.endpoint.name,
            default_values: default_values,
            cache_duration: LOGIN_MAIL.endpoint.cache_duration,
            args: LOGIN_MAIL.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TRADEMARGINBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, start?: string, end?: string, percent?: string}, {resources?: string, start?: string, end?: string, percent?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "trademarginbyday",
        "tradeMarginByDay",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"},"percent":{"name":"percent","optional":true,"desc":"Use the margin percent instead of absolute difference","type":"boolean","def":"true"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of average trade buy and sell margin by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, start?: string, end?: string, percent?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {resources?: string, start?: string, end?: string, percent?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {resources?: string, start?: string, end?: string, percent?: string}> => {
        return {
            endpoint: TRADEMARGINBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: TRADEMARGINBYDAY.endpoint.cache_duration,
            args: TRADEMARGINBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MY_WARS: CommonEndpoint<ApiTypes.WebMyWars, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebMyWars>(
        "my_wars",
        "my_wars",
        {},
        (data: unknown) => data as ApiTypes.WebMyWars,
        2592000,
        'None',
        "WebMyWars",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebMyWars, Record<string, never>> => {
        return {
            endpoint: MY_WARS.endpoint.name,
            default_values: default_values,
            cache_duration: MY_WARS.endpoint.cache_duration,
            args: MY_WARS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MY_AUDITS: CommonEndpoint<ApiTypes.WebAudits, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAudits>(
        "my_audits",
        "my_audits",
        {},
        (data: unknown) => data as ApiTypes.WebAudits,
        30,
        'SessionStorage',
        "WebAudits",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebAudits, Record<string, never>> => {
        return {
            endpoint: MY_AUDITS.endpoint.name,
            default_values: default_values,
            cache_duration: MY_AUDITS.endpoint.cache_duration,
            args: MY_AUDITS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const RECORDS: CommonEndpoint<ApiTypes.WebTable, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "records",
        "records",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebTable,
        2592000,
        'None',
        "WebTable",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebTable, {nation?: string}> => {
        return {
            endpoint: RECORDS.endpoint.name,
            default_values: default_values,
            cache_duration: RECORDS.endpoint.cache_duration,
            args: RECORDS.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const LOGOUT: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "logout",
        "logout",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, Record<string, never>> => {
        return {
            endpoint: LOGOUT.endpoint.name,
            default_values: default_values,
            cache_duration: LOGOUT.endpoint.cache_duration,
            args: LOGOUT.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SCORETIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "scoretiergraph",
        "scoreTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of nation counts by score between two coalitions`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, snapshotDate?: string}> => {
        return {
            endpoint: SCORETIERGRAPH.endpoint.name,
            default_values: default_values,
            cache_duration: SCORETIERGRAPH.endpoint.cache_duration,
            args: SCORETIERGRAPH.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SPYTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "spytiergraph",
        "spyTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"total":{"name":"total","optional":true,"flag":"t","desc":"Graph the total spies instead of average per nation","type":"boolean"},"barGraph":{"name":"barGraph","optional":true,"flag":"b","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of spy counts by city count between two coalitions
Nations which are applicants, in vacation mode or inactive (2 days) are excluded`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, total?: string, barGraph?: string}> => {
        return {
            endpoint: SPYTIERGRAPH.endpoint.name,
            default_values: default_values,
            cache_duration: SPYTIERGRAPH.endpoint.cache_duration,
            args: SPYTIERGRAPH.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const STRENGTHTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "strengthtiergraph",
        "strengthTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"n","type":"boolean"},"col1MMR":{"name":"col1MMR","optional":true,"flag":"a","desc":"Use the score/strength of coalition 1 nations at specific military unit levels","type":"MMRDouble"},"col2MMR":{"name":"col2MMR","optional":true,"flag":"b","desc":"Use the score/strength of coalition 2 nations at specific military unit levels","type":"MMRDouble"},"col1Infra":{"name":"col1Infra","optional":true,"flag":"c","desc":"Use the score of coalition 1 nations at specific average infrastructure levels","type":"Double"},"col2Infra":{"name":"col2Infra","optional":true,"flag":"d","desc":"Use the score of coalition 2 nations at specific average infrastructure levels","type":"Double"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of nation military strength by score between two coalitions
1 tank = 1/32 aircraft for strength calculations
Effective score range is limited to 1.75x with a linear reduction of strength up to 40% to account for up-declares`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, includeApplicants?: string, col1MMR?: string, col2MMR?: string, col1Infra?: string, col2Infra?: string, snapshotDate?: string}> => {
        return {
            endpoint: STRENGTHTIERGRAPH.endpoint.name,
            default_values: default_values,
            cache_duration: STRENGTHTIERGRAPH.endpoint.cache_duration,
            args: STRENGTHTIERGRAPH.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const UNREAD_COUNT: CommonEndpoint<ApiTypes.WebInt, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebInt>(
        "unread_count",
        "unread_count",
        {},
        (data: unknown) => data as ApiTypes.WebInt,
        2592000,
        'None',
        "WebInt",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebInt, Record<string, never>> => {
        return {
            endpoint: UNREAD_COUNT.endpoint.name,
            default_values: default_values,
            cache_duration: UNREAD_COUNT.endpoint.cache_duration,
            args: UNREAD_COUNT.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SET_OAUTH_CODE: CommonEndpoint<ApiTypes.WebSuccess, {code?: string}, {code?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_oauth_code",
        "set_oauth_code",
        {"code":{"name":"code","type":"String"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {code?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {code?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, {code?: string}> => {
        return {
            endpoint: SET_OAUTH_CODE.endpoint.name,
            default_values: default_values,
            cache_duration: SET_OAUTH_CODE.endpoint.cache_duration,
            args: SET_OAUTH_CODE.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ANNOUNCEMENT_TITLES: CommonEndpoint<ApiTypes.WebAnnouncements, {read?: string}, {read?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcement_titles",
        "announcement_titles",
        {"read":{"name":"read","optional":true,"flag":"r","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        2592000,
        'None',
        "WebAnnouncements",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {read?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {read?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebAnnouncements, {read?: string}> => {
        return {
            endpoint: ANNOUNCEMENT_TITLES.endpoint.name,
            default_values: default_values,
            cache_duration: ANNOUNCEMENT_TITLES.endpoint.cache_duration,
            args: ANNOUNCEMENT_TITLES.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const WARATTACKSBYDAY: CommonEndpoint<ApiTypes.WebGraph, {nations?: string, cutoff?: string, allowedTypes?: string}, {nations?: string, cutoff?: string, allowedTypes?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "warattacksbyday",
        "warAttacksByDay",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e"},"cutoff":{"name":"cutoff","optional":true,"desc":"Period of time to graph","type":"Long[Timestamp]"},"allowedTypes":{"name":"allowedTypes","optional":true,"desc":"Restrict to a list of attack types","type":"Set\u003cAttackType\u003e"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Display a graph of the number of attacks by the specified nations per day over a time period`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, cutoff?: string, allowedTypes?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nations?: string, cutoff?: string, allowedTypes?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {nations?: string, cutoff?: string, allowedTypes?: string}> => {
        return {
            endpoint: WARATTACKSBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: WARATTACKSBYDAY.endpoint.cache_duration,
            args: WARATTACKSBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const METRIC_COMPARE_BY_TURN: CommonEndpoint<ApiTypes.WebGraph, {metric?: string, alliances?: string, start?: string, end?: string}, {metric?: string, alliances?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "metric_compare_by_turn",
        "metric_compare_by_turn",
        {"metric":{"name":"metric","type":"AllianceMetric"},"alliances":{"name":"alliances","type":"Set\u003cDBAlliance\u003e"},"start":{"name":"start","desc":"Date to start from","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Compare the metric over time between multiple alliances`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metric?: string, alliances?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metric?: string, alliances?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metric?: string, alliances?: string, start?: string, end?: string}> => {
        return {
            endpoint: METRIC_COMPARE_BY_TURN.endpoint.name,
            default_values: default_values,
            cache_duration: METRIC_COMPARE_BY_TURN.endpoint.cache_duration,
            args: METRIC_COMPARE_BY_TURN.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MULTI_BUSTER: CommonEndpoint<ApiTypes.MultiResult, {nation?: string, forceUpdate?: string}, {nation?: string, forceUpdate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.MultiResult>(
        "multi_buster",
        "multi_buster",
        {"nation":{"name":"nation","type":"DBNation"},"forceUpdate":{"name":"forceUpdate","optional":true,"type":"Boolean"}},
        (data: unknown) => data as ApiTypes.MultiResult,
        2592000,
        'None',
        "MultiResult",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, forceUpdate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string, forceUpdate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.MultiResult, {nation?: string, forceUpdate?: string}> => {
        return {
            endpoint: MULTI_BUSTER.endpoint.name,
            default_values: default_values,
            cache_duration: MULTI_BUSTER.endpoint.cache_duration,
            args: MULTI_BUSTER.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const VIEW_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebAnnouncement, {ann_id?: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncement>(
        "view_announcement",
        "view_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebAnnouncement,
        2592000,
        'SessionStorage',
        "WebAnnouncement",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {ann_id?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebAnnouncement, {ann_id?: string}> => {
        return {
            endpoint: VIEW_ANNOUNCEMENT.endpoint.name,
            default_values: default_values,
            cache_duration: VIEW_ANNOUNCEMENT.endpoint.cache_duration,
            args: VIEW_ANNOUNCEMENT.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const SET_GUILD: CommonEndpoint<ApiTypes.SetGuild, {guild?: string}, {guild?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.SetGuild>(
        "set_guild",
        "set_guild",
        {"guild":{"name":"guild","type":"Guild"}},
        (data: unknown) => data as ApiTypes.SetGuild,
        2592000,
        'None',
        "SetGuild",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {guild?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {guild?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.SetGuild, {guild?: string}> => {
        return {
            endpoint: SET_GUILD.endpoint.name,
            default_values: default_values,
            cache_duration: SET_GUILD.endpoint.cache_duration,
            args: SET_GUILD.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const METRICBYGROUP: CommonEndpoint<ApiTypes.WebGraph, {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}, {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "metricbygroup",
        "metricByGroup",
        {"metrics":{"name":"metrics","type":"Set\u003cTypedFunction\u003cDBNation,Double\u003e\u003e"},"nations":{"name":"nations","type":"Set\u003cDBNation\u003e"},"groupBy":{"name":"groupBy","optional":true,"type":"TypedFunction\u003cDBNation,Double\u003e","def":"getCities"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"total":{"name":"total","optional":true,"flag":"t","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Graph a set of nation metrics for the specified nations over a period of time based on daily nation and city snapshots`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {metrics?: string, nations?: string, groupBy?: string, includeInactives?: string, includeApplicants?: string, total?: string, snapshotDate?: string}> => {
        return {
            endpoint: METRICBYGROUP.endpoint.name,
            default_values: default_values,
            cache_duration: METRICBYGROUP.endpoint.cache_duration,
            args: METRICBYGROUP.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const MULTI_V2: CommonEndpoint<ApiTypes.AdvMultiReport, {nation?: string, forceUpdate?: string}, {nation?: string, forceUpdate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.AdvMultiReport>(
        "multi_v2",
        "multi_v2",
        {"nation":{"name":"nation","type":"DBNation"},"forceUpdate":{"name":"forceUpdate","optional":true,"type":"Boolean"}},
        (data: unknown) => data as ApiTypes.AdvMultiReport,
        2592000,
        'None',
        "AdvMultiReport",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, forceUpdate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string, forceUpdate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.AdvMultiReport, {nation?: string, forceUpdate?: string}> => {
        return {
            endpoint: MULTI_V2.endpoint.name,
            default_values: default_values,
            cache_duration: MULTI_V2.endpoint.cache_duration,
            args: MULTI_V2.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const CITYTIERGRAPH: CommonEndpoint<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}, {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "citytiergraph",
        "cityTierGraph",
        {"coalition1":{"name":"coalition1","type":"Set\u003cDBNation\u003e"},"coalition2":{"name":"coalition2","type":"Set\u003cDBNation\u003e"},"includeInactives":{"name":"includeInactives","optional":true,"flag":"i","type":"boolean"},"barGraph":{"name":"barGraph","optional":true,"flag":"b","type":"boolean"},"includeApplicants":{"name":"includeApplicants","optional":true,"flag":"a","type":"boolean"},"snapshotDate":{"name":"snapshotDate","optional":true,"flag":"s","type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a bar char comparing the nation at each city count (tiering) between two coalitions`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {coalition1?: string, coalition2?: string, includeInactives?: string, barGraph?: string, includeApplicants?: string, snapshotDate?: string}> => {
        return {
            endpoint: CITYTIERGRAPH.endpoint.name,
            default_values: default_values,
            cache_duration: CITYTIERGRAPH.endpoint.cache_duration,
            args: CITYTIERGRAPH.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const UNPROTECTED: CommonEndpoint<ApiTypes.WebTargets, {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "unprotected",
        "unprotected",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"},"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*"},"includeAllies":{"name":"includeAllies","optional":true,"flag":"a","type":"boolean"},"ignoreODP":{"name":"ignoreODP","optional":true,"flag":"o","type":"boolean"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"maxRelativeTargetStrength":{"name":"maxRelativeTargetStrength","optional":true,"flag":"s","desc":"The maximum allowed military strength of the target nation relative to you","type":"Double","def":"1.2"},"maxRelativeCounterStrength":{"name":"maxRelativeCounterStrength","optional":true,"flag":"c","desc":"The maximum allowed military strength of counters relative to you","type":"Double","def":"1.2"},"num_results":{"name":"num_results","optional":true,"desc":"Only list targets within range of ALL attackers","type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        2592000,
        'None',
        "WebTargets",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebTargets, {nation?: string, nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}> => {
        return {
            endpoint: UNPROTECTED.endpoint.name,
            default_values: default_values,
            cache_duration: UNPROTECTED.endpoint.cache_duration,
            args: UNPROTECTED.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TRADEPRICEBYDAYJSON: CommonEndpoint<ApiTypes.WebGraph, {resources?: string, days?: string}, {resources?: string, days?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradepricebydayjson",
        "tradePriceByDayJson",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"days":{"name":"days","type":"int","min":1.0}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        ``,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, days?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {resources?: string, days?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {resources?: string, days?: string}> => {
        return {
            endpoint: TRADEPRICEBYDAYJSON.endpoint.name,
            default_values: default_values,
            cache_duration: TRADEPRICEBYDAYJSON.endpoint.cache_duration,
            args: TRADEPRICEBYDAYJSON.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const WITHDRAW: CommonEndpoint<ApiTypes.WebTransferResult, {receiver?: string, amount?: string, note?: string}, {receiver?: string, amount?: string, note?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTransferResult>(
        "withdraw",
        "withdraw",
        {"receiver":{"name":"receiver","type":"NationOrAlliance"},"amount":{"name":"amount","type":"Map\u003cResourceType,Double\u003e"},"note":{"name":"note","type":"DepositType"}},
        (data: unknown) => data as ApiTypes.WebTransferResult,
        2592000,
        'None',
        "WebTransferResult",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {receiver?: string, amount?: string, note?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {receiver?: string, amount?: string, note?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebTransferResult, {receiver?: string, amount?: string, note?: string}> => {
        return {
            endpoint: WITHDRAW.endpoint.name,
            default_values: default_values,
            cache_duration: WITHDRAW.endpoint.cache_duration,
            args: WITHDRAW.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const TRADETOTALBYDAY: CommonEndpoint<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}, {resource?: string, start?: string, end?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebGraph>(
        "tradetotalbyday",
        "tradeTotalByDay",
        {"resource":{"name":"resource","type":"ResourceType"},"start":{"name":"start","type":"long[Timestamp]"},"end":{"name":"end","optional":true,"type":"Long[Timestamp]"}},
        (data: unknown) => data as ApiTypes.WebGraph,
        2592000,
        'None',
        "WebGraph",
        `Generate a graph of average trade buy and sell total by day`,
        false
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resource?: string, start?: string, end?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {resource?: string, start?: string, end?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebGraph, {resource?: string, start?: string, end?: string}> => {
        return {
            endpoint: TRADETOTALBYDAY.endpoint.name,
            default_values: default_values,
            cache_duration: TRADETOTALBYDAY.endpoint.cache_duration,
            args: TRADETOTALBYDAY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const QUERY: CommonEndpoint<ApiTypes.WebBulkQuery, {queries?: string}, {queries?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBulkQuery>(
        "query",
        "query",
        {"queries":{"name":"queries","type":"List\u003cEntry\u003cString,Map\u003cString,Object\u003e\u003e\u003e"}},
        (data: unknown) => data as ApiTypes.WebBulkQuery,
        2592000,
        'None',
        "WebBulkQuery",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {queries?: string};
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: {queries?: string}) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebBulkQuery, {queries?: string}> => {
        return {
            endpoint: QUERY.endpoint.name,
            default_values: default_values,
            cache_duration: QUERY.endpoint.cache_duration,
            args: QUERY.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const UNSET_GUILD: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "unset_guild",
        "unset_guild",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        2592000,
        'None',
        "WebSuccess",
        ``,
        true
    ),
    formProps: ({default_values, showArguments, label, message, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>;
        showArguments?: string[];
        label?: ReactNode;
        message?: ReactNode;
        handle_submit?: (args: Record<string, never>) => boolean;
        handle_loading?: () => void;
        handle_error?: (error: Error) => void;
        classes?: string;
    }): ApiFormInputsProps<ApiTypes.WebSuccess, Record<string, never>> => {
        return {
            endpoint: UNSET_GUILD.endpoint.name,
            default_values: default_values,
            cache_duration: UNSET_GUILD.endpoint.cache_duration,
            args: UNSET_GUILD.endpoint.args,
            showArguments: showArguments,
            label: label,
            message: message,
            handle_submit: handle_submit,
            handle_loading: handle_loading,
            handle_error: handle_error,
            classes: classes
        }
    }
};

export const ENDPOINTS = [WARSCOSTRANKINGBYDAY, GLOBALSTATS, TABLE, COMPARESTATS, ALLIANCEMETRICAB, ALLIANCEMETRICBYTURN, NTHBEIGELOOTBYSCORERANGE, ALLIANCESDATABYDAY, MARK_ALL_READ, WARCOSTSBYDAY, ALLIANCESTATS, SET_TOKEN, SESSION, BALANCE, ORBISSTATBYDAY, UNREAD_ANNOUNCEMENT, REGISTER, COMPARETIERSTATS, RADIATIONBYTURN, GLOBALTIERSTATS, BANK_ACCESS, COMMAND, TRADEVOLUMEBYDAY, ANNOUNCEMENTS, UNREGISTER, RAID, READ_ANNOUNCEMENT, TAX_EXPENSE, COMPARESTOCKPILEVALUEBYDAY, MILITARIZATIONTIME, INPUT_OPTIONS, TRADEPRICEBYDAY, LOGIN_MAIL, TRADEMARGINBYDAY, MY_WARS, MY_AUDITS, RECORDS, LOGOUT, SCORETIERGRAPH, SPYTIERGRAPH, STRENGTHTIERGRAPH, UNREAD_COUNT, SET_OAUTH_CODE, ANNOUNCEMENT_TITLES, WARATTACKSBYDAY, METRIC_COMPARE_BY_TURN, MULTI_BUSTER, VIEW_ANNOUNCEMENT, SET_GUILD, METRICBYGROUP, MULTI_V2, CITYTIERGRAPH, UNPROTECTED, TRADEPRICEBYDAYJSON, WITHDRAW, TRADETOTALBYDAY, QUERY, UNSET_GUILD];
