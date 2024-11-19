import React, { ReactElement, ReactNode } from 'react';
import { DataProvider } from '@/components/cmd/DataContext';
import { ThemeProvider } from '../ui/theme-provider';
import Navbar from "@/components/layout/navbar.tsx";
import Footer from "@/components/layout/footer.tsx";

export default function PageView({ children }: {children: ReactNode}): ReactElement {
    return (
        <>
            <DataProvider endpoint="query">
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <div className="min-h-screen themeBody">
                        <Navbar />
                        <div className="flex flex-col" style={{minHeight: 'calc(100vh - 245.5px)'}}>
                            <div className="themeDiv bg-opacity-10 container mt-1 p-1 flex-grow">
                                {children}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
            </DataProvider>
        </>
    );
}