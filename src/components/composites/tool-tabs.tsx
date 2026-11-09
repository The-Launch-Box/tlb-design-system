import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ToolTabItem<T extends string> {
  value: T;
  label: ReactNode;
  /** Shown as a small pill after the label when defined. */
  count?: number;
  /** A lucide icon, sized by the trigger (`size-4`). */
  icon?: ReactNode;
}

interface ToolTabsProps<T extends string> {
  value: T;
  onValueChange: (value: T) => void;
  items: readonly ToolTabItem<T>[];
  /** Names the strip for assistive tech, e.g. "Cashflow view". */
  "aria-label": string;
  /** Right-hand slot on the same row: sync controls, a legend, a total. */
  children?: ReactNode;
  className?: string;
}

/**
 * The one tab strip for tool pages: Radix Tabs in the `line` variant, with an
 * optional count pill per tab. The caller keeps the active value in its own
 * state and renders the matching content below (no `TabsContent` here), so an
 * existing `switch (activeTab)` keeps working.
 *
 * A `value` that matches no item leaves every tab unselected, for a view that
 * lives outside the strip (e.g. settings opened from the page heading).
 */
function ToolTabs<T extends string>({
  value,
  onValueChange,
  items,
  "aria-label": ariaLabel,
  children,
  className,
}: ToolTabsProps<T>) {
  return (
    <Tabs
      value={value}
      onValueChange={(next) => onValueChange(next as T)}
      className={cn("border-b border-border pb-1", className)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList variant="line" aria-label={ariaLabel} className="flex-wrap">
          {items.map((item) => (
            <TabsTrigger key={item.value} value={item.value}>
              {item.icon}
              {item.label}
              {item.count !== undefined ? (
                <span
                  className={cn(
                    "rounded-full bg-muted px-1.5 font-mono text-xs tabular-nums text-muted-foreground",
                    "in-data-[state=active]:bg-primary/15 in-data-[state=active]:text-primary",
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </TabsTrigger>
          ))}
        </TabsList>
        {children ? <div className="flex flex-wrap items-center gap-2">{children}</div> : null}
      </div>
    </Tabs>
  );
}

export { ToolTabs };
export type { ToolTabItem, ToolTabsProps };
