import React, { useState } from 'react';
import { 
    AlertDialog, 
    AlertDialogContent, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogCancel 
} from '@/components/ui/alert-dialog';

const CopyToClipboard: React.FC<{ text: string }> = ({ text }) => {
    const [showDialog, setShowDialog] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            setShowDialog(true);
        });
    };

    return (
        <>
            <button 
                className='bg-secondary rounded px-0.5' 
                style={{ cursor: 'pointer' }}
                aria-label={`Copy ${text} to clipboard`}
                onClick={handleCopy}
            >
                {text}
            </button>
            {showDialog && (
                <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Copied to Clipboard</AlertDialogTitle>
                            <AlertDialogDescription>
                                The text <kbd className='bg-secondary rounded px-0.5'>{text}</kbd> has been copied to your clipboard.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setShowDialog(false)}>Dismiss</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </>
    );
};

export default CopyToClipboard;