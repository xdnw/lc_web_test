import React, { useCallback, createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import Cookies from "js-cookie";
import {UNPACKR} from "@/lib/utils.ts";
import {CommonEndpoint} from "../api/endpoint";
import {DEBUG, deepEqual} from "../../lib/utils";
import { JSONValue } from '../api/internaltypes';
type DataProviderProps = {
    children: ReactNode;
    endpoint: string;
};

const areObjectsEqual = (obj1: { [key: string]: string | string[] }, obj2: { [key: string]: string | string[] }): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        if (Array.isArray(val1) && Array.isArray(val2)) {
            if (val1.length !== val2.length || !val1.every((val, index) => val === val2[index])) {
                return false;
            }
        } else if (val1 !== val2) {
            return false;
        }
    }
    return true;
};

export enum CacheType {
    None = "none",
    Cookie = "cookie",
    LocalStorage = "local",
    SessionStorage = "session",
}

export class QueryResult<T> {
    id: number;
    endpoint: string;
    query: { [key: string]: string | string[] };
    update_ms: number;

    cache?: { cache_type: CacheType, duration?: number, cookie_id: string };
    data?: T | null;
    error?: string | null;

    loading: boolean;
    refetch: boolean;

    constructor({
                    id, endpoint, query, update_ms, cache, data, error, loading = true, refetch = false
                }: {
        id: number;
        endpoint: string;
        query: { [key: string]: string | string[] };
        update_ms: number;
        cache?: { cache_type: CacheType, duration?: number, cookie_id: string };
        data?: T | null;
        error?: string | null;
        loading?: boolean;
        refetch?: boolean;
    }) {
        this.id = id;
        this.endpoint = endpoint;
        this.query = query;
        this.update_ms = update_ms;
        this.cache = cache;
        this.data = data;
        this.error = error;
        this.loading = loading;
        this.refetch = refetch;
    }

    set(data: T | null) {
        this.data = data;
        this.error = null;
        this.loading = false;
        this.refetch = false;
        this.update_ms = Date.now();
        return this;
    }

    update(time: number) {
        this.update_ms = time;
        return this;
    }

    clearCache() {
        if (this.cache) {
            if (this.cache.cache_type === CacheType.Cookie) {
                Cookies.remove(this.cache.cookie_id);
            } else if (this.cache.cache_type === CacheType.LocalStorage) {
                localStorage.removeItem(this.cache.cookie_id);
            } else if (this.cache.cache_type === CacheType.SessionStorage) {
                sessionStorage.removeItem(this.cache.cookie_id);
            }
        }
        return this;
    }

    refresh() {
        this.clearCache();
        this.refetch = true;
        this.loading = true;
        this.data = undefined;
        return this;
    }

    get get(): T | undefined | null {
        // TODO fetches again if its been uncached
        if (this.data === undefined) {

        }
        return this.data;
    }

    clone() {
        return new QueryResult<T>({
            id: this.id,
            endpoint: this.endpoint,
            query: this.query,
            update_ms: this.update_ms,
            cache: this.cache,
            data: this.data,
            error: this.error,
            loading: this.loading,
            refetch: this.refetch
        });
    }
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, endpoint }) => {
    // const [data, setData] = useState<({ [key: string]: JSONValue } | null)[] | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    // const [error, setError] = useState<string | null>(null);
    const queries = useRef<[string, QueryResult<{ [key: string]: JSONValue }>][]>([]);

    const [rerender, setRerender] = useState<boolean>(false);
    const newQueryRef = useRef<number>(0);
    const lastQuery = useRef<number>(0);

    const registerQuery = useCallback((name: string, query: { [key: string]: string | string[] }, cache?: { cache_type: CacheType, duration?: number, cookie_id: string }): number => {
        let newIndex = -1;
        const existingIndex = queries.current.findIndex(([qName, qQuery]) => qName === name && areObjectsEqual(qQuery.query, query));
        if (existingIndex !== -1) {
            newIndex = existingIndex;
        } else {
            // const newQueryData: QueryData = cache ? { query: query, cache: cache } : { query: query };
            newIndex = queries.current.length;
            // newIndex, name, query, 0, cache

            const newQueryData: QueryResult<{ [key: string]: JSONValue }> = new QueryResult({
                id: newIndex,
                endpoint: name,
                query: query,
                update_ms: 0,
                cache: cache,
            });
            queries.current.push([name, newQueryData]);
            if (newQueryRef.current == lastQuery.current) {
                newQueryRef.current++;
                setRerender(f => !f);
            }
        }
        return newIndex;
    }, [queries, newQueryRef, lastQuery, rerender]);

    const refetch = useCallback(() => {
        newQueryRef.current++;
        setRerender(prev => !prev);
    }, [setRerender]);

    const refetchQueries = useCallback((queryId: number[]) => {
        if (!queries.current) return;
        let rerenderFlag = false;
        for (const id of queryId) {
            const entry = queries.current[id];
            if (!entry) continue;
            const query = entry[1];
            if (!query.data) return;
            query.refresh();
            rerenderFlag = true;
        }
        if (rerenderFlag) {
            newQueryRef.current++;
            setRerender(prev => !prev);
        }
    }, [queries, setRerender]);

    useEffect(() => {
        if (DEBUG.LOADING_WRAPPER) console.log("Run queries before ", queries.current.length + " | " + lastQuery.current + " | " + newQueryRef.current);
        if (newQueryRef.current !== lastQuery.current) {
            lastQuery.current = newQueryRef.current;
            if (DEBUG.LOADING_WRAPPER) console.log("Run Queries", queries.current.length);
            const shouldFetch: QueryResult<{ [key: string]: JSONValue }>[] = [];
            let shouldRerender = false;

            for (let i = 0; i < queries.current.length; i++) {
                const entry = queries.current[i];
                const query = entry[1];
                if (query.data != undefined) continue;
                shouldRerender = true;

                const cache = query.cache;
                if (cache) {
                    if (cache.cache_type === CacheType.Cookie) {
                        const cookieVal = Cookies.get(cache.cookie_id);
                        if (DEBUG.LOADING_WRAPPER) console.log("Cookie value", cookieVal, (cookieVal === undefined));
                        if (cookieVal) {
                            const value = JSON.parse(cookieVal) as { [key: string]: JSONValue };
                            query.set(value);
                            continue;
                        }
                    } else if (cache.cache_type === CacheType.LocalStorage) {
                        const elemWithExpiry = localStorage.getItem(cache.cookie_id);
                        if (elemWithExpiry) {
                            const parsedElem = JSON.parse(elemWithExpiry) as { expirationTime: number, data: { [key: string]: JSONValue } };
                            if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                                localStorage.removeItem(cache.cookie_id);
                            } else {
                                query.set(parsedElem.data).update(parsedElem.expirationTime - (cache.duration ?? 2592000) * 1000);
                                continue;
                            }
                        }
                    } else if (cache.cache_type == CacheType.SessionStorage) {
                        const elemWithExpiry = sessionStorage.getItem(cache.cookie_id);
                        if (elemWithExpiry) {
                            const parsedElem = JSON.parse(elemWithExpiry) as { expirationTime: number, data: { [key: string]: JSONValue } };
                            if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                                sessionStorage.removeItem(cache.cookie_id);
                            } else {
                                query.set(parsedElem.data).update(parsedElem.expirationTime);
                                continue;
                            }
                        }
                    }
                }
                shouldFetch.push(query);
            }
            if (shouldFetch.length > 0) {
                const headers: { 'Content-Type': string } = {
                    'Content-Type': 'application/msgpack',
                };

                const url = `${process.env.API_URL}${endpoint}`;
                const finalQueries = shouldFetch.map((query) => {
                    return [query.endpoint, query.query];
                });
                const formBody = new URLSearchParams({ queries: JSON.stringify(finalQueries) }).toString();
                console.log("Fetching data from", url, "with queries",
                    shouldFetch.map((query) => query.query),
                    "And cache policy", shouldFetch.map((query) => query.cache),);

                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: formBody,
                    credentials: 'include',
                })
                    .then(async response => {
                        if (response.ok) {
                            const serializedData = await response.arrayBuffer();
                            const data = new Uint8Array(serializedData);
                            return UNPACKR.unpack(data) as { results: { [key: string]: JSONValue }[] };
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(fetchedData => {
                        let updated = false;
                        const arr = fetchedData.results as { [key: string]: JSONValue }[];
                        if (Array.isArray(arr)) {
                            for (let i = 0; i < arr.length; i++) {
                                const now = Date.now();
                                const val = arr[i];
                                console.log("DATA " + JSON.stringify(val));
                                const query = shouldFetch[i];
                                if (val.success || val.success !== false) {
                                    const cache = query.cache;
                                    if (cache) {
                                        const duration = cache.duration ?? 2592000; // 30 days default in seconds
                                        if (cache.cache_type === CacheType.Cookie) {
                                            Cookies.set(cache.cookie_id, JSON.stringify(val), {expires: duration});
                                        } else if (cache.cache_type === CacheType.LocalStorage) {
                                            const expirationTime = now + duration * 1000; // Convert to milliseconds
                                            const dataWithExpiration = {data: val, expirationTime};
                                            localStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                                        } else if (cache.cache_type === CacheType.SessionStorage) {
                                            const expirationTime = now + duration * 1000; // Convert to milliseconds
                                            const dataWithExpiration = {data: val, expirationTime};
                                            sessionStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                                        }
                                    }
                                }
                                query.set(val).update(now);
                                updated = true;
                            }
                        }
                        if (updated) {
                            setRerender(prev => !prev);
                        }
                    })
                    .catch(error => {
                        for (const query of shouldFetch) {
                            query.error = error as string;
                            query.set(null);
                        }
                        setRerender(prev => !prev);
                    });
            } else {
                if (shouldRerender) {
                    setRerender(prev => !prev);
                }
            }
        }
    }, [rerender]);

    return (
        <DataContext.Provider value={{
            queries: queries.current.map(([name, query]) => query),
            registerQuery, refetch, refetchQueries }}>
            {children}
        </DataContext.Provider>
    );
};

type DataContextType<T> = {
    queries: T;
    registerQuery: (name: string, query: { [key: string]: string | string[] }, cache?: { cache_type: CacheType, duration?: number, cookie_id: string }) => number;
    refetch: () => void;
    refetchQueries: (queryId: number[]) => void;
};

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export const useData = <T,>(): DataContextType<QueryResult<T>[]> => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context as DataContextType<QueryResult<T>[]>;
};

export const useRegisterQuery = (name: string,
                                 query: { [key: string]: string | string[] },
                                 cache: { cache_type: CacheType, duration?: number, cookie_id: string } | undefined = undefined): [number, React.Dispatch<React.SetStateAction<number>>] => {
    const { registerQuery } = useData();
    const hasRun = useRef<{ hasRun: boolean, query?: { [key: string]: string | string[] } }>({ hasRun: false });
    const [queryId, setQueryId] = useState(-1);

    useEffect(() => {
        if (!hasRun.current.hasRun) {
            const val = registerQuery(name, query, cache);
            setQueryId(val);
            hasRun.current = { hasRun: true, query };
        } else if (!deepEqual(query, hasRun.current.query)) {
            const val = registerQuery(name, query, cache);
            setQueryId(val);
            hasRun.current.query = query;
        }
    }, [name, query, cache, registerQuery]);

    return [queryId, setQueryId];
};
export function useRegisterMultipleQueries<T, U extends { [key: string]: string | string[] | undefined }, V extends { [key: string]: string | string[] | undefined; }>(
    composites: string[],
    endpoint: CommonEndpoint<T, U, V>,
    getArgs: (element: string) => U
): [number[], React.Dispatch<React.SetStateAction<number[]>>] {
    const { registerQuery } = useData();
    const hasRun = useRef(false);
    const [queryIds, setQueryIds] = useState<number[]>([]);

    useEffect(() => {
        if (!hasRun.current) {
            const ids = composites.map((element) => {
                const args = getArgs(element);
                return registerQuery(endpoint.endpoint.name, args as { [key: string]: string | string[]}, endpoint.endpoint.cache);
            });
            setQueryIds(ids);
            hasRun.current = true;
        }
    }, [composites, endpoint, getArgs, registerQuery]);

    return [queryIds, setQueryIds];
}