/**
 * EchelonLogo
 *
 * Simplified Echelon brand mark. Two layouts:
 *   - EchelonLogoStacked  (icon over wordmark, sidebar / square uses)
 *   - EchelonLogoWordmark (horizontal lockup for nav bars / footers)
 *
 * Uses `currentColor` so it inherits foreground. The full glitch-
 * animated marketing logo from echeloncyber.com is out of scope for
 * this composite (animation deferred to pass 2). Drop in the official
 * SVG via `asset` import if needed for paid surfaces.
 *
 * @example
 *   <EchelonLogoStacked className="size-32 text-[var(--color-echelon-yellow)]" />
 *   <EchelonLogoWordmark className="h-6 text-[var(--color-echelon-yellow)]" />
 */
import * as React from "react";

import { cn } from "@/lib/utils";

interface LogoProps extends React.ComponentProps<"svg"> {}

/** The three slanted parallelograms that form Echelon's mark. */
function EchelonMarkGlyph(props: React.ComponentProps<"g">) {
  return (
    <g fill="currentColor" {...props}>
      <polygon points="20,8 60,8 52,22 12,22" />
      <polygon points="14,28 54,28 46,42 6,42" />
      <polygon points="8,48 48,48 40,62 0,62" />
    </g>
  );
}

function EchelonLogoStacked({ className, ...props }: LogoProps) {
  return (
    <svg
      data-slot="echelon-logo-stacked"
      viewBox="0 0 64 96"
      role="img"
      aria-label="Echelon Risk + Cyber"
      className={cn("inline-block", className)}
      {...props}
    >
      <EchelonMarkGlyph />
      <text
        x="32"
        y="78"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily:
            '"Barlow Condensed", "Oswald", "Arial Narrow", Impact, sans-serif',
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.12em",
        }}
      >
        ECHELON
      </text>
      <text
        x="32"
        y="90"
        textAnchor="middle"
        fill="currentColor"
        style={{
          fontFamily:
            '"Barlow Condensed", "Oswald", "Arial Narrow", Impact, sans-serif',
          fontSize: "8px",
          fontWeight: 500,
          letterSpacing: "0.15em",
        }}
      >
        RISK + CYBER
      </text>
    </svg>
  );
}

function EchelonLogoWordmark({ className, ...props }: LogoProps) {
  return (
    <svg
      data-slot="echelon-logo-wordmark"
      viewBox="0 0 320 64"
      role="img"
      aria-label="Echelon Risk + Cyber"
      className={cn("inline-block", className)}
      {...props}
    >
      <g transform="translate(0,0)">
        <EchelonMarkGlyph />
      </g>
      <text
        x="80"
        y="42"
        fill="currentColor"
        style={{
          fontFamily:
            '"Barlow Condensed", "Oswald", "Arial Narrow", Impact, sans-serif',
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        ECHELON
      </text>
      <text
        x="232"
        y="42"
        fill="currentColor"
        style={{
          fontFamily:
            '"Barlow Condensed", "Oswald", "Arial Narrow", Impact, sans-serif',
          fontSize: "20px",
          fontWeight: 500,
          letterSpacing: "0.12em",
        }}
      >
        RISK + CYBER
      </text>
    </svg>
  );
}

export { EchelonLogoStacked, EchelonLogoWordmark };
