import * as React from "react";
import { cn } from "@/lib/utils";

/** The Hyperscayle "wink": a fast forward chevron, rendered in currentColor. */
function HyperscayleWink({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth={3} className={cn("size-6", className)} aria-hidden="true" {...props}>
      <path d="M4 4l10 8-10 8M16 4l10 8-10 8" strokeLinecap="square" />
    </svg>
  );
}

export { HyperscayleWink };
