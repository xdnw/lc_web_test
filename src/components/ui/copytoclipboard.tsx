import React, { useState } from 'react';
import SimpleDialog from "@/components/ui/simple-dialog.tsx";

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
            <SimpleDialog title={"Copied to Clipboard"} quote={false} message={<>The text <kbd className='bg-secondary rounded px-0.5'>{text}</kbd> has been copied to your clipboard.</>} showDialog={showDialog} setShowDialog={setShowDialog} />
        </>
    );
};

export default CopyToClipboard;