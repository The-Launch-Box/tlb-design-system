/**
 * KpiCard
 *
 * Headline metric for a dashboard. Displays an uppercase label, a large
 * value, an optional delta (rendered via the Delta composite when given a
 * number, or as a plain string slot), an optional sparkline slot, and an
 * optional lucide icon in the top-right corner.
 *
 * `tone` adds a status pip beside the label (warning, info, negative,
 * positive, neutral); `emphasis` sets the figure in the primary color for a
 * count that waits on the reader. Both come from the Echelon Automation Hub
 * console (2026-11). The label always carries the meaning; the pip is
 * decoration and hidden from assistive tech.
 *
 * @example
 *   <KpiCard
 *     label="Cash on hand"
 *     value="$1.42M"
 *     delta={{ value: "+4.3% MoM", positive: true }}
 *     icon={Wallet}
 *   />
 *
 *   <KpiCard label="Awaiting review" value={4} icon={Hourglass} tone="warning" emphasis />
 *
 *   <KpiCard
 *     label="Net P&L (today)"
 *     value="+$104.3K"
 *     sparkline={<Sparkline values={[0.3,0.45,0.4,0.6,0.55,0.7,0.85]} />}
 *   />
 */
import * as React from "react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type KpiTone = "warning" | "info" | "negative" | "positive" | "neutral";

const TONE_TEXT: Record<KpiTone, string> = {
  warning: "text-warning",
  info: "text-info",
  negative: "text-negative",
  positive: "text-positive",
  neutral: "text-fg-faint",
};

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive?: boolean };
  sparkline?: React.ReactNode;
  icon?: LucideIcon;
  /** Status pip beside the label. Omit for no pip. */
  tone?: KpiTone;
  /** Set the figure in the primary color: this count is waiting on the reader. */
  emphasis?: boolean;
  className?: string;
}

function KpiCard({
  label,
  value,
  delta,
  sparkline,
  icon: Icon,
  tone,
  emphasis = false,
  className,
}: KpiCardProps) {
  return (
    <Card data-slot="kpi-card" className={cn("relative", className)}>
      <CardContent className="px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="flex items-center gap-2 font-display text-xs uppercase tracking-wide text-muted-foreground">
              {tone ? <span className={cn("pip", TONE_TEXT[tone])} aria-hidden="true" /> : null}
              {label}
            </p>
            <p
              className={cn(
                "font-display text-4xl leading-none",
                emphasis ? "text-primary" : "text-foreground",
              )}
            >
              {value}
            </p>
          </div>
          {Icon ? <Icon className="size-5 text-muted-foreground" /> : null}
        </div>
        {delta ? (
          <p
            className={cn(
              "mt-3 font-sans text-xs",
              delta.positive ? "text-tlb-orange" : "text-destructive"
            )}
          >
            {delta.value}
          </p>
        ) : null}
        {sparkline ? <div className="mt-3">{sparkline}</div> : null}
      </CardContent>
    </Card>
  );
}

export { KpiCard };
export type { KpiCardProps, KpiTone };
