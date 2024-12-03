import React, { Component } from 'react';
import Loading from "@/components/ui/loading.tsx";
import { WebSuccess } from "@/components/api/apitypes";
import {deepEqual} from "../../lib/utils";

interface LoadingWrapperProps<T> {
    index: number;
    loading: boolean;
    data: T[] | null;
    error: string | null;
    render: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}

interface LoadingWrapperState<T> {
    data: T[] | null;
}

class LoadingWrapper<T> extends Component<LoadingWrapperProps<T>, LoadingWrapperState<T>> {
    constructor(props: LoadingWrapperProps<T>) {
        super(props);
        this.state = {
            data: props.data,
        };
    }

    static getDerivedStateFromProps<T>(nextProps: LoadingWrapperProps<T>, prevState: LoadingWrapperState<T>) {
        if (nextProps.data !== prevState.data) {
            return {
                data: nextProps.data,
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps: LoadingWrapperProps<T>, nextState: LoadingWrapperState<T>) {
        if (nextProps.loading !== this.props.loading) {
            console.log("RENDER BECAUSE LOADING", this.props.index);
            return true;
        }
        if (nextProps.error !== this.props.error) {
            console.log("RENDER BECAUSE ERROR", this.props.index);
            return true;
        }
        if (deepEqual(nextProps.data, this.state.data)) {
            console.log("RENDER BECAUSE DATA ", this.props.index);
            return true;
        }
        return false;
    }

    render() {
        const { index, loading, error, render, renderLoading, renderError } = this.props;
        const { data } = this.state;

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
        return <>{render(elem as T)}</>;
    }
}

export default LoadingWrapper;