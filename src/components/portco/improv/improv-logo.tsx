/**
 * ImprovLogo
 *
 * Improv wordmark rendered as text inside an SVG so it inherits
 * `currentColor`. The official Improv mark is the word IMPROV
 * set in a bold sans, no separate icon glyph.
 *
 * @example
 *   <ImprovLogo className="h-8 text-[var(--color-improv-off-white)]" />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface ImprovLogoProps extends React.ComponentProps<"svg"> {}

function ImprovLogo({ className, ...props }: ImprovLogoProps) {
  return (
    <svg
      data-slot="improv-logo"
      viewBox="0 0 240 64"
      role="img"
      aria-label="Improv"
      className={cn("inline-block", className)}
      {...props}
    >
      <text
        x="0"
        y="48"
        fill="currentColor"
        style={{
          fontFamily:
            '"Work Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: "48px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
        }}
      >
        IMPROV
      </text>
    </svg>
  );
}

export { ImprovLogo };
