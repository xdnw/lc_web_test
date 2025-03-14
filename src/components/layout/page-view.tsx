import { ReactElement, ReactNode } from 'react';
import { DataProvider } from '@/components/cmd/DataContext';
import { ThemeProvider } from '../ui/theme-provider';
import Navbar from "@/components/layout/navbar.tsx";
import Footer from "@/components/layout/footer.tsx";
import {DialogProvider} from "./DialogContext";
import { SessionProvider } from '../api/SessionContext';

export default function PageView({ children }: {children: ReactNode}): ReactElement {
    return (
        <>
            <DialogProvider>
            <DataProvider endpoint="query">
                <SessionProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <div className="min-h-screen themeBody">
                        <Navbar />
                        <div className="flex flex-col" style={{minHeight: 'calc(100vh - 245.5px)'}}>
                            <div className="mt-1 p-1 grow">
                                {children}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </ThemeProvider>
                </SessionProvider>
            </DataProvider>
            </DialogProvider>
        </>
    );
}