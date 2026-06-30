import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/** A dashed trail rule with a pin, evoking a map path. */
function BlueTrailTrailDivider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3 text-primary", className)} {...props}>
      <span className="h-0 flex-1 border-t-2 border-dashed border-primary" />
      <MapPin className="size-5" aria-hidden="true" />
      <span className="h-0 flex-1 border-t-2 border-dashed border-primary" />
    </div>
  );
}

export { BlueTrailTrailDivider };
