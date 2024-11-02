import {ModeToggle} from "@/components/ui/mode-toggle.tsx";
import React from "react";
import { useLocation, Link } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const pathnames = decodeURI(location.pathname).split('/').filter(x => x);

    return (
        <div className="w-full h-8 m-0 p-0 bg-secondary">
            <ModeToggle/>
            <span className="ps-2">
                {pathnames.length > 0 ? (
                    <>
                            <Link to="/" className="text-blue-600 hover:text-blue-800 underline">[index]</Link>
                            {pathnames.map((value, index) => {
                                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                                return (
                                    <>
                                        <span className="mx-1">/</span>
                                        <Link to={to} className="text-blue-600 hover:text-blue-800 underline">{value}</Link>
                                    </>
                                );
                            })}
                    </>
                ) : (
                    <span>Home</span>
                )}
            </span>
        </div>
    );
}