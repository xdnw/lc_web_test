import {ModeToggle} from "@/components/ui/mode-toggle.tsx";
import React, { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import {hasToken} from "@/utils/Auth.ts";
import LoggedInDropdown from "@/components/layout/logged-in-dropdown.tsx";
import LoggedOutDropdown from "@/components/layout/logged-out-dropdown.tsx";
import { Input } from "../ui/input";
import { useDeepState } from "@/utils/StateUtil";

const SearchBar = React.memo(() => (
    <div className="w-full p-0 flex items-center">
      <Input 
        id="navbar-search" 
        className="relative w-full form-control rounded border-background px-1"
        type="search"
        placeholder="Search pages..." 
        aria-label="Search" 
        name="term"
      />
      <button type="submit" className="btn btn-light text-nowrap rounded-l-none">
        <i className="bi bi-search"></i>
      </button>
    </div>
  ));

export default function Navbar() {
    const location = useLocation();
    
    // Memoize pathnames array to prevent unnecessary recalculations
    const pathnames = useMemo(() => 
        decodeURI(location.pathname).split('/').filter(x => x),
        [location.pathname]
    );

    // Memoize login status to avoid rechecking on every render
    const isLoggedIn = useMemo(() => hasToken(), []);
    
    // Memoize breadcrumbs to prevent recreating on every render
    const breadcrumbs = useMemo(() => {
        if (pathnames.length === 0) {
            return <span>Home</span>;
        }
        
        return (
            <>
                <Link to="/" className="text-blue-600 hover:text-blue-800 underline">[index]</Link>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    return (
                        <React.Fragment key={to}>
                            <span className="mx-1">/</span>
                            <Link to={to} className="text-blue-600 hover:text-blue-800 underline">{value}</Link>
                        </React.Fragment>
                    );
                })}
            </>
        );
    }, [pathnames]);
    
    // Memoize the user dropdown component
    const userDropdown = useMemo(() => 
        isLoggedIn ? <LoggedInDropdown /> : <LoggedOutDropdown />,
        [isLoggedIn]
    );

    const modeToggle = useMemo(() => <ModeToggle />, []);

    return (
        <nav className="bg-secondary border-bottom border-card flex flex-row items-center">
            <div className="inline-block">
                {modeToggle}
            </div>
            <div className="btn-group me-1">
                <div className="inline-block text-xs h-6 px-1 p-1 text-truncate bg-background rounded flex items-center justify-center">
                    {breadcrumbs}
                </div>
            </div>
            <SearchBar />
            <div className="p-0 ps-1 relative">
                {userDropdown}
            </div>
        </nav>
    );
}