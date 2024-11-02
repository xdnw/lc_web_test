import { hasToken } from '@/utils/Auth';
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';
import { create } from 'zustand';
import Cookies from "js-cookie";

type DataProviderProps = {
    children: ReactNode;
    endpoint: string;
};

const areObjectsEqual = (obj1: { [key: string]: string }, obj2: { [key: string]: string }): boolean => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
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

// cache types enum Cookie/Zustand/Localstorage
export enum CacheType {
    Cookie = "cookie",
    Zustand = "zustand",
    LocalStorage = "localstorage"
}

type CacheItem<T> = {
    value: T;
    expirationTime: number;
};

type CacheStore<T> = {
    cache: { [key: string]: CacheItem<T> };
    setCache: (cookieId: string, value: T, duration: number) => void;
    getCache: (cookieId: string) => T | null;
    removeExpiredItems: () => void;
};

export const useCacheStore = create<CacheStore<any>>((set, get) => ({
    cache: {},
    setCache: (cookieId, value, duration) => {
        const expirationTime = Date.now() + duration * 1000; // Convert to milliseconds
        set((state) => ({
            cache: {...state.cache, [cookieId]: {value, expirationTime}}
        }));
    },
    getCache: (cookieId) => {
        const cacheItem = get().cache[cookieId];
        if (cacheItem) {
            if (cacheItem.expirationTime > Date.now()) {
                return cacheItem.value;
            } else {
                delete get().cache[cookieId];
            }
        }
        return null;
    },
    removeExpiredItems: () => {
        set((state) => {
            const newCache = {...state.cache};
            Object.keys(newCache).forEach((key) => {
                if (newCache[key].expirationTime <= Date.now()) {
                    delete newCache[key];
                }
            });
            return {cache: newCache};
        });
    }
}));

interface JSONArray extends Array<JSONValue> {}

interface QueryData {
    query: { [key: string]: string };
    cache?: { cache_type: CacheType, duration?: number, cookie_id: string };
}

export const DataProvider: React.FC<DataProviderProps> = ({ children, endpoint }) => {
    const [data, setData] = useState<{ [key: string]: JSONValue }[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [queries, setQueries] = useState<[string,QueryData][]>([]);

    const registerQuery = useCallback((name: string, query: { [key: string]: string }, cache?: { cache_type: CacheType, duration?: number, cookie_id: string }): number => {
        setQueries((prevQueries) => {
            const existingIndex = prevQueries.findIndex(([qName, qQuery]) => qName === name && areObjectsEqual(qQuery.query, query));
            if (existingIndex !== -1) {
                return prevQueries;
            }
            const newQueryData: QueryData = cache ? {query: query, cache: cache} : {query: query};
            if (cache) {
                return [...prevQueries, [name, newQueryData]];
            } else {
                return [...prevQueries, [name, newQueryData]];
            }
        });
        return queries.length;
    }, []);

    useEffect(() => {
        if (Object.keys(queries).length > 0) {
            const cachedResults: ({ [key: string]: JSONValue } | null)[] = [];
            const indexes: number[] = [];
            // iterate queries, if cache exists, add to cachedResults, else put null and add index to indexes
            for (let i = 0; i < queries.length; i++) {
                const query = queries[i];
                const cache = query[1].cache;
                if (cache) {
                    if (cache.cache_type === CacheType.Cookie) {
                        const cookieVal = Cookies.get(cache.cookie_id);
                        if (cookieVal) {
                            cachedResults.push(JSON.parse(cookieVal));
                            continue;
                        }
                    } else if (cache.cache_type === CacheType.Zustand) {
                        const zustandCache = useCacheStore.getState().getCache(cache.cookie_id);
                        if (zustandCache) {
                            cachedResults.push(zustandCache);
                            continue
                        }
                    } else {
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
                    }
                }
                cachedResults.push(null);
                indexes.push(i);
            }
            if (indexes.length > 0) {
                const headers: { 'Content-Type': string } = {
                    'Content-Type': 'application/json',
                };

                const url = `${process.env.API_URL}${endpoint}`;
                const finalQueries = indexes.map((index) => queries[index][1].query);
                const formBody = new URLSearchParams({ queries: JSON.stringify(finalQueries) }).toString();
                console.log("Fetching data from", url, "with queries", finalQueries);

                fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: formBody,
                    credentials: 'include',
                })
                    .then(response => {
                        if (response.ok) {
                            return response.text().then(text => text ? JSON.parse(text) : {});
                        } else {
                            throw new Error('Network response was not ok.');
                        }
                    })
                    .then(fetchedData => {
                        for (let i = 0; i < indexes.length; i++) {
                            const index = indexes[i];
                            const cache = queries[index][1].cache;
                            if (cache) {
                                const duration = cache.duration ?? 2592000; // 30 days default in seconds
                                if (cache.cache_type === CacheType.Cookie) {
                                    Cookies.set(cache.cookie_id, JSON.stringify(fetchedData[i]), { expires: duration });
                                } else if (cache.cache_type === CacheType.Zustand) {
                                    useCacheStore.getState().setCache(cache.cookie_id, fetchedData[i], duration);
                                } else {
                                    const expirationTime = Date.now() + duration * 1000; // Convert to milliseconds
                                    const dataWithExpiration = { data: fetchedData[i], expirationTime };
                                    localStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                                }
                            }
                            cachedResults[index] = fetchedData[i];
                        }
                        setData(cachedResults as { [key: string]: JSONValue }[]);
                        setLoading(false);
                    })
                    .catch(error => {
                        setLoading(false);
                        setError(`${error}`);
                    });
            } else {
                setLoading(false);
                setData(cachedResults as { [key: string]: JSONValue }[]);
            }
        }
    }, [queries, endpoint]);

    return (
        <DataContext.Provider value={{ data, loading, error, registerQuery }}>
            {children}
        </DataContext.Provider>
    );
};

type DataContextType<T> = {
    data: T | null;
    loading: boolean;
    error: string | null;
    registerQuery: (name: string, query: { [key: string]: string }) => number;
};

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export const useData = <T,>(): DataContextType<T[]> => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context as DataContextType<T[]>;
};

export const useRegisterQuery = (name: string, query: {[key: string]: string}): number => {
    const { registerQuery } = useData();
    const hasRun = useRef(-1);

    useEffect(() => {
        if (hasRun.current == -1) {
            hasRun.current = registerQuery(name, query);
        }
    }, [registerQuery, name, query]);

    return hasRun.current;
};