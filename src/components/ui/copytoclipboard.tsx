import {ReactNode, useRef} from 'react';
import {TooltipProvider} from "./tooltip";
import {BlockCopyButton} from "./block-copy-button";
import {useDialog} from "../layout/DialogContext";

export default function CopyToClipboard({ text, className}: { text: string, className?: string }) {
    const { showDialog } = useDialog();

    const handleCopy = () => {
        navigator.clipboard.writeText(text).then(() => {
            showDialog("Copied to Clipboard", <>The text <kbd className='bg-secondary rounded px-0.5'>{text}</kbd> has been copied to your clipboard.</>);
        });
    };

    return (
        <>
            <button
                className={`bg-secondary rounded px-0.5 ${className}`}
                style={{ cursor: 'pointer' }}
                aria-label={`Copy ${text} to clipboard`}
                onClick={handleCopy}
            >
                {text}
            </button>

        </>
    );
}

export function CopoToClipboardTextArea({ text, className }: { text: ReactNode, className?: string }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    return (
        <>
            <div className="relative overflow-auto">
                <code ref={textareaRef} className={`text-sm bg-secondary p-1 ${className}`}>
                    {text}
                </code>
                <TooltipProvider>
                    <BlockCopyButton
                        getText={() => textareaRef.current ? textareaRef.current.textContent ?? "" : ''}/>
                </TooltipProvider>
            </div>
        </>
    );
}