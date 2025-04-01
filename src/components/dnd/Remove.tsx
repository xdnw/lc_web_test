import React from 'react';

import {Button} from "../ui/button";
import LazyIcon from '../ui/LazyIcon';

export function Remove(props: React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <Button {...props} variant="outline" size="sm" className="p-0" asChild>
            <LazyIcon name="X" />
        </Button>
    );
}