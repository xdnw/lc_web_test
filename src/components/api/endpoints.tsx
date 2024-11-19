import {Argument, IArgument} from "@/utils/Command.ts";
import {CacheType, useData, useRegisterQuery} from "@/components/cmd/DataContext.tsx";
import React, {ReactNode} from "react";
import LoadingWrapper from "@/components/api/loadingwrapper.tsx";
import ApiForm from "@/components/api/apiform.tsx";
import ArgInput from "@/components/cmd/ArgInput.tsx";
import * as ApiTypes from "@/components/api/apitypes.tsx";

interface PlaceholderData {
    type: string;
    fields: {
        [key: string]: boolean | { [key: string]: string };
    };
}

export class AbstractBuilder {
    protected data: PlaceholderData = {
        type: "",
        fields: {}
    };

    set(field: string, value: boolean | { [key: string]: string }): this {
        this.data.fields[field] = value;
        return this;
    }

    build(): PlaceholderData {
        return this.data;
    }
}

export class ApiEndpoint<T> {
    name: string;
    url: string;
    args: { [name: string]: Argument };
    cast: (data: unknown) => T;
    cache: { cache_type: CacheType, duration?: number, cookie_id: string };

    constructor(name: string, url: string, args: { [name: string]: IArgument }, cast: (data: unknown) => T, cache: { type?: CacheType, duration?: number }) {
        this.name = name;
        this.url = url;
        this.args = {};
        for (const [key, value] of Object.entries(args)) {
            this.args[key] = new Argument(key, value);
        }
        this.cast = cast;
        this.cache = { cache_type: cache.type ?? CacheType.None, duration: cache.duration ?? 0, cookie_id: `lc_${name}` };
    }
}

export function useDisplay<T>(
    name: string,
    cache: { cache_type: CacheType, duration?: number, cookie_id: string },
                        args: {[key: string]: string}, render: (data: T) => React.ReactNode,
                        renderLoading?: () => React.ReactNode,
                        renderError?: (error: string) => React.ReactNode): React.ReactNode {
    const [queryId] = useRegisterQuery(name, args, cache);
    const { data, loading, error } = useData<T>();
    return <LoadingWrapper<T>
        index={queryId}
        loading={loading}
        error={error}
        data={data}
        render={render}
        renderLoading={renderLoading}
        renderError={renderError}
    />
}

export function useForm<T, A extends { [key: string]: string }>(
    url: string,
    args: { [name: string]: Argument },
    message?: React.ReactNode,
    default_values?: { [key: string]: string },
    label?: ReactNode,
    handle_response?: (data: T, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_submit?: (args: A, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
    handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
    classes?: string): React.ReactNode {
    const required: string[] = [];
    for (const [key, value] of Object.entries(args)) {
        if (!value.arg.optional && (!default_values || !Object.prototype.hasOwnProperty.call(default_values, key))) {
            required.push(key);
        }
    }
    return <ApiForm
        requireLogin={false}
        required={required}
        message={message}
        endpoint={url}
        label={label}
        default_values={default_values}
        form_inputs={(props) => <>
            {Object.values(args).filter(arg => !default_values || !Object.prototype.hasOwnProperty.call(default_values, arg.name)).map((arg, index) => {
                return <ArgInput key={index} argName={arg.name} breakdown={arg.getTypeBreakdown()} min={arg.arg.min} max={arg.arg.max} initialValue={""} setOutputValue={props.setOutputValue} />
            })}
        </>}
        handle_response={handle_response}
        handle_loading={handle_loading}
        handle_error={handle_error}
        handle_submit={handle_submit}
        classes={classes}
    />
}

function combine(cache: { cache_type: CacheType, duration?: number, cookie_id: string }, args: {[key: string]: string}) {
    const argsString = JSON.stringify(args);
    const encodedArgs = encodeURIComponent(argsString);
    return { cache_type: cache.cache_type, duration: cache.duration, cookie_id: `${cache.cookie_id}_${encodedArgs}` };
}

export const LOGIN_MAIL = {
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
        handle_response?: (data: ApiTypes.WebUrl, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {nation: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGIN_MAIL.endpoint.url, LOGIN_MAIL.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const MY_AUDITS = {
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
        handle_response?: (data: ApiTypes.WebAudits, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MY_AUDITS.endpoint.url, MY_AUDITS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const RECORDS = {
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
        handle_response?: (data: ApiTypes.WebTable, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {nation?: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RECORDS.endpoint.url, RECORDS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const LOGOUT = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(LOGOUT.endpoint.url, LOGOUT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const UNREAD_COUNT = {
    endpoint: new ApiEndpoint<ApiTypes.WebSuccessInt>(
        "unread_count",
        "unread_count",
        {},
        (data: unknown) => data as ApiTypes.WebSuccessInt,
        {}
    ),
    useDisplay: ({args, render, renderLoading, renderError}:
                 {args: Record<string, never>, render: (data: ApiTypes.WebSuccessInt) => React.ReactNode, renderLoading?: () => React.ReactNode, renderError?: (error: string) => React.ReactNode}): React.ReactNode => {
        return useDisplay(UNREAD_COUNT.endpoint.name, UNREAD_COUNT.endpoint.cache, args, render, renderLoading, renderError);
    },
    useForm: ({default_values, label, message, handle_response, handle_submit, handle_loading, handle_error, classes}: {
        default_values?: Record<string, never>,
        label?: ReactNode,
        message?: ReactNode,
        handle_response?: (data: ApiTypes.WebSuccessInt, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_COUNT.endpoint.url, UNREAD_COUNT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const MARK_ALL_READ = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(MARK_ALL_READ.endpoint.url, MARK_ALL_READ.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const SESSION = {
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
        handle_response?: (data: ApiTypes.WebSession, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SESSION.endpoint.url, SESSION.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const SET_TOKEN = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {token: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_TOKEN.endpoint.url, SET_TOKEN.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const SET_OAUTH_CODE = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {code: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_OAUTH_CODE.endpoint.url, SET_OAUTH_CODE.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const BALANCE = {
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
        handle_response?: (data: ApiTypes.WebBalance, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {nation?: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BALANCE.endpoint.url, BALANCE.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const ANNOUNCEMENT_TITLES = {
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
        handle_response?: (data: ApiTypes.WebAnnouncements, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {read?: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENT_TITLES.endpoint.url, ANNOUNCEMENT_TITLES.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const UNREAD_ANNOUNCEMENT = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {ann_id: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREAD_ANNOUNCEMENT.endpoint.url, UNREAD_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const REGISTER = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {confirm: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(REGISTER.endpoint.url, REGISTER.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const VIEW_ANNOUNCEMENT = {
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
        handle_response?: (data: ApiTypes.WebAnnouncement, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {ann_id: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(VIEW_ANNOUNCEMENT.endpoint.url, VIEW_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const SET_GUILD = {
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
        handle_response?: (data: ApiTypes.SetGuild, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {guild: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(SET_GUILD.endpoint.url, SET_GUILD.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const UNPROTECTED = {
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
        handle_response?: (data: ApiTypes.WebTargets, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {nations?: string, includeAllies?: string, ignoreODP?: string, ignore_dnr?: string, maxRelativeTargetStrength?: string, maxRelativeCounterStrength?: string, num_results?: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNPROTECTED.endpoint.url, UNPROTECTED.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const BANK_ACCESS = {
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
        handle_response?: (data: ApiTypes.WebBankAccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(BANK_ACCESS.endpoint.url, BANK_ACCESS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const TRADEPRICEBYDAYJSON = {
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
        handle_response?: (data: ApiTypes.TradePriceByDayJson, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {resources: string, days: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(TRADEPRICEBYDAYJSON.endpoint.url, TRADEPRICEBYDAYJSON.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const ANNOUNCEMENTS = {
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
        handle_response?: (data: ApiTypes.WebAnnouncements, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: Record<string, never>, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(ANNOUNCEMENTS.endpoint.url, ANNOUNCEMENTS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const UNREGISTER = {
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
        handle_response?: (data: ApiTypes.WebValue, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {confirm: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(UNREGISTER.endpoint.url, UNREGISTER.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const RAID = {
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
        handle_response?: (data: ApiTypes.WebTargets, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {nations?: string, weak_ground?: string, vm_turns?: string, beige_turns?: string, ignore_dnr?: string, time_inactive?: string, min_loot?: string, num_results?: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(RAID.endpoint.url, RAID.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const WITHDRAW = {
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
        handle_response?: (data: ApiTypes.WebTransferResult, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {receiver: string, amount: string, note: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(WITHDRAW.endpoint.url, WITHDRAW.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const READ_ANNOUNCEMENT = {
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
        handle_response?: (data: ApiTypes.WebSuccess, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {ann_id: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(READ_ANNOUNCEMENT.endpoint.url, READ_ANNOUNCEMENT.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const QUERY = {
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
        handle_response?: (data: ApiTypes.WebBulkQuery, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {queries: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(QUERY.endpoint.url, QUERY.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};
export const INPUT_OPTIONS = {
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
        handle_response?: (data: ApiTypes.WebOptions, setMessage: (message: React.ReactNode) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_submit?: (args: {type: string}, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => boolean,
        handle_loading?: (setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        handle_error?: (error: string, setMessage: (message: string) => void, setShowDialog: (showDialog: boolean) => void, setTitle: (title: string) => void) => void,
        classes?: string}): React.ReactNode => {
        return useForm(INPUT_OPTIONS.endpoint.url, INPUT_OPTIONS.endpoint.args, message, default_values, label, handle_response, handle_submit, handle_loading, handle_error, classes);
    }
};