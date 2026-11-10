import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ColumnDef } from "@tanstack/react-table";
import { Calculator, CalendarClock, Flame, Loader2, TrendingUp, Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { Area, AreaChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { toast } from "sonner";

import { AppShell } from "@/components/composites/app-shell";
import { AppSwitcher } from "@/components/composites/app-switcher";
import { ChartTooltip } from "@/components/composites/chart-tooltip";
import { DataTable } from "@/components/composites/data-table";
import { EmptyState } from "@/components/composites/empty-state";
import { KpiCard } from "@/components/composites/kpi-card";
import { Notice } from "@/components/composites/notice";
import { ThemeToggle } from "@/components/composites/theme-toggle";
import { ToolPage } from "@/components/composites/tool-page";
import { ToolTabs } from "@/components/composites/tool-tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { runwaySchema, type RunwayFormValues, type RunwayInputs } from "@/schemas/runway";

const HORIZON = 18;

interface MonthRow {
  month: number;
  label: string;
  revenue: number;
  burn: number;
  net: number;
  cash: number;
}

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function project(inputs: RunwayInputs): MonthRow[] {
  const rows: MonthRow[] = [];
  let cash = inputs.cash;
  let revenue = inputs.revenue;
  const start = new Date();
  for (let m = 1; m <= HORIZON; m += 1) {
    revenue = revenue * (1 + inputs.growth / 100);
    const net = revenue - inputs.burn;
    cash += net;
    const d = new Date(start.getFullYear(), start.getMonth() + m, 1);
    rows.push({
      month: m,
      label: new Intl.DateTimeFormat("en-US", { month: "short", year: "2-digit" }).format(d),
      revenue,
      burn: inputs.burn,
      net,
      cash,
    });
  }
  return rows;
}

const columns: ColumnDef<MonthRow>[] = [
  { accessorKey: "label", header: "Month" },
  { accessorKey: "revenue", header: "Revenue", cell: ({ getValue }) => <span className="font-mono">{usd.format(getValue<number>())}</span> },
  { accessorKey: "burn", header: "Burn", cell: ({ getValue }) => <span className="font-mono">{usd.format(getValue<number>())}</span> },
  {
    accessorKey: "net",
    header: "Net",
    cell: ({ getValue }) => {
      const v = getValue<number>();
      return <span className={v < 0 ? "font-mono text-negative" : "font-mono text-positive"}>{usd.format(v)}</span>;
    },
  },
  {
    accessorKey: "cash",
    header: "Cash",
    cell: ({ getValue }) => {
      const v = getValue<number>();
      return <span className={v < 0 ? "font-mono text-negative" : "font-mono"}>{usd.format(v)}</span>;
    },
  },
];

type View = "forecast" | "table";

export function RunwayPage() {
  const [inputs, setInputs] = useState<RunwayInputs>({ cash: 600000, revenue: 85000, burn: 120000, growth: 4 });
  const [view, setView] = useState<View>("forecast");
  const [running, setRunning] = useState(false);

  const form = useForm<RunwayFormValues, unknown, RunwayInputs>({
    resolver: zodResolver(runwaySchema),
    defaultValues: inputs,
  });

  const rows = useMemo(() => project(inputs), [inputs]);
  const zeroMonth = rows.find((r) => r.cash < 0)?.month;
  const netNow = inputs.revenue - inputs.burn;
  const runwayLabel = zeroMonth ? `${zeroMonth - 1} mo` : `${HORIZON}+ mo`;

  function onSubmit(values: RunwayInputs) {
    setRunning(true);
    window.setTimeout(() => {
      setInputs(values);
      setRunning(false);
      toast.success("Forecast updated");
    }, 400);
  }

  return (
    <AppShell sectionLabel="Runway" actions={
        <>
          <AppSwitcher
            allAppsHref="https://os.thelaunchbox.com"
            items={[
              { id: "cashflow", name: "Cashflow", icon: TrendingUp, href: "https://os.thelaunchbox.com/tools/cashflow" },
              { id: "piw-pricing", name: "CPQ", icon: Calculator, href: "https://os.thelaunchbox.com/tools/piw-pricing" },
            ]}
          />
          <ThemeToggle />
        </>
      } footer="Figures stay in your browser. Nothing is saved or sent.">
      <ToolPage title="Runway" description="See how many months of cash a firm has left under a simple growth assumption.">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard label="Cash runway" value={runwayLabel} icon={CalendarClock} />
          <KpiCard
            label="Net monthly cash"
            value={usd.format(netNow)}
            icon={Flame}
            delta={{ value: netNow < 0 ? "Burning cash today" : "Cash positive today", positive: netNow >= 0 }}
          />
          <KpiCard label={`Cash in ${HORIZON} months`} value={usd.format(rows.at(-1)?.cash ?? 0)} icon={Wallet} />
        </div>

        {zeroMonth ? (
          <Notice tone="error">Cash runs out in month {zeroMonth} of the forecast. Cut burn or lift revenue growth.</Notice>
        ) : (
          <Notice tone="info">Cash stays positive for the full {HORIZON} month forecast.</Notice>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Assumptions</CardTitle>
              <CardDescription>Monthly figures in USD.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  {(
                    [
                      ["cash", "Cash on hand"],
                      ["revenue", "Monthly revenue"],
                      ["burn", "Monthly burn"],
                      ["growth", "Revenue growth (% per month)"],
                    ] as const
                  ).map(([name, label]) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{label}</FormLabel>
                          <FormControl>
                            <Input type="number" inputMode="decimal" step="any" {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                  <Button type="submit" className="w-full" disabled={running}>
                    {running ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
                    Update Forecast
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <div className="flex min-w-0 flex-col gap-4">
            <ToolTabs<View>
              aria-label="Runway view"
              value={view}
              onValueChange={setView}
              items={[
                { value: "forecast", label: "Forecast" },
                { value: "table", label: "Monthly detail", count: rows.length },
              ]}
            />
            {view === "forecast" ? (
              <Card>
                <CardHeader>
                  <CardTitle>Projected cash</CardTitle>
                  <CardDescription>Month end balance over the next {HORIZON} months.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-72" role="img" aria-label="Area chart of projected cash by month">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={rows} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                        <CartesianGrid stroke="var(--color-border)" vertical={false} />
                        <XAxis dataKey="label" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis
                          tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }}
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                          width={48}
                        />
                        <Tooltip content={<ChartTooltip format={(v) => usd.format(Number(v))} />} />
                        <ReferenceLine y={0} stroke="var(--color-destructive)" strokeDasharray="4 4" />
                        <Area type="monotone" dataKey="cash" name="Cash" stroke="var(--color-chart-1)" fill="var(--color-chart-1)" fillOpacity={0.2} strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            ) : rows.length > 0 ? (
              <DataTable columns={columns} data={rows} pageSize={6} />
            ) : (
              <EmptyState icon={Wallet} title="No forecast yet" description="Enter your assumptions to build one." />
            )}
          </div>
        </div>
      </ToolPage>
    </AppShell>
  );
}
