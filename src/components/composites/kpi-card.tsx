/**
 * KpiCard
 *
 * Headline metric for a dashboard. Displays an uppercase label, a large
 * value, an optional delta (rendered via the Delta composite when given a
 * number, or as a plain string slot), an optional sparkline slot, and an
 * optional lucide icon in the top-right corner.
 *
 * @example
 *   <KpiCard
 *     label="Cash on hand"
 *     value="$1.42M"
 *     delta={{ value: "+4.3% MoM", positive: true }}
 *     icon={Wallet}
 *   />
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

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive?: boolean };
  sparkline?: React.ReactNode;
  icon?: LucideIcon;
  className?: string;
}

function KpiCard({
  label,
  value,
  delta,
  sparkline,
  icon: Icon,
  className,
}: KpiCardProps) {
  return (
    <Card data-slot="kpi-card" className={cn("relative", className)}>
      <CardContent className="px-6">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="font-display text-xs uppercase tracking-wide text-muted-foreground">
              {label}
            </p>
            <p className="font-display text-4xl leading-none text-foreground">
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
export type { KpiCardProps };
