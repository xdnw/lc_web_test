import {Link, useParams} from "react-router-dom";
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from '@/components/ui/alert-dialog';
import LoadingWrapper from "@/components/api/loadingwrapper";
import { DataProvider, useData, useRegisterQuery } from "@/components/cmd/DataContext";
import React, { useRef, useState } from "react";
import Cookies from 'js-cookie';
import { TooltipProvider } from "@/components/ui/tooltip";
import { BlockCopyButton } from "@/components/ui/block-copy-button";
import {clearStorage} from "@/utils/Auth.ts";
import {Button} from "@/components/ui/button.tsx";
import {SET_TOKEN} from "@/components/api/endpoints.tsx";
import {CopoToClipboardTextArea} from "../../components/ui/copytoclipboard";
import { useDialog } from "@/components/layout/DialogContext";

export function LoginComponent() {
    const { token } = useParams<{ token: string }>();
    const { showDialog } = useDialog();

    return SET_TOKEN.useDisplay({
        args: {"token": token ?? ""},
        render: (login) => {
            Cookies.set('lc_token_exists', '1');
            clearStorage('lc_session');
            return <>Logged in Successfully!<br/>
                <Button variant="outline" size="sm" className='border-slate-600' asChild>
                    <Link to={`${process.env.BASE_PATH}home`}>Return Home</Link></Button></>
        },
        renderError: (error) => {
            showDialog("Login Failed", <>
                Failed to set login token. Please try again, try a different login method, or contact support.
                <div className="relative overflow-auto">
                    <CopoToClipboardTextArea text={error}/>
                </div>
            </>, false);
            return (<>
                Login failed!
            </>);
        }
    });
}

export default function LoginPage() {
    return (
        <LoginComponent />
    );
}