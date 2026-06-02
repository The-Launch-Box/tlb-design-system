/**
 * Sparkline
 *
 * Tiny bar-chart spark for inline KPI use. Values are expected normalized
 * 0..1; the component scales them to a fixed pixel height. The trailing
 * bar is colored by direction (positive or negative) per TLB data-signal
 * rules; non-trailing bars use the muted-foreground token.
 *
 * For full charts use recharts. This composite is only for the dense
 * inline "is this going up or down" hint inside a KpiCard or table cell.
 *
 * @example
 *   <Sparkline values={[0.2, 0.3, 0.45, 0.4, 0.6, 0.55, 0.7, 0.85]} trend="up" />
 */
import { cn } from "@/lib/utils";

interface SparklineProps {
  values: number[];
  trend?: "up" | "down";
  height?: number;
  className?: string;
  ariaLabel?: string;
}

function Sparkline({
  values,
  trend = "up",
  height = 28,
  className,
  ariaLabel = "Trend sparkline",
}: SparklineProps) {
  const min = Math.min(8, height);
  return (
    <div
      data-slot="sparkline"
      role="img"
      aria-label={ariaLabel}
      className={cn("flex items-end gap-[2px]", className)}
      style={{ height }}
    >
      {values.map((v, i) => {
        const isLast = i === values.length - 1;
        const px = Math.max(min, Math.round(v * height));
        return (
          <span
            key={i}
            className={cn(
              "flex-1 rounded-[1px] bg-muted-foreground/40",
              isLast && trend === "up" && "bg-positive",
              isLast && trend === "down" && "bg-negative"
            )}
            style={{ height: px }}
          />
        );
      })}
    </div>
  );
}

export { Sparkline };
export type { SparklineProps };
