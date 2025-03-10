import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const isDevelopment = import.meta.env.MODE === 'development';

ReactDOM.createRoot(document.getElementById('root')!).render(
    isDevelopment && false ? (
        <React.StrictMode>
            <App />
        </React.StrictMode>
    ) : (
        <App />
    )
)