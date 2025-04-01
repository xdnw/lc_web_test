import * as React from "react";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: TooltipPosition;
  triggerElement: HTMLElement | null;
  setTriggerElement: (element: HTMLElement | null) => void;
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined);

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ 
  children,
  delayDuration = 700,
  skipDelayDuration = 300
}) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
  position?: TooltipPosition;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  position = "top" 
}) => {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const [triggerElement, setTriggerElement] = React.useState<HTMLElement | null>(null);
  
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  
  const setOpen = React.useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
    if (onOpenChange) {
      const newValue = typeof value === "function" ? value(open) : value;
      onOpenChange(newValue);
    }
  }, [isControlled, onOpenChange, open]);

  return (
    <TooltipContext.Provider value={{ 
      open, 
      setOpen, 
      position, 
      triggerElement, 
      setTriggerElement 
    }}>
      {children}
    </TooltipContext.Provider>
  );
};

const useTooltipContext = () => {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip");
  }
  return context;
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

// Wrapper approach instead of cloneElement
const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild = false, children, ...props }, forwardedRef) => {
    const { setOpen, setTriggerElement } = useTooltipContext();
    
    const handlePointerEnter = React.useCallback((e: React.PointerEvent<HTMLElement>) => {
      setOpen(true);
      props.onPointerEnter?.(e);
    }, [props, setOpen]);
    
    const handlePointerLeave = React.useCallback((e: React.PointerEvent<HTMLElement>) => {
      setOpen(false);
      props.onPointerLeave?.(e);
    }, [props, setOpen]);
    
    // Create a single ref callback
    const refCallback = React.useCallback((node: HTMLElement | null) => {
      setTriggerElement(node);
      
      if (typeof forwardedRef === "function") {
        forwardedRef(node);
      }
    }, [setTriggerElement, forwardedRef]);

    // For asChild, we use a wrapper div instead of cloneElement
    if (asChild) {
      return (
        <div 
          ref={refCallback} 
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          style={{ display: 'inline-block' }}
        >
          {children}
        </div>
      );
    }

    // Regular case
    return (
      <span
        ref={refCallback}
        {...props}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </span>
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  sideOffset?: number;
  className?: string;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, sideOffset = 4, ...props }, ref) => {
    const { open, position, triggerElement } = useTooltipContext();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [style, setStyle] = React.useState<React.CSSProperties>({
      position: 'absolute',
      visibility: 'hidden'
    });
    
    // Handle mounting/unmounting based on open state
    React.useEffect(() => {
      if (open) {
        setMounted(true);
      } else {
        setVisible(false);
        const timeout = setTimeout(() => {
          setMounted(false);
        }, 150);
        return () => clearTimeout(timeout);
      }
    }, [open]);
    
    // Calculate position after mounting
    React.useEffect(() => {
      if (!mounted || !contentRef.current || !triggerElement) return;
      
      const updatePosition = () => {
        const triggerRect = triggerElement.getBoundingClientRect();
        const contentRect = contentRef.current?.getBoundingClientRect();
        
        if (!contentRect) return;
        
        let top = 0;
        let left = 0;

        switch (position) {
          case "top":
            top = triggerRect.top - contentRect.height - sideOffset;
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
            break;
          case "bottom":
            top = triggerRect.bottom + sideOffset;
            left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
            break;
          case "left":
            top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
            left = triggerRect.left - contentRect.width - sideOffset;
            break;
          case "right":
            top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
            left = triggerRect.right + sideOffset;
            break;
        }

        // Adjust for viewport edges
        const rightEdgeDistance = window.innerWidth - (left + contentRect.width);
        if (rightEdgeDistance < 0) left += rightEdgeDistance - 5;
        if (left < 5) left = 5;

        // Account for scroll position
        top += window.scrollY;
        left += window.scrollX;
        
        setStyle({
          position: 'absolute',
          top,
          left,
          visibility: 'visible'
        });
        
        setVisible(true);
      };
      
      updatePosition();
      
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
      
      return () => {
        window.removeEventListener('resize', updatePosition);
        window.removeEventListener('scroll', updatePosition);
      };
    }, [mounted, position, sideOffset, triggerElement]);
    
    // Safe ref forwarding in useEffect
    React.useEffect(() => {
      if (ref && contentRef.current) {
        if (typeof ref === 'function') {
          ref(contentRef.current);
        }
      }
    }, [ref]);

    if (!mounted) return null;

    return (
      <div
        ref={contentRef}
        role="tooltip"
        style={style}
        className={cn(
          "z-50 overflow-hidden border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
          visible ? "opacity-100" : "opacity-0",
          "transition-opacity duration-150",
          {
            "slide-in-from-bottom-2": position === "top",
            "slide-in-from-top-2": position === "bottom",
            "slide-in-from-right-2": position === "left",
            "slide-in-from-left-2": position === "right",
          },
          className
        )}
        {...props}
      />
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };