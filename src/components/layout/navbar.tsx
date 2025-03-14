import {ModeToggle} from "@/components/ui/mode-toggle.tsx";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import {hasToken} from "@/utils/Auth.ts";
import LoggedInDropdown from "@/components/layout/logged-in-dropdown.tsx";
import LoggedOutDropdown from "@/components/layout/logged-out-dropdown.tsx";
import { Input } from "../ui/input";

export default function Navbar() {
    const location = useLocation();
    const pathnames = decodeURI(location.pathname).split('/').filter(x => x);

    const isLoggedIn = hasToken();

    return (
        <nav className="bg-secondary border-bottom border-card flex flex-row items-center">
            <div className="inline-block">
                <ModeToggle/>
            </div>
            <div className="btn-group me-1">
                <div className="inline-block text-xs h-6 px-1 p-1 text-truncate bg-background rounded flex items-center justify-center">
                    {pathnames.length > 0 ? (
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
                    ) : (
                        <span>Home</span>
                    )}
                </div>
            </div>
            <div className="w-full p-0 flex items-center">
                <Input id="navbar-search" className="relative w-full form-control rounded border-background px-1"
                    type="search"
                    placeholder="Search pages..." aria-label="Search" name="term"/>
                <button type="submit" className="btn btn-light text-nowrap rounded-l-none">
                    <i className="bi bi-search"></i>
                </button>
            </div>
            <div className="p-0 ps-1 relative">
                {isLoggedIn ? (<LoggedInDropdown/>) : (<LoggedOutDropdown/>)}
            </div>
        </nav>
    );
}