import LazyTooltip from "./LazyTooltip";
import React, {useCallback} from "react";
import CopyToClipboard from "./copytoclipboard";
import {formatTimeRelative} from "../../utils/StringUtil";
import {BlockCopyButton} from "./block-copy-button";
import { TooltipProvider } from "./tooltip";

export default function Timestamp({ millis }: { millis: number }) {
    const tsFunc = useCallback(() => {
        return <div className="pe-8">
            {new Date(millis).toLocaleString()}
            <TooltipProvider>
                <BlockCopyButton getText={() => "timestamp:" + millis}/>
            </TooltipProvider>
            </div>
    }, [millis]);
    return <>
        <LazyTooltip content={tsFunc} >
            <kbd>{formatTimeRelative(millis, 5)}</kbd>
        </LazyTooltip>
    </>
}