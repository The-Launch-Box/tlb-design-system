# Portco Component Board Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the single-page showcase into a multi-page, router-driven board with a comprehensive component catalog and one design-isolated, brand-themed page per TLB portfolio company.

**Architecture:** Add react-router (HashRouter, for GitHub Pages). `App.tsx` becomes a router shell; each route is a file in `src/pages/`. A new brand-agnostic `src/components/marketing/` composite layer (token-driven) is reused by every portco page; per-portco folders keep only signature marks. New `[data-portco]` token blocks in `src/styles/tailwind.css` carry every brand color, with all hex confined to that file.

**Tech Stack:** React 19, Vite 6, Tailwind v4, shadcn/ui, react-router v7, lucide-react, `cva`, `cn()`.

## Global Constraints

Copied verbatim from `AGENTS.md` / spec. Every task implicitly includes these:

- UI library is shadcn/ui only; primitives in `src/components/ui/`. Icons: lucide-react only. No competing UI/icon/CSS-in-JS/chart/date libraries.
- No inline color values (hex, `rgb()`, `hsl()`, named colors) anywhere except the `@theme` and `[data-portco]` blocks in `src/styles/tailwind.css`. All color flows through tokens.
- No em dashes anywhere, including UI copy, button labels, and comments. Use commas, periods, colons, or parentheses.
- `cn()` is mandatory for any className with conditional segments. Never concatenate classNames with `+` or template strings.
- No `any`. Use `unknown` and narrow, or define the type.
- No inline `style={}` for layout, spacing, color, or typography. Token-referencing Tailwind arbitrary values (`bg-[var(--color-primary)]`) are allowed.
- One source of variant truth per component: use `cva` inside the component file.
- Accessibility: every interactive element has a discernible name; every input has a label or `aria-label`; focus rings stay visible; color is never the sole carrier of meaning.
- Copy style: plain-spoken, active voice. Title case for primary buttons and section headers. "Client" not "customer", "firm" not "company", "founder" not "owner". No banned filler ("leverage" as a verb, "synergy", "best-in-class", "world-class", "cutting-edge").
- Before done: `npm run lint` and `npm run typecheck` both pass. New composites build into the registry via `npm run build:registry`.

**Note on verification:** this repo has no unit-test runner (package.json exposes `lint` and `typecheck` only, no `test`). Do not add one (YAGNI, and it needs Administrator approval). Each task's gate is: `npm run typecheck` clean, `npm run lint` clean, and a manual `npm run dev` render check of the affected route. Commit after each task.

---

## File Structure

**Create:**
- `src/router.tsx` — route table, HashRouter element.
- `src/pages/home.tsx` — board index (TLB themed).
- `src/pages/components-board.tsx` — full primitive + composite catalog (today's `App.tsx` TLB content).
- `src/pages/not-found.tsx` — TLB themed 404.
- `src/pages/portco/echelon.tsx`, `improv.tsx`, `hyperscayle.tsx`, `vescape.tsx`, `bluetrail.tsx`, `dxfoundation.tsx` — one rich page each.
- `src/components/marketing/` — `hero.tsx`, `section-header.tsx`, `stat-callout.tsx`, `quote-card.tsx`, `process-step.tsx`, `feature-card.tsx`, `cta-banner.tsx`, `logo-cloud.tsx`, `primitives-strip.tsx`, `index.ts`.
- `src/components/portco/hyperscayle/` — `hyperscayle-wordmark.tsx`, `hyperscayle-wink.tsx`, `index.ts`.
- `src/components/portco/vescape/` — `vescape-wordmark.tsx`, `vescape-ignition-panel.tsx`, `index.ts`.
- `src/components/portco/bluetrail/` — `bluetrail-wordmark.tsx`, `bluetrail-trail-divider.tsx`, `index.ts`.
- `src/components/portco/dxfoundation/` — `dxf-wordmark.tsx`, `dxf-cosmic-field.tsx`, `index.ts`.
- `decisions/2026-06-30-hashrouter-and-shared-composites.md` — ADR.

**Modify:**
- `src/App.tsx` — replace showcase body with the router shell.
- `src/components/portco/portco-theme.tsx` — extend `Portco` union to six names.
- `src/styles/tailwind.css` — add four new `[data-portco]` blocks; migrate the `improv` block.
- `index.html` — add the Google Fonts stylesheet link.
- `src/components/portco/echelon/*`, `improv/*` — pages refactor onto shared composites; delete bespoke composites that are fully replaced.
- `registry/registry.json` — add the nine marketing composites.
- `docs/12-portco-themes.md`, `docs/STATE.md` — update.

---

## Task 1: Add react-router and the HashRouter shell

**Files:**
- Modify: `package.json` (add `react-router`)
- Create: `src/router.tsx`
- Modify: `src/App.tsx`
- Create: `src/pages/home.tsx`, `src/pages/components-board.tsx`, `src/pages/not-found.tsx`

**Interfaces:**
- Produces: `AppRoutes` React element (default export of `src/router.tsx`); page components `Home`, `ComponentsBoard`, `NotFound`.

- [ ] **Step 1: Install react-router**

Run: `npm install react-router@^7`
Expected: `react-router` added to `dependencies` in `package.json`.

- [ ] **Step 2: Move the current showcase into the board page**

Create `src/pages/components-board.tsx`. Move the entire current `App.tsx` body into it: keep the `Sidebar`, `TopBar`, `EchelonShowcase`, `ImprovShowcase`, `BrandLogoShowcase`, `LogoSwatch`, demo data, and the `AppShell`/`PageHeader`/cards JSX, but export the component as `ComponentsBoard` and drop the three-tab `Tabs` wrapper (Echelon/Improv now live on their own routes). The TLB content (KPIs, brand logos, table, forms, badges, buttons, signals, tool launchers, overlays, loading, tabs demo, empty state) stays here verbatim. Keep `import "..."` lines that are still used; remove the Echelon/Improv composite imports (they move to the portco pages).

```tsx
// src/pages/components-board.tsx (shape)
export function ComponentsBoard() {
  return (
    <AppShell sidebar={<Sidebar />} topBar={<TopBar />}>
      <PageHeader
        title="Component Board"
        subtitle="Every TLB primitive and composite in one place."
        actions={/* keep Documentation + toast buttons */}
      />
      {/* all current TLB-tab cards, unchanged */}
    </AppShell>
  );
}
```

- [ ] **Step 3: Create the home page**

Create `src/pages/home.tsx`. A TLB-themed index linking to the board and every portco. Use `AppShell` + `PageHeader` + a responsive card grid of `Link`s.

```tsx
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/composites/app-shell";
import { PageHeader } from "@/components/composites/page-header";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const DESTINATIONS = [
  { to: "/components", title: "Component Board", description: "Primitives and composites catalog." },
  { to: "/echelon", title: "Echelon Risk + Cyber", description: "Cybersecurity consulting brand page." },
  { to: "/improv", title: "Improv", description: "WFM and HCM transformation brand page." },
  { to: "/hyperscayle", title: "Hyperscayle", description: "Scale and data platform brand page." },
  { to: "/vescape", title: "VEscape", description: "Velocity and escape brand page." },
  { to: "/bluetrail", title: "Blue Trail Digital", description: "Digital asset management brand page." },
  { to: "/dxfoundation", title: "DX Foundation", description: "Foundations for the future brand page." },
];

export function Home() {
  return (
    <AppShell sidebar={null} topBar={null}>
      <PageHeader title="TLB Design System" subtitle="One board, every brand." />
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((d) => (
          <Link key={d.to} to={d.to} className="group rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Card className="h-full transition-colors group-hover:border-primary">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {d.title}
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </CardTitle>
                <CardDescription>{d.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
```

Confirm `AppShell` accepts `null` for `sidebar`/`topBar`; if its types require nodes, pass `undefined` and adjust `AppShell` props to `?:` in the same step.

- [ ] **Step 4: Create the not-found page**

```tsx
// src/pages/not-found.tsx
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-display text-6xl">404</p>
        <p className="mt-2 font-sans text-muted-foreground">That page is not on the board.</p>
        <Button asChild className="mt-6"><Link to="/">Back to board</Link></Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create the router**

```tsx
// src/router.tsx
import { createHashRouter, RouterProvider } from "react-router";
import { Home } from "@/pages/home";
import { ComponentsBoard } from "@/pages/components-board";
import { NotFound } from "@/pages/not-found";
import { EchelonPage } from "@/pages/portco/echelon";
import { ImprovPage } from "@/pages/portco/improv";
import { HyperscaylePage } from "@/pages/portco/hyperscayle";
import { VEscapePage } from "@/pages/portco/vescape";
import { BlueTrailPage } from "@/pages/portco/bluetrail";
import { DXFoundationPage } from "@/pages/portco/dxfoundation";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/components", element: <ComponentsBoard /> },
  { path: "/echelon", element: <EchelonPage /> },
  { path: "/improv", element: <ImprovPage /> },
  { path: "/hyperscayle", element: <HyperscaylePage /> },
  { path: "/vescape", element: <VEscapePage /> },
  { path: "/bluetrail", element: <BlueTrailPage /> },
  { path: "/dxfoundation", element: <DXFoundationPage /> },
  { path: "*", element: <NotFound /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
```

The portco page imports will not resolve until Tasks 6 to 11 land. To keep Task 1 self-contained, temporarily stub each portco page file with `export function <Name>Page() { return null; }` now, and flesh them out in later tasks. Create the six stub files under `src/pages/portco/` in this step.

- [ ] **Step 6: Rewrite App.tsx as the shell**

```tsx
// src/App.tsx
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "@/router";

export function App() {
  return (
    <TooltipProvider>
      <AppRoutes />
      <Toaster richColors closeButton />
    </TooltipProvider>
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both pass. Run `npm run dev`, confirm `/#/` shows the home grid, `/#/components` shows the catalog, `/#/nope` shows the 404.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: add HashRouter shell, home, board, and 404 pages"
```

---

## Task 2: Extend the Portco union

**Files:**
- Modify: `src/components/portco/portco-theme.tsx:24`

**Interfaces:**
- Produces: `Portco = "improv" | "echelon" | "hyperscayle" | "vescape" | "bluetrail" | "dxfoundation"`.

- [ ] **Step 1: Widen the union**

```tsx
type Portco =
  | "improv"
  | "echelon"
  | "hyperscayle"
  | "vescape"
  | "bluetrail"
  | "dxfoundation";
```

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck`
Expected: pass.
```bash
git add src/components/portco/portco-theme.tsx
git commit -m "feat: extend Portco union to six brands"
```

---

## Task 3: Brand tokens and fonts

**Files:**
- Modify: `src/styles/tailwind.css` (append four blocks after the Improv block; replace the Improv block body)
- Modify: `index.html` (font link)

**Interfaces:**
- Produces: working `[data-portco]` scopes for `hyperscayle`, `vescape`, `bluetrail`, `dxfoundation`; migrated `improv` scope.

- [ ] **Step 1: Add the font stylesheet**

In `index.html`, inside `<head>` after the viewport meta, add:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400;0,700;0,900;1,900&family=Chivo:wght@400;700;900&family=Inter:wght@400;500;600;700&family=Lato:wght@300;400;700&family=Lustria&family=Sora:wght@400;600;800&family=Space+Grotesk:wght@400;500;700&family=Work+Sans:wght@400;500;600&display=swap"
  rel="stylesheet"
/>
```

- [ ] **Step 2: Migrate the Improv block**

Replace the body of `[data-portco="improv"]` in `src/styles/tailwind.css` with the official palette:

```css
[data-portco="improv"] {
  /* Brand (official guideline palette) */
  --color-improv-obsidian: #090B0C;
  --color-improv-surface: #11181B;
  --color-improv-strategic-blue: #003B59;
  --color-improv-noir-plum: #590341;
  --color-improv-raspberry: #CC3366;
  --color-improv-sienna: #D86A39;
  --color-improv-aqua: #9CD0D8;
  --color-improv-off-white: #F2F2F2;

  --color-background: var(--color-improv-obsidian);
  --color-foreground: var(--color-improv-off-white);
  --color-card: var(--color-improv-surface);
  --color-card-foreground: var(--color-improv-off-white);
  --color-popover: var(--color-improv-surface);
  --color-popover-foreground: var(--color-improv-off-white);
  --color-primary: var(--color-improv-aqua);
  --color-primary-foreground: var(--color-improv-obsidian);
  --color-secondary: var(--color-improv-strategic-blue);
  --color-secondary-foreground: var(--color-improv-off-white);
  --color-destructive: var(--color-improv-raspberry);
  --color-destructive-foreground: var(--color-improv-off-white);
  --color-muted: var(--color-improv-strategic-blue);
  --color-muted-foreground: var(--color-improv-off-white);
  --color-accent: var(--color-improv-raspberry);
  --color-accent-foreground: var(--color-improv-off-white);
  --color-border: var(--color-improv-strategic-blue);
  --color-input: var(--color-improv-strategic-blue);
  --color-ring: var(--color-improv-aqua);

  --font-display: "Lustria", "Iowan Old Style", Georgia, "Times New Roman", serif;
  --font-sans: "Work Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --radius: 0.125rem;
  --radius-sm: 0.125rem;
  --radius-md: 0.125rem;
  --radius-lg: 0.25rem;
  --radius-xl: 0.375rem;
}
```

`Forge Sienna` is available as `--color-improv-sienna` for the page to use as a tertiary accent class (`text-[var(--color-improv-sienna)]`).

- [ ] **Step 3: Add the Hyperscayle block**

```css
[data-portco="hyperscayle"] {
  --color-hyper-foundation: #0B105B;
  --color-hyper-foundation-dark: #070A3D;
  --color-hyper-pink: #F2055C;
  --color-hyper-blue: #11EAFB;
  --color-hyper-green: #01F34F;
  --color-hyper-red: #FF3300;
  --color-hyper-off-white: #EAF0FF;

  --color-background: var(--color-hyper-foundation);
  --color-foreground: var(--color-hyper-off-white);
  --color-card: var(--color-hyper-foundation-dark);
  --color-card-foreground: var(--color-hyper-off-white);
  --color-popover: var(--color-hyper-foundation-dark);
  --color-popover-foreground: var(--color-hyper-off-white);
  --color-primary: var(--color-hyper-pink);
  --color-primary-foreground: var(--color-hyper-off-white);
  --color-secondary: var(--color-hyper-blue);
  --color-secondary-foreground: var(--color-hyper-foundation);
  --color-destructive: var(--color-hyper-red);
  --color-destructive-foreground: var(--color-hyper-off-white);
  --color-muted: var(--color-hyper-foundation-dark);
  --color-muted-foreground: var(--color-hyper-blue);
  --color-accent: var(--color-hyper-green);
  --color-accent-foreground: var(--color-hyper-foundation);
  --color-border: var(--color-hyper-blue);
  --color-input: var(--color-hyper-foundation-dark);
  --color-ring: var(--color-hyper-blue);

  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius: 0.25rem;
  --radius-sm: 0.125rem;
  --radius-md: 0.25rem;
  --radius-lg: 0.375rem;
  --radius-xl: 0.5rem;
}
```

- [ ] **Step 4: Add the VEscape block**

```css
[data-portco="vescape"] {
  --color-vescape-blue: #330066;
  --color-vescape-blue-dark: #1A0033;
  --color-vescape-magenta: #FF0066;
  --color-vescape-yellow: #FFFF00;
  --color-vescape-purple: #660099;
  --color-vescape-gray: #E8E8E8;
  --color-vescape-white: #FFFFFF;

  --color-background: var(--color-vescape-blue);
  --color-foreground: var(--color-vescape-white);
  --color-card: var(--color-vescape-blue-dark);
  --color-card-foreground: var(--color-vescape-white);
  --color-popover: var(--color-vescape-blue-dark);
  --color-popover-foreground: var(--color-vescape-white);
  --color-primary: var(--color-vescape-magenta);
  --color-primary-foreground: var(--color-vescape-white);
  --color-secondary: var(--color-vescape-purple);
  --color-secondary-foreground: var(--color-vescape-white);
  --color-destructive: var(--color-vescape-magenta);
  --color-destructive-foreground: var(--color-vescape-white);
  --color-muted: var(--color-vescape-blue-dark);
  --color-muted-foreground: var(--color-vescape-gray);
  --color-accent: var(--color-vescape-yellow);
  --color-accent-foreground: var(--color-vescape-blue);
  --color-border: var(--color-vescape-purple);
  --color-input: var(--color-vescape-blue-dark);
  --color-ring: var(--color-vescape-yellow);

  --font-display: "Archivo", "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-sans: "Archivo", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --radius: 0;
  --radius-sm: 0;
  --radius-md: 0;
  --radius-lg: 0;
  --radius-xl: 0;
}
```

- [ ] **Step 5: Add the Blue Trail block (light brand)**

```css
[data-portco="bluetrail"] {
  --color-trail-blue: #074E75;
  --color-blaze-magenta: #FF2E78;
  --color-blaze-blue: #00DBFF;
  --color-trail-dirt: #D9DDCA;
  --color-trail-white: #F1F1EC;
  --color-trail-black: #161615;

  --color-background: var(--color-trail-white);
  --color-foreground: var(--color-trail-black);
  --color-card: #FFFFFF;
  --color-card-foreground: var(--color-trail-black);
  --color-popover: #FFFFFF;
  --color-popover-foreground: var(--color-trail-black);
  --color-primary: var(--color-trail-blue);
  --color-primary-foreground: var(--color-trail-white);
  --color-secondary: var(--color-blaze-blue);
  --color-secondary-foreground: var(--color-trail-black);
  --color-destructive: var(--color-blaze-magenta);
  --color-destructive-foreground: var(--color-trail-white);
  --color-muted: var(--color-trail-dirt);
  --color-muted-foreground: var(--color-trail-black);
  --color-accent: var(--color-blaze-magenta);
  --color-accent-foreground: var(--color-trail-white);
  --color-border: var(--color-trail-dirt);
  --color-input: var(--color-trail-dirt);
  --color-ring: var(--color-trail-blue);

  --font-display: "Sora", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;

  --radius: 0.5rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

- [ ] **Step 6: Add the DX Foundation block**

```css
[data-portco="dxfoundation"] {
  --color-dxf-black: #05010B;
  --color-dxf-horizon: #163259;
  --color-dxf-nebula: #F02D57;
  --color-dxf-violet: #8585CB;
  --color-dxf-discovery: #F9DFCA;
  --color-dxf-aero: #C0D4EA;
  --color-dxf-nova: #E9C3CD;
  --color-dxf-exploration: #C2C2E9;
  --color-dxf-off-white: #FDF6F3;

  --color-background: var(--color-dxf-black);
  --color-foreground: var(--color-dxf-off-white);
  --color-card: var(--color-dxf-horizon);
  --color-card-foreground: var(--color-dxf-off-white);
  --color-popover: var(--color-dxf-horizon);
  --color-popover-foreground: var(--color-dxf-off-white);
  --color-primary: var(--color-dxf-nebula);
  --color-primary-foreground: var(--color-dxf-off-white);
  --color-secondary: var(--color-dxf-violet);
  --color-secondary-foreground: var(--color-dxf-black);
  --color-destructive: var(--color-dxf-nebula);
  --color-destructive-foreground: var(--color-dxf-off-white);
  --color-muted: var(--color-dxf-horizon);
  --color-muted-foreground: var(--color-dxf-aero);
  --color-accent: var(--color-dxf-aero);
  --color-accent-foreground: var(--color-dxf-black);
  --color-border: var(--color-dxf-violet);
  --color-input: var(--color-dxf-horizon);
  --color-ring: var(--color-dxf-nebula);

  --font-display: "Chivo", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;

  --radius: 0.5rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
}
```

The two literal `#FFFFFF` values in the Blue Trail block are the only raw hex outside named brand vars; they sit inside `tailwind.css`, which satisfies the hard rule. Prefer defining `--color-trail-card: #FFFFFF` if you want zero inline literals; either is acceptable in this file.

- [ ] **Step 7: Verify and commit**

Run: `npm run dev`, temporarily wrap a test div in each `data-portco` to confirm tokens resolve (or wait for Task 6+ pages). Run `npm run lint && npm run typecheck`.
```bash
git add src/styles/tailwind.css index.html
git commit -m "feat: add brand tokens for four new portcos and migrate Improv palette"
```

---

## Task 4: Shared marketing composites

**Files:**
- Create: `src/components/marketing/hero.tsx`, `section-header.tsx`, `stat-callout.tsx`, `quote-card.tsx`, `process-step.tsx`, `feature-card.tsx`, `cta-banner.tsx`, `logo-cloud.tsx`, `primitives-strip.tsx`, `index.ts`

**Interfaces:**
- Produces (exact signatures consumed by every portco page):
  - `Hero({ eyebrow?, headline, highlight?, body?, actions?, align?: "split" | "center", highlightTone?: "mark" | "accent" })`
  - `SectionHeader({ eyebrow?, heading, intro?, align?: "left" | "center" })`
  - `StatCallout({ value, label })`
  - `QuoteCard({ quote, author, role })`
  - `ProcessStep({ index?, icon, title, description })` where `icon: LucideIcon`
  - `FeatureCard({ icon, title, description })` where `icon: LucideIcon`
  - `CTABanner({ headline, body?, actions })`
  - `LogoCloud({ label?, children })`
  - `PrimitivesStrip({ note? })`

- [ ] **Step 1: Hero**

```tsx
// src/components/marketing/hero.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const heroVariants = cva("bg-background text-foreground px-6 py-16 md:px-12 md:py-24 lg:px-20", {
  variants: { align: { split: "", center: "text-center" } },
  defaultVariants: { align: "split" },
});

interface HeroProps extends React.ComponentProps<"section">, VariantProps<typeof heroVariants> {
  eyebrow?: React.ReactNode;
  headline: React.ReactNode;
  highlight?: React.ReactNode;
  body?: React.ReactNode;
  actions?: React.ReactNode;
  highlightTone?: "mark" | "accent";
}

function Hero({
  eyebrow, headline, highlight, body, actions, align = "split", highlightTone = "accent", className, ...props
}: HeroProps) {
  const highlightNode = highlight ? (
    <span className={cn(highlightTone === "accent" ? "text-accent" : "bg-primary text-primary-foreground px-1")}>
      {highlight}
    </span>
  ) : null;
  return (
    <section data-slot="hero" className={cn(heroVariants({ align }), className)} {...props}>
      <div className={cn("grid gap-10", align === "split" ? "md:grid-cols-2 md:gap-16" : "mx-auto max-w-3xl")}>
        <div>
          {eyebrow ? (
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary mb-6">{eyebrow}</p>
          ) : null}
          <h1 className="font-display text-4xl leading-[1.05] md:text-5xl xl:text-6xl">
            {headline}
            {highlightNode ? <>{" "}{highlightNode}</> : null}
          </h1>
          {actions ? <div className={cn("mt-8 flex flex-wrap gap-3", align === "center" && "justify-center")}>{actions}</div> : null}
        </div>
        {body && align === "split" ? (
          <div className="font-sans text-base leading-relaxed text-card-foreground md:text-lg">{body}</div>
        ) : null}
        {body && align === "center" ? (
          <p className="mx-auto max-w-2xl font-sans text-base leading-relaxed text-card-foreground md:text-lg">{body}</p>
        ) : null}
      </div>
    </section>
  );
}

export { Hero };
```

- [ ] **Step 2: SectionHeader**

```tsx
// src/components/marketing/section-header.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.ComponentProps<"div"> {
  eyebrow?: React.ReactNode;
  heading: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
}

function SectionHeader({ eyebrow, heading, intro, align = "left", className, ...props }: SectionHeaderProps) {
  return (
    <div className={cn("mb-8 max-w-2xl", align === "center" && "mx-auto text-center", className)} {...props}>
      {eyebrow ? <p className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-3">{eyebrow}</p> : null}
      <h2 className="font-display text-3xl md:text-4xl">{heading}</h2>
      {intro ? <p className="mt-3 font-sans text-base text-muted-foreground">{intro}</p> : null}
    </div>
  );
}

export { SectionHeader };
```

- [ ] **Step 3: StatCallout**

```tsx
// src/components/marketing/stat-callout.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCalloutProps extends React.ComponentProps<"div"> {
  value: React.ReactNode;
  label: React.ReactNode;
}

function StatCallout({ value, label, className, ...props }: StatCalloutProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6 text-center", className)} {...props}>
      <p className="font-display text-4xl text-primary md:text-5xl">{value}</p>
      <p className="mt-2 font-sans text-sm text-card-foreground">{label}</p>
    </div>
  );
}

export { StatCallout };
```

- [ ] **Step 4: QuoteCard**

```tsx
// src/components/marketing/quote-card.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface QuoteCardProps extends React.ComponentProps<"figure"> {
  quote: React.ReactNode;
  author: React.ReactNode;
  role: React.ReactNode;
}

function QuoteCard({ quote, author, role, className, ...props }: QuoteCardProps) {
  return (
    <figure className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <blockquote className="font-sans text-lg leading-relaxed text-card-foreground">"{quote}"</blockquote>
      <figcaption className="mt-4">
        <span className="block font-display text-sm uppercase tracking-wide text-primary">{author}</span>
        <span className="block font-sans text-xs text-muted-foreground">{role}</span>
      </figcaption>
    </figure>
  );
}

export { QuoteCard };
```

- [ ] **Step 5: ProcessStep**

```tsx
// src/components/marketing/process-step.tsx
import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStepProps extends React.ComponentProps<"div"> {
  index?: React.ReactNode;
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ProcessStep({ index, icon: Icon, title, description, className, ...props }: ProcessStepProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <div className="flex items-center gap-3">
        {index != null ? <span className="font-display text-2xl text-primary">{index}</span> : null}
        <Icon className="size-6 text-primary" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-display text-xl text-card-foreground">{title}</h3>
      <p className="mt-2 font-sans text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { ProcessStep };
```

- [ ] **Step 6: FeatureCard**

```tsx
// src/components/marketing/feature-card.tsx
import * as React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps extends React.ComponentProps<"div"> {
  icon: LucideIcon;
  title: React.ReactNode;
  description: React.ReactNode;
}

function FeatureCard({ icon: Icon, title, description, className, ...props }: FeatureCardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-card p-6", className)} {...props}>
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 font-display text-lg text-card-foreground">{title}</h3>
      <p className="mt-2 font-sans text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export { FeatureCard };
```

- [ ] **Step 7: CTABanner**

```tsx
// src/components/marketing/cta-banner.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface CTABannerProps extends React.ComponentProps<"section"> {
  headline: React.ReactNode;
  body?: React.ReactNode;
  actions: React.ReactNode;
}

function CTABanner({ headline, body, actions, className, ...props }: CTABannerProps) {
  return (
    <section className={cn("bg-primary text-primary-foreground px-6 py-16 md:px-12", className)} {...props}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display text-3xl md:text-4xl">{headline}</h2>
        {body ? <p className="mt-3 font-sans text-base opacity-90">{body}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      </div>
    </section>
  );
}

export { CTABanner };
```

- [ ] **Step 8: LogoCloud**

```tsx
// src/components/marketing/logo-cloud.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoCloudProps extends React.ComponentProps<"div"> {
  label?: React.ReactNode;
}

function LogoCloud({ label, children, className, ...props }: LogoCloudProps) {
  return (
    <div className={cn("border-t border-border px-6 py-10 md:px-12", className)} {...props}>
      {label ? <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-muted-foreground">{label}</p> : null}
      <div className="flex flex-wrap items-center gap-8 opacity-80">{children}</div>
    </div>
  );
}

export { LogoCloud };
```

- [ ] **Step 9: PrimitivesStrip**

Proves the token cascade on each portco page using unmodified shadcn primitives.

```tsx
// src/components/marketing/primitives-strip.tsx
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PrimitivesStripProps extends React.ComponentProps<"section"> {
  note?: React.ReactNode;
}

function PrimitivesStrip({ note = "Unmodified shadcn primitives, restyled by token cascade", className, ...props }: PrimitivesStripProps) {
  return (
    <section className={cn("border-t border-border px-6 py-10 md:px-12", className)} {...props}>
      <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-primary">{note}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Badge>Default</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="outline">Outline</Badge>
      </div>
    </section>
  );
}

export { PrimitivesStrip };
```

- [ ] **Step 10: Barrel**

```tsx
// src/components/marketing/index.ts
export { Hero } from "./hero";
export { SectionHeader } from "./section-header";
export { StatCallout } from "./stat-callout";
export { QuoteCard } from "./quote-card";
export { ProcessStep } from "./process-step";
export { FeatureCard } from "./feature-card";
export { CTABanner } from "./cta-banner";
export { LogoCloud } from "./logo-cloud";
export { PrimitivesStrip } from "./primitives-strip";
```

- [ ] **Step 11: Verify and commit**

Run: `npm run typecheck && npm run lint`
Expected: pass.
```bash
git add src/components/marketing
git commit -m "feat: add shared token-driven marketing composites"
```

---

## Task 5: Signature marks for the four new portcos

**Files:**
- Create: the eight files under `src/components/portco/{hyperscayle,vescape,bluetrail,dxfoundation}/` listed in File Structure, plus four `index.ts` barrels.

**Interfaces:**
- Produces: `HyperscayleWordmark`, `HyperscayleWink`, `VEscapeWordmark`, `VEscapeIgnitionPanel`, `BlueTrailWordmark`, `BlueTrailTrailDivider`, `DXFWordmark`, `DXFCosmicField`. All accept `className` and use `currentColor` / token utilities only (no hex).

- [ ] **Step 1: Hyperscayle marks**

```tsx
// src/components/portco/hyperscayle/hyperscayle-wordmark.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function HyperscayleWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-bold uppercase tracking-tight", className)} {...props}>
      Hyperscayle
    </span>
  );
}

export { HyperscayleWordmark };
```

```tsx
// src/components/portco/hyperscayle/hyperscayle-wink.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/** The Hyperscayle "wink": a fast forward chevron, rendered in currentColor. */
function HyperscayleWink({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth={3} className={cn("size-6", className)} aria-hidden="true" {...props}>
      <path d="M4 4l10 8-10 8M16 4l10 8-10 8" strokeLinecap="square" />
    </svg>
  );
}

export { HyperscayleWink };
```

```ts
// src/components/portco/hyperscayle/index.ts
export { HyperscayleWordmark } from "./hyperscayle-wordmark";
export { HyperscayleWink } from "./hyperscayle-wink";
```

- [ ] **Step 2: VEscape marks**

```tsx
// src/components/portco/vescape/vescape-wordmark.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function VEscapeWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-black uppercase italic tracking-tight", className)} {...props}>
      VEscape
    </span>
  );
}

export { VEscapeWordmark };
```

```tsx
// src/components/portco/vescape/vescape-ignition-panel.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/** Full-bleed ignition gradient built from VEscape tokens (no hex). */
function VEscapeIgnitionPanel({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[linear-gradient(120deg,var(--color-vescape-purple),var(--color-vescape-magenta),var(--color-vescape-yellow))]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { VEscapeIgnitionPanel };
```

```ts
// src/components/portco/vescape/index.ts
export { VEscapeWordmark } from "./vescape-wordmark";
export { VEscapeIgnitionPanel } from "./vescape-ignition-panel";
```

- [ ] **Step 3: Blue Trail marks**

```tsx
// src/components/portco/bluetrail/bluetrail-wordmark.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function BlueTrailWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-extrabold tracking-tight", className)} {...props}>
      Blue Trail
    </span>
  );
}

export { BlueTrailWordmark };
```

```tsx
// src/components/portco/bluetrail/bluetrail-trail-divider.tsx
import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/** A dashed trail rule with a pin, evoking a map path. */
function BlueTrailTrailDivider({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center gap-3 text-primary", className)} {...props}>
      <span className="h-0 flex-1 border-t-2 border-dashed border-primary" />
      <MapPin className="size-5" aria-hidden="true" />
      <span className="h-0 flex-1 border-t-2 border-dashed border-primary" />
    </div>
  );
}

export { BlueTrailTrailDivider };
```

```ts
// src/components/portco/bluetrail/index.ts
export { BlueTrailWordmark } from "./bluetrail-wordmark";
export { BlueTrailTrailDivider } from "./bluetrail-trail-divider";
```

- [ ] **Step 4: DX Foundation marks**

```tsx
// src/components/portco/dxfoundation/dxf-wordmark.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

function DXFWordmark({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span className={cn("font-display text-xl font-bold uppercase tracking-[0.15em]", className)} {...props}>
      DX Foundation
    </span>
  );
}

export { DXFWordmark };
```

```tsx
// src/components/portco/dxfoundation/dxf-cosmic-field.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

/** Soft pastel dotted field built from DXF tokens, for section backdrops. */
function DXFCosmicField({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-[radial-gradient(circle_at_20%_30%,var(--color-dxf-violet),transparent_40%),radial-gradient(circle_at_80%_70%,var(--color-dxf-nebula),transparent_40%)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { DXFCosmicField };
```

```ts
// src/components/portco/dxfoundation/index.ts
export { DXFWordmark } from "./dxf-wordmark";
export { DXFCosmicField } from "./dxf-cosmic-field";
```

- [ ] **Step 5: Verify and commit**

Run: `npm run typecheck && npm run lint`
```bash
git add src/components/portco/hyperscayle src/components/portco/vescape src/components/portco/bluetrail src/components/portco/dxfoundation
git commit -m "feat: add signature marks for four new portcos"
```

---

## Task 6: Hyperscayle page (exemplar)

**Files:**
- Modify: `src/pages/portco/hyperscayle.tsx` (replace the Task 1 stub)

**Interfaces:**
- Consumes: `PortcoTheme`; marketing composites from `@/components/marketing`; `HyperscayleWordmark`, `HyperscayleWink`.
- Produces: `HyperscaylePage`.

Every portco page follows this exact structure: a `PortcoBackLink` row, wordmark header, `Hero`, two to three content sections built from shared composites, a `CTABanner`, and a `PrimitivesStrip`, all inside `<PortcoTheme portco="...">`. Use `Link` from `react-router` for the back affordance.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/hyperscayle.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, BarChart3, Boxes, Gauge, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, FeatureCard, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { HyperscayleWordmark, HyperscayleWink } from "@/components/portco/hyperscayle";

export function HyperscaylePage() {
  return (
    <PortcoTheme portco="hyperscayle" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <div className="flex items-center gap-3 text-secondary">
          <HyperscayleWink className="text-secondary" />
          <HyperscayleWordmark />
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Scale and data platform"
        headline="Remove complexity."
        highlight="Scale what works."
        body={<p>We connect technical depth to real outcomes: the dollar impact of moving from lead to cash, measured and made plain.</p>}
        actions={<>
          <Button size="lg">Talk to us<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See the platform</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="What we do" heading="Built to scale with you." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={Gauge} title="Performance" description="Tuned pipelines that keep pace as data volume grows." />
          <FeatureCard icon={Boxes} title="Modular" description="Composable building blocks, not a monolith." />
          <FeatureCard icon={BarChart3} title="Measured" description="Every change tied to a number that matters." />
          <FeatureCard icon={Workflow} title="Automated" description="Lead to cash, wired end to end." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="10x" label="Throughput at peak load" />
          <StatCallout value="99.9%" label="Pipeline uptime" />
          <StatCallout value="Days" label="From signal to action" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They translated our data mess into a system we can actually reason about." author="VP, Data" role="Confidential partner, logistics" />
          <QuoteCard quote="The lead-to-cash view paid for itself in the first quarter." author="Head of RevOps" role="Confidential partner, SaaS" />
        </div>
      </section>

      <CTABanner
        headline="Ready to scale without the complexity?"
        body="Start with the metric that matters most to you."
        actions={<Button size="lg" variant="secondary">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck && npm run lint`, then `npm run dev` and open `/#/hyperscayle`. Confirm: deep-blue background, pink primary buttons, cyan secondary, green accent chips, focus rings visible on tab.
```bash
git add src/pages/portco/hyperscayle.tsx
git commit -m "feat: add Hyperscayle brand page"
```

---

## Task 7: VEscape page

**Files:**
- Modify: `src/pages/portco/vescape.tsx`

**Interfaces:**
- Consumes: `PortcoTheme`; marketing composites; `VEscapeWordmark`, `VEscapeIgnitionPanel`.
- Produces: `VEscapePage`.

VEscape leading statements render italic uppercase (the brand "velocity" rule): pass an italic-uppercase span as `headline`. Use `ProcessStep` with an "ignition / liftoff / orbit" sequence.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/vescape.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Flame, Rocket, Orbit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { VEscapeWordmark, VEscapeIgnitionPanel } from "@/components/portco/vescape";

export function VEscapePage() {
  return (
    <PortcoTheme portco="vescape" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <VEscapeWordmark />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Reach escape velocity"
        headline={<span className="italic">Break orbit. Move faster than the problem.</span>}
        body={<p>VEscape turns stalled programs into momentum, with the structure and warmth to keep teams moving together.</p>}
        actions={<>
          <Button size="lg">Ignite<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See how</Button>
        </>}
      />

      <VEscapeIgnitionPanel className="px-6 py-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="3x" label="Faster time to launch" />
          <StatCallout value="0" label="Stalled milestones" />
          <StatCallout value="100%" label="Teams aligned at liftoff" />
        </div>
      </VEscapeIgnitionPanel>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="The sequence" heading="From ignition to orbit." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index={1} icon={Flame} title="Ignition" description="Find the spark and commit the energy to move." />
          <ProcessStep index={2} icon={Rocket} title="Liftoff" description="Launch with structure, precision, and a clear path." />
          <ProcessStep index={3} icon={Orbit} title="Orbit" description="Sustain momentum and hold a stable, repeatable course." />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="We went from stuck to shipping in a single quarter." author="Program Director" role="Confidential partner, aerospace" />
          <QuoteCard quote="They brought velocity without burning the team out." author="COO" role="Confidential partner, fintech" />
        </div>
      </section>

      <CTABanner
        headline="Ready to break orbit?"
        actions={<Button size="lg" variant="secondary">Start the countdown<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck && npm run lint`, open `/#/vescape`. Confirm purple background, magenta primary, yellow accent, sharp corners (radius 0), the ignition gradient panel renders, italic hero headline.
```bash
git add src/pages/portco/vescape.tsx
git commit -m "feat: add VEscape brand page"
```

---

## Task 8: Blue Trail page

**Files:**
- Modify: `src/pages/portco/bluetrail.tsx`

**Interfaces:**
- Consumes: `PortcoTheme`; marketing composites; `BlueTrailWordmark`, `BlueTrailTrailDivider`.
- Produces: `BlueTrailPage`.

Blue Trail is the one light-surface portco. Voice carries dry humor and trail/navigation language. DAM (digital asset management) is the domain.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/bluetrail.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Compass, FolderTree, Map, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, FeatureCard, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { BlueTrailWordmark, BlueTrailTrailDivider } from "@/components/portco/bluetrail";

export function BlueTrailPage() {
  return (
    <PortcoTheme portco="bluetrail" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <BlueTrailWordmark className="text-primary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Digital asset management"
        headline="We do DAM right."
        highlight="No wrong turns."
        body={<p>Blue Trail Digital activates digital asset management across business functions, so the right file is never more than a step off the path.</p>}
        actions={<>
          <Button size="lg">Find your trail<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See the map</Button>
        </>}
      />

      <div className="px-6 md:px-12"><BlueTrailTrailDivider /></div>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="The kit" heading="Everything you need to navigate your assets." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard icon={FolderTree} title="Structure" description="A library that maps to how your teams actually work." />
          <FeatureCard icon={Tag} title="Metadata" description="Tags and taxonomy that make search feel like cheating." />
          <FeatureCard icon={Map} title="Governance" description="Clear rules of the trail, so nothing gets lost." />
          <FeatureCard icon={Compass} title="Adoption" description="We guide your people to the trailhead and beyond." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="40%" label="Less time hunting for files" />
          <StatCallout value="1" label="Source of truth" />
          <StatCallout value="Zero" label="Lost final-final-v3 files" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They mapped our chaos into something a new hire can navigate on day one." author="Brand Operations Lead" role="Confidential partner, retail" />
          <QuoteCard quote="DAM done right, with a sense of humor that kept the rollout human." author="Marketing Director" role="Confidential partner, hospitality" />
        </div>
      </section>

      <CTABanner
        headline="Ready to find the trail?"
        body="Bring the assets. We will bring the map."
        actions={<Button size="lg" variant="secondary">Start the hike<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck && npm run lint`, open `/#/bluetrail`. Confirm light trail-white background, trail-blue primary, magenta accent, rounded corners, dashed trail divider, readable contrast on the light surface.
```bash
git add src/pages/portco/bluetrail.tsx
git commit -m "feat: add Blue Trail Digital brand page"
```

---

## Task 9: DX Foundation page

**Files:**
- Modify: `src/pages/portco/dxfoundation.tsx`

**Interfaces:**
- Consumes: `PortcoTheme`; marketing composites; `DXFWordmark`, `DXFCosmicField`.
- Produces: `DXFoundationPage`.

Voice: friendly, approachable, "foundations for the future", cosmic exploration imagery. Use the `DXFCosmicField` behind the stats band.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/dxfoundation.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Compass, Layers, Rocket, Telescope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { DXFWordmark, DXFCosmicField } from "@/components/portco/dxfoundation";

export function DXFoundationPage() {
  return (
    <PortcoTheme portco="dxfoundation" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <DXFWordmark className="text-secondary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Foundations for the future"
        headline="Built for you,"
        highlight="for the future."
        body={<p>When we talk about foundations, we mean possibilities. We go deep on the systems, the teams, and the goals of the firms we partner with.</p>}
        actions={<>
          <Button size="lg">Lay the groundwork<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">Explore</Button>
        </>}
      />

      <DXFCosmicField className="px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="∞" label="Possibilities from a solid base" />
          <StatCallout value="1:1" label="Foundation fit to your vision" />
          <StatCallout value="Future" label="Where we build toward" />
        </div>
      </DXFCosmicField>

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="How we build" heading="Deep on the systems, the teams, and the goals." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index={1} icon={Telescope} title="Survey" description="Understand the terrain before we pour anything." />
          <ProcessStep index={2} icon={Layers} title="Foundation" description="Lay a base fit to your future, not a template." />
          <ProcessStep index={3} icon={Rocket} title="Launch" description="Build up with confidence and room to grow." />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="They got the foundation right, so everything we built after just worked." author="CTO" role="Confidential partner, healthcare" />
          <QuoteCard quote="It felt like they were planning for our next decade, not our next quarter." author="Founder" role="Confidential partner, climate" />
        </div>
      </section>

      <CTABanner
        headline="Ready to build something that lasts?"
        actions={<Button size="lg" variant="secondary">Start with the foundation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Verify and commit**

Run: `npm run typecheck && npm run lint`, open `/#/dxfoundation`. Confirm near-black cosmic background, nebula-pink primary, violet secondary, the cosmic field renders behind the stats, focus rings visible.
```bash
git add src/pages/portco/dxfoundation.tsx
git commit -m "feat: add DX Foundation brand page"
```

---

## Task 10: Refactor the Echelon page onto shared composites

**Files:**
- Modify: `src/pages/portco/echelon.tsx` (replace the Task 1 stub)
- Delete: `src/components/portco/echelon/echelon-hero.tsx`, `echelon-process-step.tsx`, `echelon-stat-callout.tsx`, `echelon-quote-card.tsx`
- Keep: `echelon-logo.tsx`, `echelon-marker.tsx` (signature), update `echelon/index.ts`

**Interfaces:**
- Consumes: marketing composites; `EchelonLogoStacked`, `EchelonMarker`.
- Produces: `EchelonPage`.

Reuse the existing Echelon copy (assess / strategize / implement / level up; the two testimonials; the stats 500+, 24/7, 100%). Map each removed bespoke composite to its shared equivalent: `EchelonHero` to `Hero` with `highlight` and `highlightTone="mark"`; `EchelonProcessStep` to `ProcessStep`; `EchelonStatCallout` to `StatCallout`; `EchelonQuoteCard` to `QuoteCard`.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/echelon.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Compass, Hammer, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { EchelonLogoStacked } from "@/components/portco/echelon";

export function EchelonPage() {
  return (
    <PortcoTheme portco="echelon" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <EchelonLogoStacked className="size-16 text-primary" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="Cybersecurity consulting"
        headline="Security and privacy are basic human rights."
        highlight="We are built to protect them."
        highlightTone="mark"
        body={<>
          <p>The threats we face are constantly evolving. We keep mid-market firms safe across vCISO, MSSP, and offensive testing engagements.</p>
          <p className="mt-4">We take this personally. We are all in.</p>
        </>}
        actions={<>
          <Button size="lg">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See services</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="How we work" heading="Clear, actionable, people-led cybersecurity that delivers results." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ProcessStep index={1} icon={Search} title="Assess" description="Custom risk assessments tailored to your business needs." />
          <ProcessStep index={2} icon={Compass} title="Strategize" description="Practical security roadmaps aligned with your long-term goals." />
          <ProcessStep index={3} icon={Hammer} title="Implement" description="Hands-on execution that makes security measures a reality." />
          <ProcessStep index={4} icon={TrendingUp} title="Level Up" description="Continuous improvement and proactive threat mitigation." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="500+" label="Mid-market clients" />
          <StatCallout value="24/7" label="MSSP coverage" />
          <StatCallout value="100%" label="Compliance focus" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="Echelon felt like an extension of our team. They moved quickly, communicated clearly, and delivered." author="Security Leader" role="Confidential partner, financial services" />
          <QuoteCard quote="Their deep expertise modernized our detection and gave us better visibility across the environment." author="Senior Manager, Information Security" role="Confidential partner, consumer goods" />
        </div>
      </section>

      <CTABanner
        headline="Ready to take security personally?"
        actions={<Button size="lg" variant="secondary">Start the conversation<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Delete replaced composites and update the barrel**

Delete the four files listed above. Edit `src/components/portco/echelon/index.ts` to export only `EchelonLogoStacked`, `EchelonLogoWordmark` (whatever the logo file exports), and `EchelonMarker`. Grep for any remaining import of the deleted names: `git grep -n "EchelonHero\|EchelonProcessStep\|EchelonStatCallout\|EchelonQuoteCard" src` should return nothing.

- [ ] **Step 3: Verify and commit**

Run: `npm run typecheck && npm run lint`, open `/#/echelon`. Confirm parity with the old Echelon tab (yellow-on-blue, sharp edges, mark highlight on the hero).
```bash
git add -A
git commit -m "refactor: move Echelon page onto shared marketing composites"
```

---

## Task 11: Refactor the Improv page onto shared composites

**Files:**
- Modify: `src/pages/portco/improv.tsx`
- Delete: `src/components/portco/improv/improv-hero.tsx`, `improv-journey-step.tsx`, `improv-stat-callout.tsx`, `improv-quote-card.tsx`, `improv-pill-button.tsx`
- Keep: `improv-logo.tsx`; update `improv/index.ts`

**Interfaces:**
- Consumes: marketing composites; `ImprovLogo`.
- Produces: `ImprovPage`.

Reuse existing Improv copy (Ignite / Forge / Evolve; 5/5, 1,000+, Millions; two testimonials). `ImprovPillButton` is dropped; use the standard `Button` (the migrated Improv tokens already give it the aqua primary). Map `ImprovHero` to `Hero` (serif display comes from the Improv `--font-display`), `ImprovJourneyStep` to `ProcessStep` (pass the phase word as `index`), `ImprovStatCallout` to `StatCallout`, `ImprovQuoteCard` to `QuoteCard`.

- [ ] **Step 1: Write the page**

```tsx
// src/pages/portco/improv.tsx
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, Activity, Flame, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortcoTheme } from "@/components/portco/portco-theme";
import { Hero, SectionHeader, StatCallout, QuoteCard, ProcessStep, CTABanner, PrimitivesStrip } from "@/components/marketing";
import { ImprovLogo } from "@/components/portco/improv";

export function ImprovPage() {
  return (
    <PortcoTheme portco="improv" className="min-h-screen">
      <header className="flex items-center justify-between px-6 pt-6 md:px-12">
        <ImprovLogo className="h-7 text-foreground" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/"><ArrowLeft className="size-4" aria-hidden="true" />Board</Link>
        </Button>
      </header>

      <Hero
        eyebrow="WFM and HCM consulting"
        headline="Elevating possibilities. Inspiring results."
        body={<p>We simplify WFM and HCM transformation so teams evolve with clarity. Decades of proven success in workforce management, human capital management, and business transformation.</p>}
        actions={<>
          <Button size="lg">Contact us<ArrowRight className="size-4" aria-hidden="true" /></Button>
          <Button variant="outline" size="lg">See solutions</Button>
        </>}
      />

      <section className="px-6 py-12 md:px-12">
        <SectionHeader eyebrow="Mapping your journey" heading="Every journey is different. Start anywhere and drive real value at scale." />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ProcessStep index="Ignite" icon={Sparkles} title="Spark insight and momentum" description="Uncover challenges, align on opportunities, and set a clear path forward." />
          <ProcessStep index="Forge" icon={Flame} title="Shape and launch with purpose" description="Activate practical solutions and strategies that generate measurable outcomes." />
          <ProcessStep index="Evolve" icon={Activity} title="Optimize and sustain" description="Continuously refine and scale solutions for lasting value and adaptability." />
        </div>
      </section>

      <section className="px-6 pb-12 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <StatCallout value="5/5" label="Average partner rating" />
          <StatCallout value="1,000+" label="Firms served" />
          <StatCallout value="Millions" label="Employee lives impacted" />
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuoteCard quote="We genuinely felt like more than just a client. There was a real sense of partnership." author="Director of IT" role="Confidential partner, energy sector" />
          <QuoteCard quote="They took the time to understand our environment rather than applying a one-size-fits-all approach." author="Security Leader" role="Confidential partner, entertainment" />
        </div>
      </section>

      <CTABanner
        headline="Ready to evolve with clarity?"
        actions={<Button size="lg" variant="secondary">Contact us<ArrowRight className="size-4" aria-hidden="true" /></Button>}
      />

      <PrimitivesStrip />
    </PortcoTheme>
  );
}
```

- [ ] **Step 2: Delete replaced composites and update the barrel**

Delete the five files. Edit `src/components/portco/improv/index.ts` to export only `ImprovLogo`. Confirm: `git grep -n "ImprovHero\|ImprovJourneyStep\|ImprovStatCallout\|ImprovQuoteCard\|ImprovPillButton" src` returns nothing.

- [ ] **Step 3: Verify and commit**

Run: `npm run typecheck && npm run lint`, open `/#/improv`. Confirm the migrated palette renders (obsidian background, aqua primary, raspberry accent), serif display headings, focus rings visible.
```bash
git add -A
git commit -m "refactor: move Improv page onto shared composites and migrated palette"
```

---

## Task 12: Register the marketing composites

**Files:**
- Modify: `registry/registry.json` (append nine items)

**Interfaces:**
- Consumes: the nine files in `src/components/marketing/`.

The registry build forces every file to a `components/ui/<basename>` target and auto-detects npm deps, so registry items only need `name`, `type: "registry:ui"`, `description`, a single `files` entry, and `registryDependencies` for composites that import other registry items (here: `primitives-strip` depends on `button` and `badge`).

- [ ] **Step 1: Append the items**

Add these objects to the `items` array in `registry/registry.json` (match the existing composite entries' shape; path is relative to `src/`):

```json
{ "name": "hero", "type": "registry:ui", "description": "Token-driven marketing hero. Eyebrow, headline, optional highlight clause, body, actions.", "files": [ { "path": "components/marketing/hero.tsx", "type": "registry:ui", "target": "components/marketing/hero.tsx" } ] },
{ "name": "section-header", "type": "registry:ui", "description": "Section opener: eyebrow, heading, optional intro.", "files": [ { "path": "components/marketing/section-header.tsx", "type": "registry:ui", "target": "components/marketing/section-header.tsx" } ] },
{ "name": "stat-callout", "type": "registry:ui", "description": "Display figure plus label on a card surface.", "files": [ { "path": "components/marketing/stat-callout.tsx", "type": "registry:ui", "target": "components/marketing/stat-callout.tsx" } ] },
{ "name": "quote-card", "type": "registry:ui", "description": "Testimonial card: quote, author, role.", "files": [ { "path": "components/marketing/quote-card.tsx", "type": "registry:ui", "target": "components/marketing/quote-card.tsx" } ] },
{ "name": "process-step", "type": "registry:ui", "description": "Numbered or phase-labeled step: index, icon, title, description.", "files": [ { "path": "components/marketing/process-step.tsx", "type": "registry:ui", "target": "components/marketing/process-step.tsx" } ] },
{ "name": "feature-card", "type": "registry:ui", "description": "Icon, title, description card for capability grids.", "files": [ { "path": "components/marketing/feature-card.tsx", "type": "registry:ui", "target": "components/marketing/feature-card.tsx" } ] },
{ "name": "cta-banner", "type": "registry:ui", "description": "Closing call to action on an accent surface.", "files": [ { "path": "components/marketing/cta-banner.tsx", "type": "registry:ui", "target": "components/marketing/cta-banner.tsx" } ] },
{ "name": "logo-cloud", "type": "registry:ui", "description": "Row of partner or client marks.", "files": [ { "path": "components/marketing/logo-cloud.tsx", "type": "registry:ui", "target": "components/marketing/logo-cloud.tsx" } ] },
{ "name": "primitives-strip", "type": "registry:ui", "description": "Buttons plus badges row proving token cascade.", "registryDependencies": ["button", "badge"], "files": [ { "path": "components/marketing/primitives-strip.tsx", "type": "registry:ui", "target": "components/marketing/primitives-strip.tsx" } ] }
```

If the registry build only reads files under `src/` with the `src/` prefix added by the script (`readSource(\`src/${file.path}\`)`), the `path` values above are correct (no `src/` prefix). Confirm against an existing composite entry before running.

- [ ] **Step 2: Build the registry**

Run: `npm run build:registry`
Expected: logs `emitted r/hero.json`, ..., `emitted r/primitives-strip.json`, and the index count increases by nine. No schema validation errors.

- [ ] **Step 3: Commit**

```bash
git add registry/registry.json public/r
git commit -m "feat: register marketing composites in the shadcn registry"
```

---

## Task 13: Docs, ADR, and STATE

**Files:**
- Modify: `docs/12-portco-themes.md`
- Create: `decisions/2026-06-30-hashrouter-and-shared-composites.md`
- Modify: `docs/STATE.md`

- [ ] **Step 1: Update the portco themes doc**

In `docs/12-portco-themes.md`: add token tables for Hyperscayle, VEscape, Blue Trail, DX Foundation (mirror the existing Echelon/Improv table format, values from Task 3); replace the Improv token table with the migrated palette; add a "Shared marketing composites" section listing the nine composites and noting that portco pages compose them under `<PortcoTheme>`; update the "Adding a Third Portco" section to reference the router page pattern (`src/pages/portco/<name>.tsx`). Remove the now-false claim that Echelon/Improv ship bespoke hero/stat/quote composites; point to the shared layer instead.

- [ ] **Step 2: Write the ADR**

```markdown
# 2026-06-30: HashRouter and shared marketing composites

## Context
The showcase grew from one page to a per-portco board across seven brands. We needed client-side routing that survives GitHub Pages subpath hosting, and a way to avoid duplicating hero/stat/quote composites per brand.

## Decision
- Use react-router `createHashRouter`. Hash routing needs no server rewrite or 404.html fallback on Pages, where the app is served from `/tlb-design-system/`.
- Introduce `src/components/marketing/` token-driven composites reused by every portco page. Per-portco folders keep only signature marks (logo, motif). Echelon and Improv were refactored onto this layer.

## Consequences
- Deep links use the `/#/<route>` form.
- Adding a portco is: token block, union entry, signature mark, one page file composing shared composites.
- Brand fidelity now lives in tokens and page copy, not bespoke components.
```

- [ ] **Step 3: Update STATE.md**

Rewrite `docs/STATE.md` Done/In flight/Next sections to reflect: multi-page board shipped, six portco pages live, Improv palette migrated, shared marketing composite layer added and registered. Set "Last updated" to 2026-06-30 and the branch to `feat/portco-component-board`.

- [ ] **Step 4: Commit**

```bash
git add docs/12-portco-themes.md decisions/2026-06-30-hashrouter-and-shared-composites.md docs/STATE.md
git commit -m "docs: portco board token tables, router ADR, STATE refresh"
```

---

## Task 14: Final verification

- [ ] **Step 1: Full gate**

Run: `npm run lint && npm run typecheck && npm run build:registry && npm run build`
Expected: all pass, `dist/` builds.

- [ ] **Step 2: Manual route sweep**

Run `npm run dev`. Visit `/#/`, `/#/components`, `/#/echelon`, `/#/improv`, `/#/hyperscayle`, `/#/vescape`, `/#/bluetrail`, `/#/dxfoundation`, `/#/nope`. For each portco confirm: brand background and primary, focus ring visible on keyboard tab, no TLB orange leaking into the portco subtree.

- [ ] **Step 3: Hex guard**

Run: `git diff main --stat` then grep the diff for stray hex outside `tailwind.css`: `git grep -nE "#[0-9a-fA-F]{3,6}" -- src ':!src/styles/tailwind.css'`
Expected: no matches in `.tsx` files (the SVG favicon in `index.html` is pre-existing and out of scope).

- [ ] **Step 4: Commit any fixes and open the PR**

```bash
git add -A && git commit -m "chore: final verification fixes" # only if needed
```
Then open a PR from `feat/portco-component-board` to `main` (ask the user first, per repo norms).

---

## Self-Review

**Spec coverage:**
- Multi-page HashRouter board: Task 1. ✓
- `/components` catalog: Task 1 Step 2. ✓
- One page per portco: Tasks 6 to 11. ✓
- Two-tier components (shared marketing + per-portco signature): Tasks 4, 5. ✓
- Four new token blocks + Improv migration + fonts: Task 3. ✓
- All six palettes from the spreadsheet: Task 3. ✓
- Echelon/Improv refactor onto shared composites: Tasks 10, 11. ✓
- Portco union extension: Task 2. ✓
- Registry: Task 12. ✓
- Docs (12-portco-themes, STATE) + ADR: Task 13. ✓
- Verification (lint, typecheck, registry, hex guard, focus rings): Task 14. ✓

**Placeholder scan:** No "TBD"/"implement later"/"add error handling" left. Page copy and composite code are complete. Each portco page is given in full rather than referenced.

**Type consistency:** `Hero` `highlightTone` is `"mark" | "accent"`, used in Echelon (Task 10) as `"mark"`. `ProcessStep.index` is `React.ReactNode`, so the Improv string phases ("Ignite") and numeric indices both type-check. `icon: LucideIcon` used consistently in `ProcessStep` and `FeatureCard`. Page component names (`HyperscaylePage`, `VEscapePage`, `BlueTrailPage`, `DXFoundationPage`, `EchelonPage`, `ImprovPage`) match the imports in `src/router.tsx` (Task 1 Step 5).

**Known follow-up to confirm during execution:** verify `AppShell` props accept absent sidebar/topBar (Task 1 Step 3) and the exact export name of the Echelon logo component (Task 10) and Improv logo (Task 11) against their current files before wiring.
