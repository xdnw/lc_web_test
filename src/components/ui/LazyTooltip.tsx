import React, { useState, useEffect, useRef, ReactNode } from 'react';
import styles from './lazytooltip.module.css';
import {cn} from "../../lib/utils";

interface TooltipProps {
    children: ReactNode;
    content: () => ReactNode;
    delay?: number;
    lockTime?: number;
    unlockTime?: number;
    className?: string;
}

const LazyTooltip: React.FC<TooltipProps> = ({ children, content, delay = 500, lockTime = 1000, unlockTime = 500, className = "" }) => {
    const [visible, setVisible] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [lockTimestamp, setLockTimestamp] = useState<number | null>(null);
    const [locked, setLocked] = useState(false);
    const [reverse, setReverse] = useState(false);
    const timeoutRef = useRef<number | null>(null);
    const lockTimeoutRef = useRef<number | null>(null);
    const unlockTimeoutRef = useRef<number | null>(null);

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

    // like mouse enter, but skips the delays, and locks instantly
    const handleClick = () => {
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

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (lockTimeoutRef.current) {
                clearTimeout(lockTimeoutRef.current);
            }
            if (unlockTimeoutRef.current) {
                clearTimeout(unlockTimeoutRef.current);
            }
        };
    }, []);

    const renderProgressCircle = () => {
        if (!lockTimestamp && !reverse) return null;
        const duration = reverse ? unlockTime : lockTime;
        return (
            <div className="absolute top-0 right-0 mt-1 mr-1">
                <svg className="w-4 h-4" viewBox="0 0 36 36">
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

    return (<div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className={cn(styles.tooltipContainer,className)}
        >
            {children}
            {visible && (
                <div className={cn(styles.tooltipContent, "bg-secondary p-2 rounded-sm", locked ? "border-2 border-red-500/50" : "border-2 border-blue-500/50")}>
                    {content()}
                    {renderProgressCircle()}
                </div>
            )}
        </div>
    );
};

export default LazyTooltip;