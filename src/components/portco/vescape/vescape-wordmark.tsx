import * as React from "react";
import { cn } from "@/lib/utils";

function VEscapeWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-black uppercase italic tracking-tight", className)} {...props}>
      VEscape
    </span>
  );
}

export { VEscapeWordmark };
