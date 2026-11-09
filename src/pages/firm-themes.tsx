import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { cn } from "@/lib/utils";
import { FIRM_THEMES, TLB_FIRM, applyFirmTheme, type FirmTheme } from "@/lib/firm-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolPage } from "@/components/composites/tool-page";
import { KpiCard } from "@/components/composites/kpi-card";

const SERIES = [
  { month: "Jul", a: 42, b: 30, c: 18, d: 12 },
  { month: "Aug", a: 48, b: 28, c: 22, d: 14 },
  { month: "Sep", a: 51, b: 33, c: 20, d: 17 },
  { month: "Oct", a: 57, b: 35, c: 26, d: 15 },
];

const CHART_SLOTS = ["chart-1", "chart-2", "chart-3", "chart-4"] as const;

/**
 * Firm themes, the TLB way: colours only. One call to applyFirmTheme() copies
 * a firm's --firm-<key>-* token set into the runtime slots, so buttons, focus
 * rings, the header tint, accent text and chart series all retint together.
 * Fonts, layout, components and the logo stay TLB's.
 */
export function FirmThemesPage() {
  const [firm, setFirm] = useState<FirmTheme>(TLB_FIRM);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    applyFirmTheme(firm, resolvedTheme !== "light");
  }, [firm, resolvedTheme]);

  // Leave the rest of the site on TLB.
  useEffect(() => () => applyFirmTheme(TLB_FIRM), []);

  return (
    <ToolPage
      title="Firm themes"
      description="Every firm uses the same TLB components and fonts. Only the colour tokens change."
    >
      <div role="group" aria-label="Active firm" className="flex flex-wrap gap-2">
        {FIRM_THEMES.map((f) => (
          <Button
            key={f.key}
            variant={f.key === firm.key ? "default" : "outline"}
            size="sm"
            aria-pressed={f.key === firm.key}
            onClick={() => setFirm(f)}
          >
            {f.displayName}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <KpiCard label="Active firm" value={firm.name} />
        <KpiCard label="Entity key" value={firm.key} />
        <KpiCard label="Theme" value={resolvedTheme === "light" ? "Light" : "Dark"} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>What retints</CardTitle>
          <CardDescription>
            Primary fill, focus ring, accent text, the header tint and the four chart series.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary action</Button>
            <Button variant="outline">Outline</Button>
            <span className="font-display text-2xl uppercase text-accent-ink">{firm.name}</span>
            <span className="rounded-md bg-accent-wash px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.06em] text-accent-ink">
              Accent wash
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {CHART_SLOTS.map((slot) => (
              <div key={slot} className="flex items-center gap-2">
                <span
                  className={cn(
                    "size-4 flex-none rounded-sm",
                    slot === "chart-1" && "bg-chart-1",
                    slot === "chart-2" && "bg-chart-2",
                    slot === "chart-3" && "bg-chart-3",
                    slot === "chart-4" && "bg-chart-4",
                  )}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-muted-foreground">--color-{slot}</span>
              </div>
            ))}
          </div>

          <div className="h-56" role="img" aria-label="Sample bar chart in the four firm chart colours">
            <BarChart width={640} height={224} data={SERIES} className="max-w-full">
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
              <Bar dataKey="a" fill="var(--color-chart-1)" />
              <Bar dataKey="b" fill="var(--color-chart-2)" />
              <Bar dataKey="c" fill="var(--color-chart-3)" />
              <Bar dataKey="d" fill="var(--color-chart-4)" />
            </BarChart>
          </div>
        </CardContent>
      </Card>
    </ToolPage>
  );
}
