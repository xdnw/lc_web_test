import React, {forwardRef, Ref} from 'react';

import {Handle} from '@/components/dnd/Handle';
import {Remove} from '@/components/dnd/Remove';
import {cn} from "../../lib/utils";

export interface ContainerProps {
    children: React.ReactNode;
    columns?: number;
    label?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
    hover?: boolean;
    handleProps?: React.HTMLAttributes<HTMLElement>;
    scrollable?: boolean;
    shadow?: boolean;
    placeholder?: boolean;
    unstyled?: boolean;
    onClick?(): void;
    onRemove?(): void;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
    (
        {
            children,
            columns = 1,
            handleProps,
            horizontal,
            hover,
            onClick,
            onRemove,
            label,
            placeholder,
            style,
            scrollable,
            shadow,
            unstyled,
            ...props
        }: ContainerProps,
        ref: Ref<HTMLDivElement>
    ) => {
        return (
            <div
                {...props}
                ref={ref}
                style={
                    {
                        ...style,
                        '--columns': columns,
                    } as React.CSSProperties
                }
                className={cn(
                    "relative flex flex-col overflow-hidden box-border appearance-none outline-none min-w-[350px] m-2 rounded min-h-[200px] transition-colors duration-350 bg-[rgba(246,246,246,1)] border border-[rgba(0,0,0,0.05)] text-base",
                    unstyled && "overflow-visible bg-transparent border-none",
                    horizontal && "w-full [&>ul]:grid-auto-flow-col",
                    hover && "bg-[rgb(235,235,235,1)]",
                    placeholder && "justify-center items-center cursor-pointer text-[rgba(0,0,0,0.5)] bg-transparent border-dashed border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.15)]",
                    scrollable && "[&>ul]:overflow-y-auto",
                    shadow && "shadow-[0_1px_10px_0_rgba(34,33,81,0.1)]",
                    onClick && "cursor-pointer"
                )}
                onClick={onClick?.bind(null)}
                tabIndex={onClick ? 0 : undefined}
            >
                {label ? (
                    <div
                        className="w-full p-1 flex items-center justify-between bg-white rounded-t border-b border-[rgba(0,0,0,0.08)]">
                        <Handle {...handleProps}
                                className={`${handleProps?.className || ''} w-full flex justify-between`}>
                            <span>{label}</span>
                        </Handle>
                        {onRemove && <Remove onClick={onRemove?.bind(null)}/>}
                    </div>
                ) : null}
                {placeholder ? children : <ul>{children}</ul>}
            </div>
        );
    }
);