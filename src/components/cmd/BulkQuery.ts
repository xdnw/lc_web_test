// endpoint: string, query: { [key: string]: string | string[] }, 
// cache?: { cache_type: CacheType, duration?: number, cookie_id: string }
// returns a promise of QueryResult

import Cookies from "node_modules/@types/js-cookie";
import { CacheType } from "../api/apitypes";
import { UNPACKR } from "@/lib/utils";
import { JSONValue } from "../api/internaltypes";

// QueryResult<T> constructor({
//     id, endpoint, query, update_ms, cache, data, error, loading = true, refetch = false
// }

export class QueryResult<T> {
    endpoint: string;
    query: { [key: string]: string | string[] };
    update_ms: number;
    cache?: { cache_type: CacheType; duration?: number; cookie_id: string };
    data?: T | null;
    error?: string | null;

    constructor({
        endpoint,
        query,
        update_ms,
        cache,
        data,
        error }: {
            endpoint: string;
            query: { [key: string]: string | string[] };
            update_ms: number;
            cache?: { cache_type: CacheType; duration?: number; cookie_id: string };
            data?: T | null;
            error?: string | null;
        }) {
        this.endpoint = endpoint;
        this.query = query;
        this.update_ms = update_ms;
        this.cache = cache;
        this.data = data ?? null;
        this.error = error ?? null;
    }
}

export function loadFromCache<T>({ cache }: { cache: { cache_type: CacheType; duration?: number; cookie_id: string } }): T | null {
    if (cache) {
        if (cache.cache_type === CacheType.Cookie) {
            const cookieVal = Cookies.get(cache.cookie_id);
            if (cookieVal) {
                return JSON.parse(cookieVal) as T;
            }
        } else if (cache.cache_type === CacheType.LocalStorage) {
            const elemWithExpiry = localStorage.getItem(cache.cookie_id);
            if (elemWithExpiry) {
                const parsedElem = JSON.parse(elemWithExpiry) as { expirationTime: number, data: T };
                if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                    localStorage.removeItem(cache.cookie_id);
                } else {
                    return parsedElem.data;
                }
            }
        } else if (cache.cache_type == CacheType.SessionStorage) {
            const elemWithExpiry = sessionStorage.getItem(cache.cookie_id);
            if (elemWithExpiry) {
                const parsedElem = JSON.parse(elemWithExpiry) as { expirationTime: number, data: T };
                if (parsedElem.expirationTime && Date.now() > parsedElem.expirationTime) {
                    sessionStorage.removeItem(cache.cookie_id);
                } else {
                    return parsedElem.data;
                }
            }
        }
    }
    return null;
}

// Pending query type to hold individual request info and promise callbacks.
interface PendingQuery<T> {
    endpoint: string;
    query: { [key: string]: string | string[] };
    cache?: { cache_type: CacheType; duration?: number; cookie_id: string };
    resolve: (result: QueryResult<T>) => void;
    reject: (error: any) => void;
}

// A global list to hold pending queries.
const pendingQueries: PendingQuery<any>[] = [];
let batchTimer: ReturnType<typeof setTimeout> | null = null;

function dispatchBatch() {
    // First, check pending queries for cache hits and resolve them immediately.
    // Iterate backwards so removals don't affect the loop.
    for (let i = pendingQueries.length - 1; i >= 0; i--) {
        const pq = pendingQueries[i];
        if (pq.cache) {
            const cachedData = loadFromCache({ cache: pq.cache });
            if (cachedData != null) {
                // Resolve the query with cached data.
                const result = new QueryResult({
                    endpoint: pq.endpoint,
                    query: pq.query,
                    update_ms: Date.now(),
                    cache: pq.cache,
                    data: cachedData,
                    error: null
                });
                pq.resolve(result);
                // Remove from pendingQueries.
                pendingQueries.splice(i, 1);
            }
        }
    }

    // If all queries were resolved via cache, there's no need to fetch.
    if (pendingQueries.length === 0) {
        batchTimer = null;
        return;
    }

    // Save remaining queries for network fetch and clear the queue.
    const queriesToFetch = pendingQueries.splice(0, pendingQueries.length);
    batchTimer = null;

    // Map each pending query into a simpler structure for the batched request.
    const finalQueries = queriesToFetch.map(q => ([q.endpoint, q.query]));

    // Encode the queries as form body data.
    const formBody = new URLSearchParams({ queries: JSON.stringify(finalQueries) }).toString();

    // Build the URL for the batched endpoint.
    const url = `${process.env.API_URL}/query`;

    const headers: { 'Content-Type': string } = {
        'Content-Type': 'application/msgpack',
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: formBody,
        credentials: 'include'
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
            const arr = fetchedData.results as { [key: string]: JSONValue }[];
            if (Array.isArray(arr)) {
                for (let i = 0; i < arr.length; i++) {
                    const now = Date.now();
                    let val: { [key: string]: JSONValue; } | null = arr[i];
                    const query = queriesToFetch[i];
                    let error = val.success === false ? val.error ?? "Unknown Error (1)" : null;
                    if (val && !error) {
                        const cache = query.cache;
                        if (cache) {
                            const duration = cache.duration ?? 2592000; // 30 days default in seconds
                            if (cache.cache_type === CacheType.Cookie) {
                                Cookies.set(cache.cookie_id, JSON.stringify(val), { expires: duration });
                            } else if (cache.cache_type === CacheType.LocalStorage) {
                                const expirationTime = now + duration * 1000; // Convert to milliseconds
                                const dataWithExpiration = { data: val, expirationTime };
                                localStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                            } else if (cache.cache_type === CacheType.SessionStorage) {
                                const expirationTime = now + duration * 1000; // Convert to milliseconds
                                const dataWithExpiration = { data: val, expirationTime };
                                sessionStorage.setItem(cache.cookie_id, JSON.stringify(dataWithExpiration));
                            }
                        }
                    } else {
                        val = null;
                        error = error ?? "Unknown Error (2)";
                    }
                    const pq = queriesToFetch[i];
                    const result: QueryResult<any> = new QueryResult({
                        endpoint: pq.endpoint,
                        query: pq.query,
                        update_ms: Date.now(),
                        cache: pq.cache,
                        data: val,
                        error: error as string | null,
                    });
                    pq.resolve(result);
                }
            } else {
                console.error("Invalid response format:", fetchedData);
                // Reject all queries with an error.
                queriesToFetch.forEach(pq => pq.reject(new Error("Invalid response format")));
            }
        })
        .catch(error => {
            queriesToFetch.forEach(pq => pq.reject(error));
        });
}

/**
 * BulkQuery batches individual queries and returns a promise resolving to a QueryResult.
 *
 * @param params - Object containing:
 *    endpoint: string - The endpoint or name of the query.
 *    query: The query params.
 *    cache: Optional cache settings.
 *    batch_wait_ms: Optional wait time to batch queries, defaulting to 50ms.
 * @returns Promise<QueryResult<T>>
 */
export function BulkQuery<T>({ endpoint, query, cache, batch_wait_ms }: {
    endpoint: string;
    query: { [key: string]: string | string[] };
    cache?: { cache_type: CacheType; duration?: number; cookie_id: string };
    batch_wait_ms?: number;
}): Promise<QueryResult<T>> {
    // check cache
    const cachedData = cache ? loadFromCache<T>({ cache }) : null;
    if (cachedData != null) {
        return Promise.resolve(new QueryResult<T>({
            endpoint,
            query,
            update_ms: Date.now(),
            cache,
            data: cachedData
        }));
    }

    return new Promise((resolve, reject) => {
        pendingQueries.push({ endpoint, query, cache, resolve, reject });
        const waitTime = batch_wait_ms ?? 50;

        // Clear and reset the timer if a new query is added.
        if (batchTimer) {
            clearTimeout(batchTimer);
        }
        batchTimer = setTimeout(dispatchBatch, waitTime);
    });
}