import { API_URL, getSessionToken, hasToken } from '@/utils/Auth';
import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback, useRef } from 'react';

type DataProviderProps = {
    children: ReactNode;
    endpoint: string;
};

export const DataProvider: React.FC<DataProviderProps> = ({ children, endpoint }) => {
    const [data, setData] = useState<any | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [queries, setQueries] = useState<[string,{[key: string]: string}][]>([]);

    const registerQuery = useCallback((name: string, query: {[key: string]: string}) => {
        setQueries((prevQueries) => {
            const newQueries = [...prevQueries];
            newQueries.push([name, query]);
            return newQueries;
        });
    }, []);

    useEffect(() => {
        if (Object.keys(queries).length > 0) {
            console.log('Updating Queries:', queries);
            const headers: { 'Content-Type': string } = {
                'Content-Type': 'application/json',
            };

            const isTokenSet = hasToken();
            
            const url = `${process.env.API_URL}${endpoint}`;
            const formBody = new URLSearchParams({ queries: JSON.stringify(queries) }).toString();
    
            fetch(url, {
                method: 'POST',
                headers: headers,
                body: formBody,
                credentials: isTokenSet ? 'include' : 'omit',
            })
            .then(response => {
                console.log('Response status:', response.status);
                console.log('Response headers:', response.headers);
                if (response.ok) {
                    return response.text().then(text => text ? JSON.parse(text) : {});
                } else {
                    throw new Error('Network response was not ok.');
                }
            })
            .then(fetchedData => {
                setData(fetchedData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
                setError(`${error}`);
            });
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
    registerQuery: (name: string, query: { [key: string]: string }) => void;
};

const DataContext = createContext<DataContextType<any> | undefined>(undefined);

export const useData = <T,>(): DataContextType<T> => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context as DataContextType<T>;
};

export const useRegisterQuery = (name: string, query: {[key: string]: string}) => {
    const { registerQuery } = useData();
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            console.log('Registering query:', name, query);
            registerQuery(name, query);
            hasRun.current = true;
        }
    }, [registerQuery, name, query]);
};