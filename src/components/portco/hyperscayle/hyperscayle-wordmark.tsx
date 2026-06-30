import * as React from "react";
import { cn } from "@/lib/utils";

function HyperscayleWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-bold uppercase tracking-tight", className)} {...props}>
      Hyperscayle
    </span>
  );
}

export { HyperscayleWordmark };
