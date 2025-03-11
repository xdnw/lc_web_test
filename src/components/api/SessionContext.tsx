import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect, useCallback } from 'react';
import { SESSION } from '@/components/api/endpoints.tsx';
import { WebSession } from './apitypes';
import {useData, useRegisterQuery} from "../cmd/DataContext";
import { deepEqual } from '@/lib/utils';

interface SessionContextProps {
    session: WebSession | null;
    error: string | null;
    setSession: (session: WebSession | null) => void;
    setError: (error: string | null) => void;
    refetchSession: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

const useSessionDisplay = () => {
    const [session, setSession] = useState<WebSession | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [queryId] = useRegisterQuery(SESSION.endpoint.name, {}, SESSION.endpoint.cache);
    const { queries, refetchQueries } = useData<WebSession>();

    useEffect(() => {
        const query = queries && queries.length > queryId ? queries[queryId] : null;
        if (query && query.data && !deepEqual(query.data, session)) {
            setSession(query.data);
        }
    }, [queries, queryId, session]);

    useEffect(() => {
        const query = queries && queries.length > queryId ? queries[queryId] : null;
        if (query && query.error !== error) {
            setError((query.error as string) ?? null);
        }
    }, [queries, error, setError]);

    const refetchSession = useCallback(() => {
        refetchQueries([queryId]);
    }, [queryId, refetchQueries]);

    return { session, error, setSession, setError, refetchSession };
};

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const { session, error, setSession, setError, refetchSession } = useSessionDisplay();
    return (
        <>
            <SessionContext.Provider value={{ session, error, setSession, setError, refetchSession }}>
                {children}
            </SessionContext.Provider>
        </>
    );
};

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
};