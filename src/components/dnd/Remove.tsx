import React from 'react';

import { X } from 'lucide-react';
import {Button} from "../ui/button";

export function Remove(props: React.HTMLAttributes<HTMLButtonElement>) {
    return (
        <Button {...props} variant="outline" size="sm" className="p-0" asChild>
            <X />
        </Button>
    );
}