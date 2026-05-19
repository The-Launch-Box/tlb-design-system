/**
 * KpiCard
 *
 * Headline metric for a dashboard. Displays an uppercase label, a large
 * value, an optional delta (positive in TLB orange, negative in destructive),
 * and an optional lucide icon in the top-right corner.
 *
 * @example
 *   <KpiCard
 *     label="Cash on hand"
 *     value="$1.42M"
 *     delta={{ value: "+4.3% MoM", positive: true }}
 *     icon={Wallet}
 *   />
 */
import type { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive?: boolean };
  icon?: LucideIcon;
  className?: string;
}

function KpiCard({
  label,
  value,
  delta,
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
      </CardContent>
    </Card>
  );
}

export { KpiCard };
