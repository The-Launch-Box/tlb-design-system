import * as React from "react";
import { cn } from "@/lib/utils";

function DXFWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-bold uppercase tracking-[0.15em]", className)} {...props}>
      DX Foundation
    </span>
  );
}

export { DXFWordmark };
