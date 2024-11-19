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

export function LogoutComponent() {
    const [showDialog, setShowDialog] = useState(true);
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

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
        renderError: (error) =>
            <>
                Logout failed!
                {showDialog && (
                    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader className='overflow-auto'>
                                <AlertDialogTitle>Error</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Failed to logout. Please try again, try a different login method, or contact
                                    support.
                                </AlertDialogDescription>
                                <hr className="my-2"/>
                                <div className="relative overflow-auto">
                                    <code ref={textareaRef} className="text-sm bg-secondary p-1">
                                        {error}
                                    </code>
                                    <TooltipProvider>
                                        <BlockCopyButton
                                            getText={() => textareaRef.current ? textareaRef.current.textContent ?? "" : ''}/>
                                    </TooltipProvider>
                                </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setShowDialog(false)}>Dismiss</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </>
    });
}

export default function LogoutPage() {
    return (
        <LogoutComponent />
    );
}