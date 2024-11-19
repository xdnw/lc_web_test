import { useData, useRegisterQuery } from '@/components/cmd/DataContext';
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from '@/components/ui/alert-dialog';
import React, { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BlockCopyButton } from '@/components/ui/block-copy-button';
import {clearStorage} from "@/utils/Auth.ts";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {SET_OAUTH_CODE} from "@/components/api/endpoints.tsx";

export function OAuth2Component() {
    const fullUrl = window.location.href;
    const queryString = fullUrl.split('#')[0].split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    const code = params.get("code");
    const [showDialog, setShowDialog] = useState(true);
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

    return SET_OAUTH_CODE.useDisplay({
        args: {"code": code ?? ""},
        render: (oauth2) => {
            Cookies.set('lc_token_exists', '1');
            clearStorage('lc_session');
            return <>Logged in Successfully via OAuth2!<br/>
                <Button variant="outline" size="sm" className='border-slate-600' asChild>
                    <Link to={`${import.meta.env.BASE_URL}home`}>Return Home</Link></Button>
            </>
        },
        renderError: (error) =>
            <>
                Login failed!
                {showDialog && (
                    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                        <AlertDialogContent>
                            <AlertDialogHeader className='overflow-auto'>
                                <AlertDialogTitle>Error</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Failed to set login OAuth2 Code. Please try again, try a different login method, or
                                    contact support.
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

export default function OAuth2Page() {
    return (
        <OAuth2Component />
    );
}