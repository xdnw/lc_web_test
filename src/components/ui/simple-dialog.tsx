import React from "react";
import {
    AlertDialog, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";
import {CopoToClipboardTextArea} from "./copytoclipboard";

export default function SimpleDialog({ title, message, quote, showDialog, setShowDialog }: { title: string, message: React.ReactNode, quote?: boolean, showDialog: boolean, setShowDialog: (show: boolean) => void }) {
    return (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
            <AlertDialogContent>
                <AlertDialogHeader className='overflow-x-auto'>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription></AlertDialogDescription>
                    <hr className="my-2" />
                    <div className="relative overflow-x-auto">
                        {quote ? (
                            <>
                                <CopoToClipboardTextArea text={message} />
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
        </AlertDialog>
    );
}