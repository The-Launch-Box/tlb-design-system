# Icons and Charts

## Icons

**One library: `lucide-react`.** Pinned, installed in every TLB app, no alternatives permitted.

### Why lucide

- Tree-shakable. You import icons individually, the bundle only carries what you use.
- ~1,500 icons covering the full set TLB apps need. Updated regularly.
- Designed to work cleanly at the small sizes shadcn buttons and inputs use.
- Already shipped in `tlb-financial-tools`. Setting it as the standard requires no new install across the fleet.

### Sizing

| Context | Class |
|---|---|
| Inside a default Button | `h-4 w-4` |
| Inside a small Button | `h-3.5 w-3.5` |
| Inside a large Button | `h-5 w-5` |
| Sidebar nav item | `h-5 w-5` |
| KpiTile metric | `h-5 w-5` |
| EmptyState | `h-12 w-12` |
| ErrorState | `h-10 w-10` |
| Toolbar action (icon-only Button) | `h-4 w-4` |

### Color

Icons inherit `currentColor` by default. Use Tailwind text utilities to color them, not the `color` prop or inline styles.

```tsx
<Trash2 className="h-4 w-4 text-destructive" />
```

For primary accents:

```tsx
<TrendingUp className="h-5 w-5 text-tlb-orange" />
```

### Standard Icons for Common Actions

To keep apps consistent across teams, agree on a single icon for each common action:

| Action | Icon |
|---|---|
| Create / Add | `Plus` |
| Edit | `Pencil` |
| Delete | `Trash2` |
| Save | usually no icon; rely on label |
| Search | `Search` |
| Filter | `Filter` |
| Sort | `ArrowUpDown` |
| More actions menu | `MoreHorizontal` |
| External link | `ExternalLink` |
| Copy to clipboard | `Copy` (toggles to `Check` on success) |
| Download | `Download` |
| Upload | `Upload` |
| Refresh | `RefreshCw` |
| Loading | `Loader2` (with `animate-spin`) |
| Success | `CircleCheck` |
| Warning | `TriangleAlert` |
| Error | `CircleAlert` |
| Info | `Info` |
| User | `User` |
| Settings | `Settings` |
| Sign out | `LogOut` |
| Theme toggle | `Sun` and `Moon` |
| Sidebar collapse | `PanelLeftClose` and `PanelLeft` |

Deviating from this list requires a justification in PR review.

### What You Cannot Do

- Inline SVG for stock icons. Use lucide.
- Mix icon families. No Heroicons, Material, FontAwesome, Tabler, Phosphor, or emoji-as-icon.
- Decorative icons inside body text. Icons are functional, paired with labels or actions.

### Custom Icons

If a domain need cannot be served by lucide (rare), commit the SVG to `src/components/icons/` with these constraints:

- 24x24 viewBox, single-color, stroke-based (matching lucide's style).
- Exported as a React component named `<DomainIcon />`.
- Documented inline at the top of the file.

The TLB rocket icon is the only mark-style icon allowed in the app shell, and only via the official logo SVG, not redrawn.

## Charts

**One library: `recharts`.** Already shipped in `tlb-financial-tools`. No alternatives.

### Why recharts

- Declarative React API that AI agents handle well.
- Composable. Each chart is a tree of `<XAxis>`, `<YAxis>`, `<Bar>`, etc.
- ResponsiveContainer plays well with shadcn Cards.
- Active maintenance and large training-data footprint, which keeps agent output reliable.

### Standard Chart Card

Every chart sits inside a `ChartCard` composite. The card provides the title, the subtitle, and the height container. The chart itself is the body.

```tsx
import { ChartCard } from "@/components/data/chart-card";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";

export function MonthlySpendChart({ data }: { data: { month: string; usd: number }[] }) {
  return (
    <ChartCard title="Monthly spend" subtitle="USD, last 12 months">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
          <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={12} />
          <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
          <Tooltip
            contentStyle={{
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          />
          <Bar dataKey="usd" fill="var(--color-tlb-orange)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
```

### Chart Color Rules

- Single-series chart: TLB Orange (`var(--color-tlb-orange)`).
- Two-series chart: TLB Orange plus TLB Charcoal.
- Three-series chart: TLB Orange, TLB Charcoal, TLB Dark Orange.
- Four or more series: rare for internal tools. If unavoidable, use the TLB chart palette extension defined in `src/styles/tailwind.css` under `--color-chart-1` through `--color-chart-5`. Do not introduce ad-hoc colors.

Axis and grid lines render with `var(--color-border)` and `var(--color-muted-foreground)`. Never hard-coded grays.

### Tooltip Style

All recharts tooltips use the same inline style as in the example above. Pull it into a constant if you find yourself repeating it more than three times in a feature.

### Heights

| Chart context | Height |
|---|---|
| Inside a `ChartCard` on a dashboard | 280px |
| Inside a `ChartCard` as a focal element | 360px |
| Sparkline inside a `KpiTile` | 48px |
| Full-page time series | 480px |

Never use a chart taller than 480px. Tall charts break the visual rhythm and rarely add insight.

### Accessibility for Charts

- Every chart card has a clear title and subtitle. Both are visible.
- A `<table>` companion for the underlying data is provided when feasible (often via a tabs pattern: Chart tab and Data tab).
- Tooltips meet contrast minimums (the standard tooltip style satisfies this).
- Color is never the only differentiator between series. Use distinct visual patterns (`strokeDasharray`) where needed.

### What You Cannot Do

- Other chart libraries (Chart.js, ApexCharts, Highcharts, Visx, Plotly, Nivo). All rejected.
- Pie or donut charts. TLB internal tools do not use them. If proportional comparison is needed, use a horizontal bar chart.
- 3D charts. Ever.
- Animated chart intros longer than 200ms. Distracting and not useful.
