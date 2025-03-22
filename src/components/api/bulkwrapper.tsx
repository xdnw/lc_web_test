import { ReactNode, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { fetchBulk, fillOutCache, QueryResult } from "../cmd/BulkQuery";
import { CacheType } from "./apitypes";
import { deepEqual } from "@/lib/utils";
import { ErrorBoundary } from "react-error-boundary";
import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../ui/loading";
import { Button } from "../ui/button";
import { useDialog } from "../layout/DialogContext";


export function useDeepCompareMemo<T>(value: T): T {
    const [memoValue, setMemoValue] = useState(value);

    console.log("RERENDER DEEP COMPARE MEMO");

    useEffect(() => {
        if (!deepEqual(value, memoValue)) {
            setMemoValue(value);
        }
    }, [value, memoValue]);

    return memoValue;
}

export function renderEndpointFallback({
    error,
    resetErrorBoundary,
    endpoint,
    query,
}: {
    error: Error;
    resetErrorBoundary: () => void;
    endpoint: string;
    query: { readonly [key: string]: string | string[] };
}) {
    return (
        <ErrorBoundaryFallback
            endpoint={endpoint}
            query={query}
            error={error}
            resetErrorBoundary={resetErrorBoundary}
        />
    );
}

export interface DisplayProps<T> {
    readonly endpoint: string;
    readonly query: { readonly [key: string]: string | string[] };
    readonly cache_duration: number;
    readonly batch_wait_ms?: number;
    readonly children: (data: QueryResult<T>) => ReactNode;
    readonly onError?: (error: Error) => void;
}

export default function EndpointWrapper<T>({
    endpoint,
    query,
    cache_duration = 5000,
    batch_wait_ms,
    onError,
    children,
}: DisplayProps<T>) {
    console.log("MOUNT ENDPOINT WRAPPER");
    const stableQuery = useDeepCompareMemo(query);

    // memoize the fallback render to avoid recreating the function on every render
    const fallbackRender = useCallback(
        (fallbackProps: { error: Error; resetErrorBoundary: () => void }) =>
            renderEndpointFallback({
                ...fallbackProps,
                endpoint,
                query: stableQuery,
            }),
        [endpoint, stableQuery]
    );

    return (
        <ErrorBoundary fallbackRender={fallbackRender} onError={onError ?? console.error}>
            <Suspense fallback={<Loading />}>
                <BulkQueryWrapper
                    endpoint={endpoint}
                    query={stableQuery}
                    cache_duration={cache_duration}
                    batch_wait_ms={batch_wait_ms}
                >
                    {children}
                </BulkQueryWrapper>
            </Suspense>
        </ErrorBoundary>
    );
}


export function ErrorBoundaryFallback({
    endpoint,
    query,
    error,
    resetErrorBoundary,
}: {
    readonly endpoint: string;
    readonly query: { readonly [key: string]: string | string[] };
    readonly error: Error;
    readonly resetErrorBoundary: () => void;
}) {
    const queryClient = useQueryClient();

    const handleRetry = () => {
        queryClient.removeQueries({ queryKey: [endpoint, query] });
        resetErrorBoundary();
    };

    return (
        <>
            <div role="alert" className="whitespace-pre-wrap bg-accent relative px-2 border-2 border-destructive">
                <pre className="">{error.name}: {error.message}</pre>
            </div>
            <Button size="sm" variant="outline" onClick={handleRetry}>Try again</Button>
        </>
    );
}

class BackendError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "BackendError";
    }
}

export function BulkQueryWrapper<T>({
    endpoint,
    query,
    cache_duration,
    batch_wait_ms,
    children,
}: {
    readonly endpoint: string;
    readonly query: { readonly [key: string]: string | string[] };
    readonly cache_duration: number;
    readonly batch_wait_ms?: number;
    readonly children: (data: QueryResult<T>) => ReactNode;
}) {
    const { data } = useSuspenseQuery<QueryResult<T>>({
            queryKey: [endpoint, query],
            queryFn: async (meta) => {
                console.log("Fetching bulk data...");
                const keys = meta.queryKey as [string, { [key: string]: string }];
                const result = await fetchBulk<T>({ 
                    endpoint: keys[0], 
                    query: keys[1], 
                    cache: undefined, 
                    batch_wait_ms: batch_wait_ms ?? 200 
                });
                if (result.error) {
                    throw new BackendError(result.error);
                }
                return result;
            },
            refetchOnReconnect: true,
            refetchOnWindowFocus: true,
            refetchOnMount: true,
            staleTime: cache_duration ?? 5000,
            retry: (failureCount, err) =>
                (!(err instanceof BackendError) && failureCount < 3) || failureCount < 1,
    });
    return children(data);
}