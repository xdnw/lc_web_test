import React, { Suspense, memo, useMemo } from "react";
import type { LucideProps } from "lucide-react";

type LazyIconProps = {
  name: string;
  size?: number;
  fallback?: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<SVGElement>) => void;
};

// Cache the module promise so it loads only once
const getLucideModule = (() => {
  let modulePromise: Promise<typeof import("lucide-react")>;
  return () => {
    if (!modulePromise) {
      modulePromise = import("lucide-react");
    }
    return modulePromise;
  };
})();

// Expose the preloader so it can be used elsewhere.
export const preloadIcons = getLucideModule;

export const IconPlaceholder = <svg width={22} height={22} />;
const IconPlaceholderSized = ({ size = 22, className }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} />
);

const LazyIcon: React.FC<LazyIconProps> = memo(
  ({ name, size = 22, className, fallback = <IconPlaceholderSized size={size} className={className} />, onClick }) => {
    const IconComponent = useMemo(
      () =>
        // Added a delay of 1 second for debugging purposes
        React.lazy(() =>
          getLucideModule().then((mod) => {
            const Icon = mod[name as keyof typeof mod] as React.ComponentType<LucideProps>;
            if (!Icon) {
              throw new Error(`Icon "${name}" not found in lucide-react.`);
            }
            return { default: Icon };
          })
        ),
      [name]
    );

    return (
      <Suspense fallback={fallback}>
        <IconComponent size={size} className={className} onClick={onClick} />
      </Suspense>
    );
  }
);

export default LazyIcon;