/**
 * ChartTooltip
 *
 * Drop-in tooltip content for recharts charts: monospace card, themed colors,
 * one line per series. Pass via `<Tooltip content={<ChartTooltip />} />` and
 * recharts injects `active`, `payload`, and `label` at runtime.
 *
 * Supply `format` to render currency, percent, or other domain-specific
 * values without coupling the registry to a value formatter.
 *
 * @example
 *   <Tooltip content={<ChartTooltip />} />
 *   <Tooltip content={<ChartTooltip format={(v) => formatCurrency(v)} />} />
 */
import { cn } from "@/lib/utils";

interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string | number;
  format?: (value: number | string) => string;
  className?: string;
}

function ChartTooltip({
  active,
  payload,
  label,
  format = (v) => String(v),
  className,
}: ChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      data-slot="chart-tooltip"
      className={cn(
        "rounded-md border border-border bg-background px-3 py-2 font-mono",
        className
      )}
    >
      {label !== undefined ? (
        <div className="mb-1 text-[11px] text-muted-foreground">{label}</div>
      ) : null}
      {payload.map((item, i) => (
        <div key={i} className="text-xs text-primary">
          {item.name ? `${item.name}: ` : null}
          <span className="font-semibold text-foreground">
            {item.value !== undefined ? format(item.value) : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

export { ChartTooltip };
