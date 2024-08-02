import React, { ReactElement, ReactNode } from 'react';
import { ModeToggle } from '../ui/mode-toggle';
import { ThemeProvider } from '../ui/theme-provider';

export default function PageView({ children }: {children: ReactNode}): ReactElement {
  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <div className="p-1 min-h-screen themeBody">
    <ModeToggle />
        <div className="themeDiv bg-opacity-10 container mt-1 p-1">
    {children}
        </div>
    </div>
    </ThemeProvider>
    </>
  );
}