import React, { useRef } from "react";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import { TooltipProvider } from "@/components/ui/tooltip.tsx";
import { BlockCopyButton } from "@/components/ui/block-copy-button.tsx";

export default function SimpleDialog({ title, message, quote, showDialog, setShowDialog }: { title: string, message: React.ReactNode, quote?: boolean, showDialog: boolean, setShowDialog: (show: boolean) => void }) {
    const textareaRef: React.RefObject<HTMLTextAreaElement> = useRef(null);

    return (
        <>
            {showDialog && <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader className='overflow-x-auto'>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                        <hr className="my-2" />
                        <div className="relative overflow-x-auto">
                            {quote ? (
                                <>
                                    <code ref={textareaRef} className="text-sm bg-secondary p-1">
                                        {message}
                                    </code>
                                    <TooltipProvider>
                                        <BlockCopyButton getText={() => textareaRef.current ? textareaRef.current.textContent ?? "" : ''} />
                                    </TooltipProvider>
                                </>
                            ) : (
                                message
                            )}
                        </div>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDialog(false)}>Dismiss</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>}
        </>
    );
}