import React from 'react';

interface LoadingWrapperProps<T> {
    loading: boolean;
    data: T | null;
    error: string | null;
    render: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}

export default function LoadingWrapper<T>({ loading, error, data, render, renderLoading, renderError }: LoadingWrapperProps<T>) {
    if (loading) {
        if (renderLoading) {
            return <>{renderLoading()}</>;
        }
        return <div>Loading...</div>;
    }
    if (!data ||
        (Array.isArray(data) && data.length === 0) || 
        (typeof data === 'object' && Object.keys(data).length === 0)) {
        if (renderError) {
            return <>{renderError(error ?? "Null")}</>;
        }
        return <div>An error occurred: {error ?? "Null"}</div>;
    }

    return <>{render(data)}</>;
}