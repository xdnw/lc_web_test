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
import { useEffect, useRef, useState } from "react";
import { TooltipProvider } from '@/components/ui/tooltip';
import { BlockCopyButton } from '@/components/ui/block-copy-button';

interface LogoutData {
    success: boolean;
    message?: string;
}

export function LogoutComponent() {
    const { data, loading, error } = useData<LogoutData>();
    const queryId = useRegisterQuery("logout", {});
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

    return (
        <LoadingWrapper
                index={queryId}
                loading={loading}
                error={error}
                data={data}
                render={(logout) => (
                    <>Logged out Successfully!</>
                )}
                renderError={(error) => 
                    <>
                    Login failed!
                    {showDialog && (
                            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                                <AlertDialogContent>
                                    <AlertDialogHeader className='overflow-auto'>
                                        <AlertDialogTitle>Error</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Failed to logout. Please try again, try a different login method, or contact support.
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

export default function LogoutPage() {
    return (
        <DataProvider endpoint="query">
            <LogoutComponent />
        </DataProvider>
    );
}