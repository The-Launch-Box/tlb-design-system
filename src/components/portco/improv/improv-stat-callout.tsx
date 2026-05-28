/**
 * ImprovStatCallout
 *
 * Centered display-figure stat callout matching Improv's
 * "5/5 stars", "1,000+", "Millions" pattern. Large teal value
 * over a small body-color label.
 *
 * Props
 *   - value: the headline figure or phrase
 *   - label: short description below the value
 *
 * @example
 *   <ImprovStatCallout value="1,000+" label="Companies served" />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface ImprovStatCalloutProps extends React.ComponentProps<"div"> {
  value: React.ReactNode;
  label: React.ReactNode;
}

function ImprovStatCallout({
  value,
  label,
  className,
  ...props
}: ImprovStatCalloutProps) {
  return (
    <div
      data-slot="improv-stat-callout"
      className={cn("flex flex-col items-center gap-2 p-6 text-center", className)}
      {...props}
    >
      <div className="font-display text-5xl leading-none text-[var(--color-improv-teal)] md:text-6xl">
        {value}
      </div>
      <div className="font-sans text-base text-[var(--color-improv-off-white)]/90">
        {label}
      </div>
    </div>
  );
}

export { ImprovStatCallout };
