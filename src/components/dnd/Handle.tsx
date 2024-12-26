import {ReactNode, forwardRef} from 'react';

import { Button } from '../ui/button';
import { Grip } from 'lucide-react';

interface HandleProps {
    children: ReactNode;
}

export const Handle = forwardRef<HTMLDivElement, HandleProps>(({children, ...props}, ref) => {
    return (
        <div
            ref={ref}
            data-cypress="draggable-handle"
            className="p-0 cursor-grab"
            {...props}
        >
            {children}
        </div>
    );
});