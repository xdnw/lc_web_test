import {CacheType} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode} from "react";
import type * as ApiTypes from "@/components/api/apitypes.d.ts";
import {useForm, useDisplay, ApiEndpoint, combine, CommonEndpoint} from "@/components/api/endpoint.tsx";
export const LOGIN_MAIL: CommonEndpoint<ApiTypes.WebUrl, {nation: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebUrl>(
        "login_mail",
        "login_mail",
        {"nation":{"name":"nation","type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebUrl,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation: string}, render: (data: ApiTypes.WebUrl) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(LOGIN_MAIL.endpoint.name, combine(LOGIN_MAIL.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebUrl) => void,
        handle_submit?: (args: {nation: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGIN_MAIL.endpoint.url, LOGIN_MAIL.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MY_WARS: CommonEndpoint<ApiTypes.WebMyWars, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebMyWars>(
        "my_wars",
        "my_wars",
        {},
        (data: unknown) => data as ApiTypes.WebMyWars,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebMyWars) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MY_WARS.endpoint.name, MY_WARS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebMyWars) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MY_WARS.endpoint.url, MY_WARS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MY_AUDITS: CommonEndpoint<ApiTypes.WebAudits, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAudits>(
        "my_audits",
        "my_audits",
        {},
        (data: unknown) => data as ApiTypes.WebAudits,
        {type: CacheType.SessionStorage, duration: 30}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebAudits) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MY_AUDITS.endpoint.name, MY_AUDITS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAudits) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MY_AUDITS.endpoint.url, MY_AUDITS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TABLE: CommonEndpoint<ApiTypes.WebTable, {type: string, selection_str: string, columns: string}, {type?: string, selection_str?: string, columns?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "table",
        "table",
        {"type":{"name":"type","type":"Class[PlaceholderType]"},"selection_str":{"name":"selection_str","type":"String"},"columns":{"name":"columns","type":"List\u003cString\u003e[TextArea]"}},
        (data: unknown) => data as ApiTypes.WebTable,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {type: string, selection_str: string, columns: string}, render: (data: ApiTypes.WebTable) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TABLE.endpoint.name, combine(TABLE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string, selection_str?: string, columns?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTable) => void,
        handle_submit?: (args: {type: string, selection_str: string, columns: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TABLE.endpoint.url, TABLE.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const RECORDS: CommonEndpoint<ApiTypes.WebTable, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTable>(
        "records",
        "records",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebTable,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string}, render: (data: ApiTypes.WebTable) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(RECORDS.endpoint.name, combine(RECORDS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTable) => void,
        handle_submit?: (args: {nation?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RECORDS.endpoint.url, RECORDS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const LOGOUT: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "logout",
        "logout",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(LOGOUT.endpoint.name, LOGOUT.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGOUT.endpoint.url, LOGOUT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREAD_COUNT: CommonEndpoint<ApiTypes.WebInt, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebInt>(
        "unread_count",
        "unread_count",
        {},
        (data: unknown) => data as ApiTypes.WebInt,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebInt) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREAD_COUNT.endpoint.name, UNREAD_COUNT.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebInt) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_COUNT.endpoint.url, UNREAD_COUNT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const MARK_ALL_READ: CommonEndpoint<ApiTypes.WebSuccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "mark_all_read",
        "mark_all_read",
        {},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(MARK_ALL_READ.endpoint.name, MARK_ALL_READ.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MARK_ALL_READ.endpoint.url, MARK_ALL_READ.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SESSION: CommonEndpoint<ApiTypes.WebSession, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSession>(
        "session",
        "session",
        {},
        (data: unknown) => data as ApiTypes.WebSession,
        {type: CacheType.LocalStorage, duration: 2592000}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebSession) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SESSION.endpoint.name, SESSION.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSession) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SESSION.endpoint.url, SESSION.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_TOKEN: CommonEndpoint<ApiTypes.WebSuccess, {token: string}, {token?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_token",
        "set_token",
        {"token":{"name":"token","type":"UUID"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {token: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_TOKEN.endpoint.name, combine(SET_TOKEN.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {token?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {token: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_TOKEN.endpoint.url, SET_TOKEN.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_OAUTH_CODE: CommonEndpoint<ApiTypes.WebSuccess, {code: string}, {code?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "set_oauth_code",
        "set_oauth_code",
        {"code":{"name":"code","type":"String"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {code: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_OAUTH_CODE.endpoint.name, combine(SET_OAUTH_CODE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {code?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {code: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_OAUTH_CODE.endpoint.url, SET_OAUTH_CODE.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const BALANCE: CommonEndpoint<ApiTypes.WebBalance, {nation?: string}, {nation?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBalance>(
        "balance",
        "balance",
        {"nation":{"name":"nation","optional":true,"type":"DBNation"}},
        (data: unknown) => data as ApiTypes.WebBalance,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nation?: string}, render: (data: ApiTypes.WebBalance) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(BALANCE.endpoint.name, combine(BALANCE.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nation?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBalance) => void,
        handle_submit?: (args: {nation?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BALANCE.endpoint.url, BALANCE.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ANNOUNCEMENT_TITLES: CommonEndpoint<ApiTypes.WebAnnouncements, {read?: string}, {read?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcement_titles",
        "announcement_titles",
        {"read":{"name":"read","optional":true,"flag":"r","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {read?: string}, render: (data: ApiTypes.WebAnnouncements) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ANNOUNCEMENT_TITLES.endpoint.name, combine(ANNOUNCEMENT_TITLES.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {read?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncements) => void,
        handle_submit?: (args: {read?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENT_TITLES.endpoint.url, ANNOUNCEMENT_TITLES.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREAD_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "unread_announcement",
        "unread_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREAD_ANNOUNCEMENT.endpoint.name, combine(UNREAD_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {ann_id: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_ANNOUNCEMENT.endpoint.url, UNREAD_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const REGISTER: CommonEndpoint<ApiTypes.WebSuccess, {confirm: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "register",
        "register",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {confirm: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(REGISTER.endpoint.name, combine(REGISTER.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {confirm: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(REGISTER.endpoint.url, REGISTER.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const VIEW_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebAnnouncement, {ann_id: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncement>(
        "view_announcement",
        "view_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebAnnouncement,
        {type: CacheType.SessionStorage, duration: 2592000}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id: string}, render: (data: ApiTypes.WebAnnouncement) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(VIEW_ANNOUNCEMENT.endpoint.name, combine(VIEW_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncement) => void,
        handle_submit?: (args: {ann_id: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(VIEW_ANNOUNCEMENT.endpoint.url, VIEW_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const SET_GUILD: CommonEndpoint<ApiTypes.SetGuild, {guild: string}, {guild?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.SetGuild>(
        "set_guild",
        "set_guild",
        {"guild":{"name":"guild","type":"Guild"}},
        (data: unknown) => data as ApiTypes.SetGuild,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {guild: string}, render: (data: ApiTypes.SetGuild) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(SET_GUILD.endpoint.name, combine(SET_GUILD.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {guild?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.SetGuild) => void,
        handle_submit?: (args: {guild: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_GUILD.endpoint.url, SET_GUILD.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNPROTECTED: CommonEndpoint<ApiTypes.WebTargets, {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "unprotected",
        "unprotected",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*"},"includeAllies":{"name":"includeAllies","optional":true,"flag":"a","type":"boolean"},"ignoreODP":{"name":"ignoreODP","optional":true,"flag":"o","type":"boolean"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"maxRelativeTargetStrength":{"name":"maxRelativeTargetStrength","optional":true,"flag":"s","desc":"The maximum allowed military strength of the target nation relative to you","type":"Double","def":"1.2"},"maxRelativeCounterStrength":{"name":"maxRelativeCounterStrength","optional":true,"flag":"c","desc":"The maximum allowed military strength of counters relative to you","type":"Double","def":"1.2"},"num_results":{"name":"num_results","optional":true,"desc":"Only list targets within range of ALL attackers","type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, render: (data: ApiTypes.WebTargets) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNPROTECTED.endpoint.name, combine(UNPROTECTED.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTargets) => void,
        handle_submit?: (args: {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNPROTECTED.endpoint.url, UNPROTECTED.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const BANK_ACCESS: CommonEndpoint<ApiTypes.WebBankAccess, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBankAccess>(
        "bank_access",
        "bank_access",
        {},
        (data: unknown) => data as ApiTypes.WebBankAccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebBankAccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(BANK_ACCESS.endpoint.name, BANK_ACCESS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBankAccess) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BANK_ACCESS.endpoint.url, BANK_ACCESS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TRADEPRICEBYDAYJSON: CommonEndpoint<ApiTypes.TradePriceByDayJson, {resources: string, days: string}, {resources?: string, days?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.TradePriceByDayJson>(
        "tradepricebydayjson",
        "tradePriceByDayJson",
        {"resources":{"name":"resources","type":"Set\u003cResourceType\u003e"},"days":{"name":"days","type":"int","min":1.0}},
        (data: unknown) => data as ApiTypes.TradePriceByDayJson,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {resources: string, days: string}, render: (data: ApiTypes.TradePriceByDayJson) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TRADEPRICEBYDAYJSON.endpoint.name, combine(TRADEPRICEBYDAYJSON.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {resources?: string, days?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.TradePriceByDayJson) => void,
        handle_submit?: (args: {resources: string, days: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEPRICEBYDAYJSON.endpoint.url, TRADEPRICEBYDAYJSON.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const ANNOUNCEMENTS: CommonEndpoint<ApiTypes.WebAnnouncements, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebAnnouncements>(
        "announcements",
        "announcements",
        {},
        (data: unknown) => data as ApiTypes.WebAnnouncements,
        {type: CacheType.SessionStorage, duration: 30}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebAnnouncements) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(ANNOUNCEMENTS.endpoint.name, ANNOUNCEMENTS.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebAnnouncements) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENTS.endpoint.url, ANNOUNCEMENTS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const UNREGISTER: CommonEndpoint<ApiTypes.WebValue, {confirm: string}, {confirm?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebValue>(
        "unregister",
        "unregister",
        {"confirm":{"name":"confirm","type":"boolean"}},
        (data: unknown) => data as ApiTypes.WebValue,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {confirm: string}, render: (data: ApiTypes.WebValue) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREGISTER.endpoint.name, combine(UNREGISTER.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {confirm?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebValue) => void,
        handle_submit?: (args: {confirm: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREGISTER.endpoint.url, UNREGISTER.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const RAID: CommonEndpoint<ApiTypes.WebTargets, {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTargets>(
        "raid",
        "raid",
        {"nations":{"name":"nations","optional":true,"type":"Set\u003cDBNation\u003e","def":"*,#position\u003c\u003d1"},"weak_ground":{"name":"weak_ground","optional":true,"type":"boolean","def":"false"},"vm_turns":{"name":"vm_turns","optional":true,"type":"int","def":"0"},"beige_turns":{"name":"beige_turns","optional":true,"type":"int","def":"0"},"ignore_dnr":{"name":"ignore_dnr","optional":true,"type":"boolean","def":"false"},"time_inactive":{"name":"time_inactive","optional":true,"type":"long[Timediff]","def":"7d"},"min_loot":{"name":"min_loot","optional":true,"type":"double","def":"-1"},"num_results":{"name":"num_results","optional":true,"type":"int","def":"8"}},
        (data: unknown) => data as ApiTypes.WebTargets,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, render: (data: ApiTypes.WebTargets) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(RAID.endpoint.name, combine(RAID.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTargets) => void,
        handle_submit?: (args: {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RAID.endpoint.url, RAID.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const WITHDRAW: CommonEndpoint<ApiTypes.WebTransferResult, {receiver: string, amount: string, note: string}, {receiver?: string, amount?: string, note?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebTransferResult>(
        "withdraw",
        "withdraw",
        {"receiver":{"name":"receiver","type":"NationOrAlliance"},"amount":{"name":"amount","type":"Map\u003cResourceType, Double\u003e"},"note":{"name":"note","type":"DepositType"}},
        (data: unknown) => data as ApiTypes.WebTransferResult,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {receiver: string, amount: string, note: string}, render: (data: ApiTypes.WebTransferResult) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(WITHDRAW.endpoint.name, combine(WITHDRAW.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {receiver?: string, amount?: string, note?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebTransferResult) => void,
        handle_submit?: (args: {receiver: string, amount: string, note: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WITHDRAW.endpoint.url, WITHDRAW.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const READ_ANNOUNCEMENT: CommonEndpoint<ApiTypes.WebSuccess, {ann_id: string}, {ann_id?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccess>(
        "read_announcement",
        "read_announcement",
        {"ann_id":{"name":"ann_id","type":"int"}},
        (data: unknown) => data as ApiTypes.WebSuccess,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {ann_id: string}, render: (data: ApiTypes.WebSuccess) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(READ_ANNOUNCEMENT.endpoint.name, combine(READ_ANNOUNCEMENT.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {ann_id?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccess) => void,
        handle_submit?: (args: {ann_id: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(READ_ANNOUNCEMENT.endpoint.url, READ_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const TEST: CommonEndpoint<ApiTypes.WebValue, Record<string, never>, Record<string, never>> = {
    endpoint: new ApiEndpoint<ApiTypes.WebValue>(
        "test",
        "test",
        {},
        (data: unknown) => data as ApiTypes.WebValue,
        {type: CacheType.LocalStorage, duration: 2592000}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: Record<string, never>, render: (data: ApiTypes.WebValue) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(TEST.endpoint.name, TEST.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebValue) => void,
        handle_submit?: (args: Record<string, never>) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TEST.endpoint.url, TEST.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const QUERY: CommonEndpoint<ApiTypes.WebBulkQuery, {queries: string}, {queries?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebBulkQuery>(
        "query",
        "query",
        {"queries":{"name":"queries","type":"List\u003cEntry\u003cString, Map\u003cString, Object\u003e\u003e\u003e"}},
        (data: unknown) => data as ApiTypes.WebBulkQuery,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {queries: string}, render: (data: ApiTypes.WebBulkQuery) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(QUERY.endpoint.name, combine(QUERY.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {queries?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebBulkQuery) => void,
        handle_submit?: (args: {queries: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(QUERY.endpoint.url, QUERY.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

export const INPUT_OPTIONS: CommonEndpoint<ApiTypes.WebOptions, {type: string}, {type?: string}> = {
    endpoint: new ApiEndpoint<ApiTypes.WebOptions>(
        "input_options",
        "input_options",
        {"type":{"name":"type","type":"String"}},
        (data: unknown) => data as ApiTypes.WebOptions,
        {type: CacheType.LocalStorage, duration: 30}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
    {args: {type: string}, render: (data: ApiTypes.WebOptions) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(INPUT_OPTIONS.endpoint.name, combine(INPUT_OPTIONS.endpoint.cache, args), args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: {type?: string},
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebOptions) => void,
        handle_submit?: (args: {type: string}) => boolean,
        handle_loading?: () => void,
        handle_error?: (error: string) => void,
        classes?: string}): React.ReactNode => {
        return useForm(INPUT_OPTIONS.endpoint.url, INPUT_OPTIONS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};

