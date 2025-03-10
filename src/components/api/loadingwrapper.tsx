import React, { Component } from 'react';
import Loading from "@/components/ui/loading.tsx";
import { WebSuccess } from "@/components/api/apitypes";
import {DEBUG, deepEqual} from "../../lib/utils";
import {QueryResult} from "../cmd/DataContext";
import { JSONValue } from './internaltypes';

interface LoadingWrapperProps<T> {
    index: number;
    query: QueryResult<T>[];
    render: (data: T) => React.ReactNode;
    renderLoading?: () => React.ReactNode;
    renderError?: (error: string) => React.ReactNode;
}

interface LoadingWrapperState<T> {
    data: QueryResult<T>[] | null;
    index: number;
}

class LoadingWrapper<T> extends Component<LoadingWrapperProps<T>, LoadingWrapperState<T>> {
    constructor(props: LoadingWrapperProps<T>) {
        super(props);
        this.state = {
            data: props.query ? props.query.map(f => f.clone()) : null,
            index: props.index
        };
    }

    static getDerivedStateFromProps<T>(nextProps: LoadingWrapperProps<T>, prevState: LoadingWrapperState<T>) {
        if (nextProps.query !== prevState.data) {
            return {
                data: nextProps.query ? nextProps.query.map(f => f.clone()) : null,
                index: nextProps.index
            };
        }
        return null;
    }

    shouldComponentUpdate(nextProps: LoadingWrapperProps<T>, nextState: LoadingWrapperState<T>) {
        const prevI = this.state.index;
        const nextI = nextProps.index;
        const prevQ = prevI >= 0 && this.state.data && this.state.data.length >= prevI ? this.state.data[prevI] ?? null : null;
        const nextQ = nextI >= 0 && nextProps.query && nextProps.query.length >= nextI ? nextProps.query[nextI] ?? null : null;
        if (!prevQ && !nextQ) {
            // if (DEBUG.LOADING_WRAPPER) console.log("NO RENDER, both queries are null", nextProps.query);
            return false;
        }
        const prevLoading = !prevQ || prevQ.loading;
        const nextLoading = !nextQ || nextQ.loading;

        if (prevLoading !== nextLoading) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE LOADING", this.state.index + " | " + prevLoading + "=>" + nextLoading);
            return true;
        }
        const prevError = prevQ ? prevQ.error ?? null : null;
        const nextError = nextQ ? nextQ.error ?? null : null;
        if (prevError !== nextError) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE ERROR", this.state.index + " | " + prevError + "=>" + nextError);
            return true;
        }
        if ((prevQ != null) !== (nextQ != null)) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE QUERY REFERENCE. NULL: (" + (prevQ != null) + "=>" + (nextQ != null) + ") | loading: (" + prevLoading + "=>" + nextLoading + ") | error: (" + prevError + "=>" + nextError + ")");
            return true;
        }
        const prevData = prevQ ? prevQ.data : undefined;
        const nextData = nextQ ? nextQ.data : undefined;
        if (prevData !== nextData && !deepEqual(prevData, nextData)) {
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER BECAUSE DATA REFERENCE AND NOT EQUAL", this.state.index);
            return true;
        }
        // if (DEBUG.LOADING_WRAPPER) console.log("NO RENDER, data has not changed", this.state.index);
        return false;
    }

    render() {
        const { index, query, render, renderLoading, renderError } = this.props;
        const { data } = this.state;

        const queryAtIndex = query != null && query.length >= index ? query[index] : null;
        const loading = queryAtIndex != null ? queryAtIndex.loading : true;

        if (loading || queryAtIndex == null) {
            if (renderLoading) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER LOADING");
                return renderLoading();
            }
            if (DEBUG.LOADING_WRAPPER) console.log("LOADING COMPONENT");
            return <Loading />;
        }

        const error = queryAtIndex.error;
        if (error) {
            if (renderError) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR");
                return renderError(error);
            }
            if (DEBUG.LOADING_WRAPPER) console.log("AN ERROR OCCURED");
            return <div>An error occurred (1): {error}</div>;
        }
        const elem = queryAtIndex.data;
        if (!elem) {
            // if (renderError) {
            //     return renderError(error ?? "Null");
            // }
            if (DEBUG.LOADING_WRAPPER) console.log("NULL");
            return null;
        }
        const webSuccess = elem as unknown as WebSuccess;
        if (webSuccess?.success === false) {
            if (renderError) {
                if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR SUCCESS");
                return renderError(webSuccess?.message ?? "Null");
            }
            if (DEBUG.LOADING_WRAPPER) console.log("RENDER ERROR SUCCESS DEFAULT");
            return <div>An error occurred (3): {webSuccess?.message ?? "Null"}</div>;
        }
        if (DEBUG.LOADING_WRAPPER) console.log("RENDER ELEM");
        return render(elem as T);
    }
}

export default LoadingWrapper;