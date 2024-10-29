import { useParams } from "react-router-dom";
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
import { useRef, useState } from "react";
import Cookies from 'js-cookie';
import { TooltipProvider } from "@/components/ui/tooltip";
import { BlockCopyButton } from "@/components/ui/block-copy-button";

export function LoginComponent() {
    const { data, loading, error } = useData<{ set_token: {success: boolean, message?: string} }>();
    const { token } = useParams<{ token: string }>();
    useRegisterQuery("set_token", {"token": token ?? ""});
    const [showDialog, setShowDialog] = useState(true);
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

    return (
        <LoadingWrapper
                loading={loading}
                error={data?.set_token?.message ?? data?.message ?? error}
                data={data?.set_token?.success ?? null}
                render={(success) => {
                    Cookies.set('lc_token_exists', '1');
                    return <>Logged in Successfully!</>
                }}
                renderError={(error) => 
                    <>
                    Login failed!
                    {showDialog && (
                            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                                <AlertDialogContent>
                                    <AlertDialogHeader className='overflow-hidden'>
                                        <AlertDialogTitle>Error</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Failed to set login token. Please try again, try a different login method, or contact support.
                                        </AlertDialogDescription>
                                        <hr className="my-2" />
                                        <div className="relative overflow-auto">
                                        <code ref={textareaRef} className="text-sm bg-secondary p-1">
                                        {error}
                                        </code>
                                        <TooltipProvider>
                                            <BlockCopyButton getText={() => textareaRef.current ? textareaRef.current.textContent ?? "" : ''} />
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
                }
            />
    )
}

export default function LoginPage() {
    return (
        <DataProvider endpoint="query">
            <LoginComponent />
        </DataProvider>
    );
}