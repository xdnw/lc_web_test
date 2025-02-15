import React, { useCallback, createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import Cookies from "js-cookie";
import {UNPACKR} from "@/lib/utils.ts";
import {CommonEndpoint} from "../api/endpoint";
import {deepEqual} from "../../lib/utils";
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

type JSONValue =
    | string
    | number
    | boolean
    | null
    | JSONObject
    | JSONArray;

interface JSONObject {
    [key: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}

interface QueryData {
    query: { [key: string]: string | string[] };
    cache?: { cache_type: CacheType, duration?: number, cookie_id: string };
}

export enum CacheType {
    None = "none",
    Cookie = "cookie",
    LocalStorage = "local",
    SessionStorage = "session",
}

export function defaultCache(cookie: string) {
    return { cache_type: CacheType.LocalStorage, cookie_id: cookie, duration: 2592000 };
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, endpoint }) => {
    const [data, setData] = useState<({ [key: string]: JSONValue } | null)[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const queries = useRef<[string, QueryData][]>([]);

    const [rerender, setRerender] = useState<boolean>(false);
    const newQueryRef = useRef<number>(0);
    const lastQuery = useRef<number>(0);

    const registerQuery = useCallback((name: string, query: { [key: string]: string | string[] }, cache?: { cache_type: CacheType, duration?: number, cookie_id: string }): number => {
        let newIndex = -1;
        const existingIndex = queries.current.findIndex(([qName, qQuery]) => qName === name && areObjectsEqual(qQuery.query, query));
        if (existingIndex !== -1) {
            newIndex = existingIndex;
        } else {
            const newQueryData: QueryData = cache ? { query: query, cache: cache } : { query: query };
            newIndex = queries.current.length;
            queries.current.push([name, newQueryData]);
            if (newQueryRef.current == lastQuery.current) {
                newQueryRef.current++;
                setLoading(true);
                setRerender(!rerender);
            }
        }
        return newIndex;
    }, [queries, newQueryRef, lastQuery, rerender]);

    const refetch = useCallback(() => {
        newQueryRef.current++;
        setRerender(prev => !prev);
    }, [setRerender]);

    const refetchQueries = useCallback((queryId: number[]) => {
        if (!data || !queries.current) return;
        let newData: ({ [key: string]: JSONValue } | null)[] | null = null;
        for (const id of queryId) {
            if (!data[id]) continue;
            if (newData === null) {
                newData = [...data];
            }
            newData[id] = null;
            const query = queries.current[id];
            const cache = query[1].cache;
            if (cache) {
                if (cache.cache_type === CacheType.Cookie) {
                    Cookies.remove(cache.cookie_id);
                } else if (cache.cache_type === CacheType.LocalStorage) {
                    localStorage.removeItem(cache.cookie_id);
                } else if (cache.cache_type === CacheType.SessionStorage) {
                    sessionStorage.removeItem(cache.cookie_id);
                }
            }
        }
        if (newData) {
            setData(newData);
            newQueryRef.current++;
            setRerender(prev => !prev);
        }
    }, [data, setRerender]);

    useEffect(() => {
        console.log("Run queries before ", queries.current.length + " | " + lastQuery.current + " | " + newQueryRef.current);
        if (newQueryRef.current !== lastQuery.current) {
            lastQuery.current = newQueryRef.current;
            console.log("Run Queries", queries.current.length);
            const cachedResults: ({ [key: string]: JSONValue } | null)[] = [];
            const indexes: number[] = [];
            for (let i = 0; i < queries.current.length; i++) {
                if (data && data.length >= i) {
                    const dataI = data[i];
                    if (dataI && dataI.success !== false) {
                        cachedResults.push(dataI);
                        continue;
                    }
                }
                const query = queries.current[i];
                const cache = query[1].cache;
                if (cache) {
                    if (cache.cache_type === CacheType.Cookie) {
                        const cookieVal = Cookies.get(cache.cookie_id);
                        console.log("Cookie value", cookieVal, (cookieVal === undefined));
                        if (cookieVal) {
                            cachedResults.push(JSON.parse(cookieVal));
                            continue;
                        }
                    } else if (cache.cache_type === CacheType.LocalStorage) {
                        const elemWithExpiry = localStorage.getItem(cache.cookie_id);
                        if (elemWithExpiry) {
                            const parsedElem = JSON.parse(elemWithExpiry);
                            if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                                localStorage.removeItem(cache.cookie_id);
                            } else {
                                cachedResults.push(parsedElem.data);
                                continue;
                            }
                        }
                    } else if (cache.cache_type == CacheType.SessionStorage) {
                        const elemWithExpiry = sessionStorage.getItem(cache.cookie_id);
                        if (elemWithExpiry) {
                            const parsedElem = JSON.parse(elemWithExpiry);
                            if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                                sessionStorage.removeItem(cache.cookie_id);
                            } else {
                                cachedResults.push(parsedElem.data);
                                continue;
                            }
                        }
                    }
                }
                cachedResults.push(null);
                indexes.push(i);
            }
            if (indexes.length > 0) {
                const headers: { 'Content-Type': string } = {
                    'Content-Type': 'application/msgpack',
                };

                const url = `${process.env.API_URL}${endpoint}`;
                const finalQueries = indexes.map((index) => {
                    const query = queries.current[index];
                    return [query[0], query[1].query];
                });
                const formBody = new URLSearchParams({ queries: JSON.stringify(finalQueries) }).toString();
                console.log("Fetching data from", url, "with queries", finalQueries);

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
                            return UNPACKR.unpack(data);
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(fetchedData => {
                        const arr = fetchedData.results;
                        if (Array.isArray(arr)) {
                            for (let i = 0; i < indexes.length; i++) {
                                const val = arr[i];
                                const index = indexes[i];
                                if (val.success || val.success !== false) {
                                    const cache = queries.current[index][1].cache;
                                    if (cache) {
                                        const duration = cache.duration ?? 2592000; // 30 days default in seconds
                                        if (cache.cache_type === CacheType.Cookie) {
                                            Cookies.set(cache.cookie_id, JSON.stringify(val), {expires: duration});
                                        } else if (cache.cache_type === CacheType.LocalStorage) {
                                            const expirationTime = Date.now() + duration * 1000; // Convert to milliseconds
                                            const dataWithExpiration = {data: val, expirationTime};
                                            localStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                                        } else if (cache.cache_type === CacheType.SessionStorage) {
                                            const expirationTime = Date.now() + duration * 1000; // Convert to milliseconds
                                            const dataWithExpiration = {data: val, expirationTime};
                                            sessionStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                                        }
                                    }
                                }
                                cachedResults[index] = val;
                            }
                        }
                        setData(cachedResults as { [key: string]: JSONValue }[]);
                        setLoading(false);
                    })
                    .catch(error => {
                        setError(`${error}`);
                        setLoading(false);
                    });
            } else {
                setData(cachedResults as { [key: string]: JSONValue }[]);
                setLoading(false);
            }
        }
    }, [rerender]);

    return (
        <DataContext.Provider value={{ data, loading, error, registerQuery, refetch, refetchQueries }}>
            {children}
        </DataContext.Provider>
    );
};

type DataContextType<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    registerQuery: (name: string, query: { [key: string]: string | string[] }, cache?: { cache_type: CacheType, duration?: number, cookie_id: string }) => number;
    refetch: () => void;
    refetchQueries: (queryId: number[]) => void;
};

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export const useData = <T,>(): DataContextType<T[]> => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context as DataContextType<T[]>;
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