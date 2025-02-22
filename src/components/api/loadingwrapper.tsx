import React, { Component } from 'react';
import Loading from "@/components/ui/loading.tsx";
import { WebSuccess } from "@/components/api/apitypes";
import {DEBUG, deepEqual} from "../../lib/utils";

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
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE LOADING", this.props.index + " | " + nextProps.loading);
            return true;
        }
        if (nextProps.error !== this.props.error) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE ERROR", this.props.index);
            return true;
        }
        if (nextProps.index == -1) {
            if (DEBUG.LOADING_WRAPPER) console.log("NO RENDER BECAUSE INDEX IS -1");
            return false;
        }
        if (this.props.index != nextProps.index && nextProps.data && nextProps.data.length >= nextProps.index && nextProps.data[nextProps.index]) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE INDEX", this.props.index);
            return true;
        }
        if (nextProps.data && nextProps.data.length >= nextProps.index && nextProps.data[nextProps.index]) {
            if (this.props.index == -1 || !this.state.data || this.state.data.length < this.props.index || !this.state.data[this.props.index]) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE PREVIOUS DATA IS NULL");
                return true;
            } else if (!deepEqual(nextProps.data[nextProps.index], this.state.data[this.props.index])) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE DATA IS CHANGED");
                return true;
            } else {
                if (DEBUG.LOADING_WRAPPER) console.log("NO RENDER, data is the same");
            }
        } else if (this.state.data && this.state.data.length > nextProps.index && this.state.data[this.props.index]) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE PREVIOUS DATA IS NOT NULL AND NEW DATA IS NULL");
            return true;
        } else {
            if (DEBUG.LOADING_WRAPPER) console.log("NO RENDER, both props are null", nextProps.index, nextProps.data);
        }
        return false;
    }

    render() {
        const { index, loading, error, render, renderLoading, renderError } = this.props;
        const { data } = this.state;

        if (loading) {
            if (renderLoading) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER LOADING");
                return renderLoading();
            }
            if (DEBUG.LOADING_WRAPPER) console.log("LOADING COMPONENT");
            return <Loading />;
        }
        if (error) {
            if (renderError) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR");
                return renderError(error);
            }
            if (DEBUG.LOADING_WRAPPER) console.log("AN ERROR OCCURED");
            return <div>An error occurred (1): {error}</div>;
        }
        const elem = data ? data[index] as WebSuccess : null;
        if (!elem) {
            // if (renderError) {
            //     return renderError(error ?? "Null");
            // }
            if (DEBUG.LOADING_WRAPPER) console.log("NULL");
            return null;
        }
        if (elem?.success === false) {
            if (renderError) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR SUCCESS");
                return renderError(elem?.message ?? "Null");
            }
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR SUCCESS DEFAULT");
            return <div>An error occurred (3): {elem?.message ?? "Null"}</div>;
        }
        if (DEBUG.LOADING_WRAPPER) console.log("RENDER ELEM");
        return render(elem as T);
    }
}

export default LoadingWrapper;