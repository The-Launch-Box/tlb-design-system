/**
 * EchelonMarker
 *
 * Inline highlighter for Echelon's signature yellow-on-blue marker
 * treatment. Wraps text fragments inside a heading or paragraph so
 * the acid yellow sits behind the words like a brand pen stroke.
 *
 * Tokens, not hex: bg uses --color-echelon-yellow, text uses
 * --color-echelon-blue. Both are defined under [data-portco="echelon"].
 *
 * @example
 *   <h1>Security and privacy are basic human rights.{" "}
 *     <EchelonMarker>We are built to protect them.</EchelonMarker>
 *   </h1>
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface EchelonMarkerProps extends React.ComponentProps<"mark"> {}

function EchelonMarker({ className, children, ...props }: EchelonMarkerProps) {
  return (
    <mark
      data-slot="echelon-marker"
      className={cn(
        "bg-[var(--color-echelon-yellow)] text-[var(--color-echelon-blue)] px-1.5 py-0.5",
        className,
      )}
      {...props}
    >
      {children}
    </mark>
  );
}

export { EchelonMarker };
