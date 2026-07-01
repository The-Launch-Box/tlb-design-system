import * as React from "react";
import { cn } from "@/lib/utils";

/** Full-bleed ignition gradient built from VEscape tokens (no hex). */
function VEscapeIgnitionPanel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(120deg,var(--color-vescape-purple),var(--color-vescape-magenta),var(--color-vescape-yellow))]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { VEscapeIgnitionPanel };
