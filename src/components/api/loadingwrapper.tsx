import React from 'react';
import Cookies from 'js-cookie'

interface LoadingWrapperProps<T> {
    index: number;
    loading: boolean;
    data: T[] | null;
    error: string | null;
    render: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}

export default function LoadingWrapper<T>({ index, loading, error, data, render, renderLoading, renderError, cache }: LoadingWrapperProps<T>) {
    if (loading) {
        if (renderLoading) {
            return <>{renderLoading()}</>;
        }
        return <div>Loading...</div>;
    }
    if (error) {
        if (renderError) {
            return <>{renderError(error)}</>;
        }
        return <div>An error occurred: {error}</div>;
    }
    const elem = data ? data[index] : null;
    if (!elem) {
        if (renderError) {
            return <>{renderError(error ?? "Null")}</>;
        }
        return <div>An error occurred: {error ?? "Null"}</div>;
    }
    if (elem?.success === false) {
        if (renderError) {
            return <>{renderError(elem?.message ?? "Null")}</>;
        }
        return <div>An error occurred: {elem?.message ?? "Null"}</div>;
    }

    return <>{render(elem)}</>;
}