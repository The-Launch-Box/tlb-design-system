/**
 * EchelonStatCallout
 *
 * Centered display-figure stat callout for trust-line strips
 * ("Awarded firm of the year", "X clients", etc). Reads loud
 * because the display family is condensed grotesk uppercase.
 *
 * Props
 *   - value: the headline figure or phrase (string or node)
 *   - label: short description below the value
 *
 * @example
 *   <EchelonStatCallout value="500+" label="Mid-market clients" />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface EchelonStatCalloutProps extends React.ComponentProps<"div"> {
  value: React.ReactNode;
  label: React.ReactNode;
}

function EchelonStatCallout({
  value,
  label,
  className,
  ...props
}: EchelonStatCalloutProps) {
  return (
    <div
      data-slot="echelon-stat-callout"
      className={cn(
        "flex flex-col items-center gap-2 border border-[var(--color-echelon-yellow)]/30 bg-card text-card-foreground p-6 text-center",
        className,
      )}
      {...props}
    >
      <div className="font-display text-5xl font-bold uppercase tracking-tight text-[var(--color-echelon-yellow)] md:text-6xl">
        {value}
      </div>
      <div className="font-sans text-xs uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );
}

export { EchelonStatCallout };
