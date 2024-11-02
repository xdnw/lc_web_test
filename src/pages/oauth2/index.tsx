import { DataProvider, useData, useRegisterQuery } from '@/components/cmd/DataContext';
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
import { useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BlockCopyButton } from '@/components/ui/block-copy-button';

interface OAuth2Data {
    success: boolean;
    message?: string;
}

export function OAuth2Component() {
    const { data, loading, error } = useData<OAuth2Data>();
    const fullUrl = window.location.href;
    const queryString = fullUrl.split('#')[0].split('?')[1] || '';
    const params = new URLSearchParams(queryString);
    const code = params.get("code");
    const queryId = useRegisterQuery("set_oauth_code", {"code": code ?? ""});
    const [showDialog, setShowDialog] = useState(true);
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

    console.log("OAuth2 code:", code);

    return (
        <LoadingWrapper
                index={queryId}
                loading={loading}
                error={error}
                data={data}
                render={(oauth2) => {
                    Cookies.set('lc_token_exists', '1');
                    Cookies.remove('lc_session');
                    return <>Logged in Successfully via OAuth2!</>
                }}
                renderError={(error) => 
                    <>
                    Login failed!
                    {showDialog && (
                            <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                                <AlertDialogContent>
                                    <AlertDialogHeader className='overflow-auto'>
                                        <AlertDialogTitle>Error</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Failed to set login OAuth2 Code. Please try again, try a different login method, or contact support.
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

export default function OAuth2Page() {
    return (
        <DataProvider endpoint="query">
            <OAuth2Component />
        </DataProvider>
    );
}