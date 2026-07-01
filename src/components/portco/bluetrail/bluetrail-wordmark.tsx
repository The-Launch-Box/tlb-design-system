import * as React from "react";
import { cn } from "@/lib/utils";

function BlueTrailWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-extrabold tracking-tight", className)} {...props}>
      Blue Trail
    </span>
  );
}

export { BlueTrailWordmark };
