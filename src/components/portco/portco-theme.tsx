/**
 * PortcoTheme
 *
 * Scoped theme wrapper for TLB portfolio companies. Applies a
 * `data-portco` attribute that flips every CSS variable inside the
 * subtree to the portco's palette and typography. Every existing
 * shadcn primitive (Button, Card, Badge, Dialog, etc.) restyles
 * automatically without any per-component changes.
 *
 * Use for client-facing portco surfaces and portco-branded data
 * views inside TLB internal tools. Never wrap the TLB app shell.
 * See docs/12-portco-themes.md.
 *
 * @example
 *   <PortcoTheme portco="echelon">
 *     <EchelonHero ... />
 *     <Button>Get in touch</Button>
 *   </PortcoTheme>
 */
import * as React from "react";

import { cn } from "@/lib/utils";

type Portco =
  | "improv"
  | "echelon"
  | "hyperscayle"
  | "vescape"
  | "bluetrail"
  | "dxfoundation";

interface PortcoThemeProps extends React.ComponentProps<"div"> {
  portco: Portco;
}

function PortcoTheme({
  portco,
  className,
  children,
  ...props
}: PortcoThemeProps) {
  return (
    <div
      data-portco={portco}
      data-slot="portco-theme"
      className={cn(
        "bg-background text-foreground font-sans",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { PortcoTheme };
export type { Portco };
