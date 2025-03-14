import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styles from './lazytooltip.module.css';
import {cn} from "../../lib/utils";
import { Button } from "@/components/ui/button";
import {X} from "lucide-react";

interface TooltipProps {
    children: ReactNode;
    content: () => ReactNode;
    delay?: number;
    lockTime?: number;
    unlockTime?: number;
    className?: string;
}

const LazyTooltip: React.FC<TooltipProps> = ({ children, content, delay = 500, lockTime = 1000, unlockTime = 1500, className = "" }) => {
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [lockTimestamp, setLockTimestamp] = useState<number | null>(null);
    const [locked, setLocked] = useState(false);
    const [reverse, setReverse] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const lockTimeoutRef = useRef<number | null>(null);
    const unlockTimeoutRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const textContentRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        setHovering(true);
        setReverse(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (unlockTimeoutRef.current) {
            clearTimeout(unlockTimeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => {
            setVisible(true);
            setHovering((prevHovering) => {
                if (prevHovering) {
                    const lockTimeEnd = Date.now() + lockTime;
                    setLockTimestamp(lockTimeEnd);
                    lockTimeoutRef.current = window.setTimeout(() => {
                        setLockTimestamp((prevLockTimestamp) => {
                            if (prevLockTimestamp === lockTimeEnd) {
                                setLocked(true);
                                return null;
                            }
                            return prevLockTimestamp;
                        });
                    }, lockTime);
                }
                return prevHovering;
            });
        }, delay);
    };

    const handleMouseLeave = () => {
        console.log("handleMouseLeave");
        setHovering(false);
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (lockTimeoutRef.current) {
            clearTimeout(lockTimeoutRef.current);
        }
        if (!locked) {
            setVisible(false);
            setLocked(false);
        } else {
            setReverse(true);
            unlockTimeoutRef.current = window.setTimeout(() => {
                setReverse(false);
                setHovering((prevHovering) => {
                    if (!prevHovering) {
                        setVisible(false);
                        setLockTimestamp(null);
                        setLocked(false);
                    }
                    return prevHovering;
                });
            }, unlockTime);
        }
    };


    // Handle clicks outside the container (closes)
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current &&
                !containerRef.current.contains(event.target as Node)) {
                // Close the tooltip when clicked outside
                setVisible(false);
                setLocked(false);
                setHovering(false);
                clearTimeout(timeoutRef.current!);
                clearTimeout(lockTimeoutRef.current!);
                clearTimeout(unlockTimeoutRef.current!);
            }
        };

        document.addEventListener(`mousedown`, handleClickOutside);
        return () => {
            document.removeEventListener(`mousedown`, handleClickOutside);
        };
    }, []);

    // like mouse enter, but skips the delays, and locks instantly
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (visible && textContentRef.current && textContentRef.current.contains(event.target as Node)) {
            // Tooltip is open; close it.
            setHovering(false);
            setVisible(false);
            setLocked(false);
            setLockTimestamp(null);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
            if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
        } else {
            // Tooltip is closed; open it.
            setHovering(true);
            setReverse(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (unlockTimeoutRef.current) {
                clearTimeout(unlockTimeoutRef.current);
            }
            setVisible(true);
            setLocked(true);
            setLockTimestamp(null);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
            if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current);
        };
    }, []);

    const renderProgressCircle = () => {
        if (!lockTimestamp && !reverse) return null;
        const duration = reverse ? unlockTime : lockTime;
        return (
            <div className="absolute bottom-0 right-0 mt-1 mr-1">
                <svg className="w-4 h-4 fill-slate-200 dark:fill-slate-900" viewBox="0 0 40 40">
                    <path
                        className="text-gray-200"
                        strokeDasharray="100, 100"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className={cn("text-blue-500", styles.tooltipCircle)}
                        style={{ animationDuration: `${duration}ms`, animationDirection: reverse ? 'reverse' : 'normal' }}
                        strokeDasharray="100, 100"
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
            </div>
        );
    };

    return (<div ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={cn(styles.tooltipContainer,className)}
        >
            <span ref={textContentRef}>{children}</span>
            {visible && (
                <div className={cn(styles.tooltipContent, "bg-secondary p-1 rounded-sm", locked ? "border-2 border-red-500/50" : "border-2 border-blue-500/50")}>
                    <Button
                        onClick={(e) => {
                            e.stopPropagation();
                            setVisible(false);
                            setLocked(false);
                            setHovering(false);
                        }}
                        variant="destructive" size="sm"
                        className="absolute top-0 right-0 p-1 text-red-500">
                        <X/>
                    </Button>
                    {content()}
                    {renderProgressCircle()}
                </div>
            )}
        </div>
    );
};

export default LazyTooltip;