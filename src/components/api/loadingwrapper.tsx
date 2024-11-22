import React from 'react';
import Loading from "@/components/ui/loading.tsx";
import {WebSuccess} from "@/components/api/apitypes";

interface LoadingWrapperProps<T> {
    index: number;
    loading: boolean;
    data: T[] | null;
    error: string | null;
    render: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}

export default function LoadingWrapper<T>({ index, loading, error, data, render, renderLoading, renderError }: LoadingWrapperProps<T>) {
    if (loading) {
        if (renderLoading) {
            return <>{renderLoading()}</>;
        }
        return <Loading />;
    }
    if (error) {
        if (renderError) {
            return <>{renderError(error)}</>;
        }
        return <div>An error occurred (1): {error}</div>;
    }
    const elem = data ? data[index] as WebSuccess : null;
    if (!elem) {
        if (renderError) {
            return <>{renderError(error ?? "Null")}</>;
        }
        return <></>;
    }
    if (elem?.success === false) {
        if (renderError) {
            return <>{renderError(elem?.message ?? "Null")}</>;
        }
        return <div>An error occurred (3): {elem?.message ?? "Null"}</div>;
    }
    console.log("Not error", elem);

    return <>{render(elem as T)}</>;
}