/**
 * ToolLauncher
 *
 * Card-style tile for the dashboard "tools" grid: a leading icon chip,
 * a short title, a one-line description, and a meta + arrow row at the
 * bottom. Hover lifts the border to TLB orange and tints the icon chip
 * with the orange wash.
 *
 * The whole tile is one button so the keyboard target is a single tab
 * stop, not a click-anywhere div. Pass an `onClick` (or wrap in a Link
 * via `asChild`-style if needed downstream).
 *
 * @example
 *   <ToolLauncher
 *     icon={FileSpreadsheet}
 *     title="FX Settlement Sheet"
 *     description="Live pricing workbook for the macro FX desk."
 *     meta="Updated 2m ago"
 *     onClick={() => navigate("/sheets/fx")}
 *   />
 */
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ToolLauncherProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  meta?: string;
  onClick?: () => void;
  className?: string;
}

function ToolLauncher({
  icon: Icon,
  title,
  description,
  meta,
  onClick,
  className,
}: ToolLauncherProps) {
  return (
    <button
      type="button"
      data-slot="tool-launcher"
      onClick={onClick}
      className={cn(
        "group flex w-full flex-col rounded-md border border-border bg-card p-4 text-left",
        "transition-colors hover:border-primary hover:bg-bg-raised",
        "focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "mb-3 grid size-8 place-items-center rounded-sm border border-border bg-bg-raised text-primary",
          "group-hover:bg-accent-wash"
        )}
      >
        <Icon className="size-4" />
      </span>
      <span className="font-sans text-sm font-semibold text-foreground">
        {title}
      </span>
      {description ? (
        <span className="mt-1 font-sans text-xs leading-snug text-muted-foreground">
          {description}
        </span>
      ) : null}
      {meta ? (
        <span className="mt-3 flex items-center justify-between font-mono text-[11px] text-fg-faint">
          <span>{meta}</span>
          <ArrowRight
            className="size-3 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      ) : null}
    </button>
  );
}

export { ToolLauncher };
export type { ToolLauncherProps };
