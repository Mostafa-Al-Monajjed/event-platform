import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const NativeSelect = forwardRef<
  HTMLSelectElement,
  SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none transition-colors focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:opacity-50 dark:bg-input/30 [&>option]:bg-background [&>option]:text-foreground",
      className,
    )}
    {...props}
  />
));
NativeSelect.displayName = "NativeSelect";
