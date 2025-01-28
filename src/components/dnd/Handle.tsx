import {ReactNode, forwardRef} from 'react';
import { cn } from "@/lib/utils"

interface HandleProps {
    children: ReactNode;
    className?: string;
}

export const Handle = forwardRef<HTMLDivElement, HandleProps>(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            data-cypress="draggable-handle"
            className={cn("p-0 cursor-grab", className)}
            {...props}
        >
            {children}
        </div>
    );
});