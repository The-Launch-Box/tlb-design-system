/**
 * Delta
 *
 * Formatted change indicator for financial UIs. Renders the value with a
 * leading direction marker (▲ + for positive, ▼ − for negative), forced
 * absolute value, configurable decimals, and the suffix of your choice
 * (defaults to "%"). Always mono + tabular-nums so columns align.
 *
 * The component derives its sign from the numeric value, so callers do
 * not need to pass an extra `positive` flag.
 *
 * @example
 *   <Delta value={1.24} />          // "▲ +1.24%"
 *   <Delta value={-0.83} suffix="" decimals={2} />  // "▼ −0.83"
 */
import { cn } from "@/lib/utils";

interface DeltaProps {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}

function Delta({
  value,
  suffix = "%",
  decimals = 2,
  className,
}: DeltaProps) {
  const positive = value >= 0;
  const marker = positive ? "▲ +" : "▼ −";
  const magnitude = Math.abs(value).toFixed(decimals);
  return (
    <span
      data-slot="delta"
      data-direction={positive ? "up" : "down"}
      className={cn(
        "inline-flex items-center gap-1 font-mono text-xs font-semibold tabular-nums",
        positive ? "text-positive" : "text-negative",
        className
      )}
    >
      {marker}
      {magnitude}
      {suffix}
    </span>
  );
}

export { Delta };
export type { DeltaProps };
