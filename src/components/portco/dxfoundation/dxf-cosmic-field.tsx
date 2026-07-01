import * as React from "react";
import { cn } from "@/lib/utils";

/** Soft pastel dotted field built from DXF tokens, for section backdrops. */
function DXFCosmicField({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[radial-gradient(circle_at_20%_30%,var(--color-dxf-violet),transparent_40%),radial-gradient(circle_at_80%_70%,var(--color-dxf-nebula),transparent_40%)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { DXFCosmicField };
