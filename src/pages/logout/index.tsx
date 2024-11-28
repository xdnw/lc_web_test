import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from '@/components/ui/alert-dialog';
import React, { useEffect, useRef, useState } from "react";
import { TooltipProvider } from '@/components/ui/tooltip';
import { BlockCopyButton } from '@/components/ui/block-copy-button';
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router-dom";
import {LOGOUT} from "@/components/api/endpoints.tsx";
import {CopoToClipboardTextArea} from "../../components/ui/copytoclipboard";
import {useDialog} from "../../components/layout/DialogContext";

export function LogoutComponent() {
    const { showDialog } = useDialog();

    useEffect(() => {
        // Clear localStorage
        window.localStorage.clear();

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            document.cookie = c
                .replace(/^ +/, "")
                .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
    }, []);

    return LOGOUT.useDisplay({
        args: {},
        render: (logout) => (
            <>Logged out Successfully!<br/>
                <Button variant="outline" size="sm" className='border-slate-600' asChild>
                    <Link to={`${import.meta.env.BASE_URL}home`}>Return Home</Link></Button></>
        ),
        renderError: (error) => {
            showDialog("Logout Failed", <>
                Failed to logout. Please try again, try a different login method, or contact support.
                <div className="relative overflow-auto">
                    <CopoToClipboardTextArea text={error}/>
                </div>
            </>, false);
            return (<>
                Logout failed!
            </>);
        }
    });
}

export default function LogoutPage() {
    return (
        <LogoutComponent />
    );
}