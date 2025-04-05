import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const isDevelopment = import.meta.env.MODE === 'development';
const queryClient = new QueryClient();

// Create a persister that uses localStorage
const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
});

// Persist queries with a maxAge (e.g., one day)
persistQueryClient({
    queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 * 24 * 30,  // 30 days
    // TODO FIXME add caching by endpoint cache mode
    //   dehydrateOptions: { 
    //     shouldDehydrateQuery: (query) => {
    //         // Only persist queries whose key includes 'persist'
    //         return query.queryKey.some(key => typeof key === 'string' && key.includes('persist'));
    //     },
    // },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    isDevelopment ? (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </React.StrictMode>
    ) : (
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    )
)