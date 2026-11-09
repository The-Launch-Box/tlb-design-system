# Blueprint: rebuilding tlb-financial-tools

Everything you need to rebuild the UI of the TLB Financial Tools portal ("TLB Operating System") from an empty repo, using only this design system. It describes the private `The-Launch-Box/tlb-financial-tools` repo as of 2026-11-09. Server code, auth and data are out of scope; where the UI depends on them, the contract is named.

Read with [03-tokens-and-theme.md](./03-tokens-and-theme.md), [04-component-catalog.md](./04-component-catalog.md) and [12-firm-themes.md](./12-firm-themes.md).

## 1. Repo shape

An npm-workspaces monorepo.

```
apps/
  web/                 the portal shell (React + Vite + React Router)
  api/                 NestJS API (out of scope here)
  <tool>/              one workspace per tool: cashflow, expense-tracker,
                       payroll-variance, reimbursements, piw-pricing (CPQ),
                       piw-admin, deal-desk, invoicing, people-ops,
                       rate-comparison, capacity-planner, kantata-import,
                       late-timesheets, cost-rate-calculator
packages/
  ui/                  @tlb/ui: primitives, composites, ToolPage/ToolTabs/Notice
  auth/                @tlb/auth: MSAL auth, workspace, firm and department context
```

Stack: React 19, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), shadcn/ui on the unified `radix-ui` package, lucide-react, recharts 3, react-hook-form + zod, @tanstack/react-table, next-themes, sonner, MSAL (`@azure/msal-react`).

## 2. Build the shared packages first

### `packages/ui` (`@tlb/ui`)

Install these registry items into it, then re-export them from one `src/index.ts`. Tools import only from `"@tlb/ui"`; paths inside the package are private.

- Primitives: `button`, `badge`, `card`, `dialog`, `input`, `select`, `table`, `tabs`, `tooltip`.
- Composites: `kpi-card`, `empty-state`, `data-table`, `file-upload`, `filter-bar`, `chart-tooltip`.
- Page pieces: `tool-page`, `tool-tabs`, `notice` (exports `Notice` and `LoadingState`).
- `cn()` from `lib/utils`.

The package ships **no CSS**. Tokens and fonts come from the host app's CSS, which must `@source` the package.

### The portal's own primitives

`apps/web/src/components/ui` additionally needs `dropdown-menu`, `label`, `separator`, `textarea`. (The real repo also keeps an older copy of button, badge, dialog, tabs and input there; a rebuild should use the `@tlb/ui` ones.)

## 3. Tokens, fonts and theme bootstrapping

1. Copy `starter-kit/tailwind.css` to `apps/web/src/index.css`. Add one `@source "../../<tool>/src";` per tool workspace, plus `@source "../../../packages/ui/src";` and `@source "../../../packages/auth/src";`. Without them Tailwind never generates the tools' classes in the portal build: KPIs stack and layouts collapse.
2. Copy `starter-kit/index.html` to `apps/web/index.html`. It loads Bebas Neue, Inter and JetBrains Mono from Google Fonts, sets `<html class="dark">`, and runs the pre-paint script that applies a saved light theme before React mounts.
3. Put the licensed `BebasNeuePro-BoldItalic.otf` in `apps/web/public/fonts/` and preload it in `index.html`. It draws the header wordmark and the flapboard.
4. Copy `src/lib/firm-themes.ts` to `apps/web/src/features/branding/firm-themes.ts`.
5. Wrap the app in `<ThemeProvider attribute="class" defaultTheme="dark" storageKey="theme">` from next-themes.

## 4. The portal shell

Routes (React Router, `BrowserRouter`), all inside `AppShell`:

| Path | Page |
|---|---|
| `/` | Dashboard |
| `/tools/:toolId` | The tool, lazy-loaded; a link-out tool redirects to its URL |
| `/admin` | Admin console (TLB admins) |

### `AppShell`

Install `app-shell`, `app-switcher`, `theme-toggle`. The portal composes them like this:

```tsx
<AppShell
  renderHomeLink={(brand) => <Link to="/" className="flex min-w-0 items-center gap-3">{brand}</Link>}
  sectionLabel={pathname === "/admin" ? "Admin" : currentTool?.name}
  fullWidth={pathname === "/"}
  footer="We record which tools you open, never what you type or see, and only TLB admins can see it."
  actions={
    <>
      <AppSwitcher items={visibleTools} allAppsHref="/" renderLink={(href, c) => <Link to={href}>{c}</Link>} />
      <ThemeToggle />
      <DepartmentSelect ... />   {/* from @tlb/auth */}
      <EntitySelect ... />       {/* the firm picker, from @tlb/auth */}
      {isTlbAdmin && <AdminLink />}
      <AccountMenu />            {/* initials avatar + DropdownMenu: email, Sign Out */}
    </>
  }
>
  <Outlet />
</AppShell>
```

Behaviour the shell owns:

- **Firm theme.** `useEffect(() => applyFirmTheme(firmThemeByKey(activeEntity), resolvedTheme === "dark"), [activeEntity, resolvedTheme])`.
- **Gates before content.** An expired session renders a session-expired screen (it re-mints the token itself); a 401/403 from the workspace renders a "Not authorized" card with a Sign out button. Neither is shown as "server down".
- **Header controls** use `h-8`, `rounded-md`, `font-mono text-[11px] uppercase tracking-[0.06em]`, `text-muted-foreground`, hover `bg-bg-raised`. The active one gets `border-primary bg-accent-wash text-accent-ink`.
- **Avatar** is the user's initials on a gradient from `var(--accent)` to 65% accent mixed with black, text `var(--accent-foreground)`.
- **One `<Toaster richColors position="top-right" />`** for the whole portal.

### Firm-required tools

A tool flagged `requiresFirm` renders a `FirmGate` instead of itself when a multi-firm user has no active firm: an icon tile, `SELECT A FIRM` in `font-display text-3xl`, one line of explanation, and a grid of firm cards. Picking one sets the portal-wide firm. Single-firm users never see it.

## 5. The tool registry

One list in `apps/web/src/features/registry.ts` drives the dashboard, the sidebar, the app switcher and routing:

```ts
interface ToolDefinition {
  id: string;                 // URL segment: /tools/<id>
  name: string;
  description: string;
  icon: string;               // a lucide icon name, resolved by ToolIcon
  color: string;
  category?: string;          // eyebrow, e.g. "Analysis · Reporting"
  meta?: string;              // mono footer, e.g. "CSV · XLSX"
  card: ToolCard;             // what the dashboard card shows (section 7)
  component?: ComponentType;  // embedded tool, lazy-imported from its workspace
  url?: string;               // OR a link-out tool hosted elsewhere
  firmScope: "server" | "client" | "none";
  requiresFirm?: boolean;
}
```

Exactly one of `component` or `url`. A link-out tool with `firmScope: "client"` receives the active firm as a query parameter. The firm is context, never authorization.

Embedded tools are lazy imports through a Vite alias per tool:

```ts
// vite.config.ts
alias: { "@tlb/cashflow": path.resolve(__dirname, "../cashflow/src/index.ts"), /* one per tool */ }

// registry.ts
const CashflowPage = lazy(() => import("@tlb/cashflow").then((m) => ({ default: m.CashflowPage })));
```

**Visibility** comes from one hook (`useVisibleTools`): tools the user is granted, filtered by active firm and department. The sidebar, the pinned grid and the app switcher all read it; never re-derive it in a component.

**Sections**: `finance` ("Financial Tools"), `operations` ("Operations Tools"), `marketing` ("Marketing Tools"). An admin sets each tool's section. A tool with an unknown section falls back to the one its registry list implies.

## 6. A tool page

Every tool, embedded or standalone, renders the same skeleton from `@tlb/ui`:

```tsx
import { Button, KpiCard, LoadingState, Notice, ToolPage, ToolTabs } from "@tlb/ui";

export function MyToolPage() {
  const [tab, setTab] = useState<"overview" | "detail">("overview");
  if (loading && !data) {
    return (
      <ToolPage title="My Tool" description="One line on what it shows.">
        <LoadingState label="Loading..." />
      </ToolPage>
    );
  }
  return (
    <ToolPage
      title="My Tool"
      description="One line on what it shows."
      actions={<Button variant="outline" size="sm" onClick={reload}>Refresh</Button>}
    >
      {error ? <Notice tone="error">{error}</Notice> : null}
      <ToolTabs
        value={tab}
        onValueChange={setTab}
        aria-label="My Tool view"
        items={[
          { value: "overview", label: "Overview" },
          { value: "detail", label: "Detail", count: rows.length },
        ]}
      />
      {tab === "overview" ? <Overview /> : <Detail />}
    </ToolPage>
  );
}
```

The contract:

- **Root:** `ToolPage` owns `py-6` and the `gap-5` rhythm. Sections inside use `gap-3`.
- **Header:** title (`font-display text-2xl uppercase`), one description line, actions on the right. No second heading style.
- **Tabs:** one `ToolTabs` strip directly under the header or the notices.
- **Messages:** `Notice` for every inline error, info or sample-data line; `LoadingState` for the first load. A failed reload with data on screen shows `Notice tone="error"` above the content.
- **Tiles:** `KpiCard`, labels `text-xs`, never smaller.
- **Firm scope** comes from `useActiveEntity()` / `useWorkspace()` in `@tlb/auth`, never a hardcoded firm list.

## 7. The two rendering contexts

This catches people out. Every tool runs in two places and they load **different CSS**.

| | Embedded (the product) | Standalone (`npm run dev:<tool>`) |
|---|---|---|
| Entry | the portal lazy-imports the page | the tool's own `main.tsx` |
| CSS | `apps/web/src/index.css` | `apps/<tool>/src/index.css` |
| HTML | `apps/web/index.html` | `apps/<tool>/index.html` |
| Horizontal padding | the portal shell | the tool's `App.tsx` |

A tool's `index.css` **never loads in the portal**. So:

1. Every token a tool uses must exist in `apps/web/src/index.css`, or it renders unstyled in production.
2. The tool's standalone `index.css` should be the same token file plus `@source "../../../packages/ui/src";`. (Several real tools still carry an older copy with `#FF6600` and Helvetica; embedded they are correct because the portal's CSS wins. Copy `starter-kit/tailwind.css` instead.)
3. `py-6` belongs on the page (`ToolPage`), never on the standalone wrapper. The standalone `App.tsx` is:

```tsx
export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground">
        {/* Horizontal padding only; the page owns its vertical rhythm. */}
        <main className="mx-auto max-w-screen-2xl px-6">
          <Routes>
            <Route path="*" element={<MyToolPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
```

`main.tsx` wraps it in `<AuthProvider>` from `@tlb/auth`; the tool's `src/index.ts` exports the page for the portal. Its `package.json` depends on `"@tlb/ui": "*"` and `"@tlb/auth": "*"`.

## 8. The dashboard (`/`)

Full width (`AppShell fullWidth`), a two-column grid on `lg`: sidebar left, content right.

**Sidebar** (sticky at `top-[4.5rem]`, `h-[calc(100dvh-6rem)]`; behind a "Browse tools" toggle below `lg`): a tool search, a "Departments" heading, one collapsible group per section with every visible tool (each row has a pin button), and a footer link "Need a new tool? Submit via Project Intake".

**Hero** (`<header className="pb-6 pt-2 text-left">`):

- Eyebrow: the active firm's display name in `font-mono text-xs font-medium uppercase tracking-[0.22em] text-fg-faint`, with a 26px hairline after it.
- `h1` at `text-[clamp(48px,5.5vw,80px)] font-extrabold leading-[1.04] tracking-[-0.03em]`: the `Flapboard` showing the firm name, then `OPERATING SYSTEM` in `font-brand font-bold italic`. Hovering the board flaps through the other firms and retints the page to each (`applyFirmTheme` per word).
- A greeting line: "Good morning, **Name**." in `text-base text-muted-foreground`.
- A status pill (`rounded-full border bg-bg-surface font-mono text-xs`): a green pip and "N tools online", a hairline, "updated <date>".

**Your figures**: a row of live numbers, one per metric source the user can see, attention-first. Label `font-mono text-[10.5px] font-semibold uppercase tracking-[0.1em] text-fg-faint`, value `font-display text-[48px] tabular-nums` (`text-accent-ink` when it needs attention). Each links to its tool.

**Pinned Tools**: heading `font-display text-[40px] tracking-[0.04em] text-accent-ink`, then the user's pinned tools as cards in a `lg:grid-cols-2` grid, most-used first (a lone featured tool spans the row). A user who never pinned starts with their department's tools; pins save per user through the API, with a browser cache.

**Honest cards.** A card shows the first true thing it can, in this order, and never invents a number:

1. `metric`: a server-owned figure (e.g. weeks to cash deficit, invoices unsent and overdue, decisions waiting on you).
2. `personal`: the viewer's own line: "3 waiting on you", "2 unfinished", "You last opened this yesterday", "4 people used this in the last week".
3. `motif`: a decorative drawing with no caption (`bars`, `spark`, `pipe`, `runs`). Its numbers never claim to measure anything.

Card hover is one gesture: the sparkline redraws left to right and the bars rise in sequence (`.tool-card` CSS in the token file, disabled under reduced motion).

## 9. Hard rules (greppable)

```bash
grep -rn "#[0-9a-fA-F]\{3,8\}\b\|rgb(\|hsl(" apps/<tool>/src --include="*.tsx"   # 1. no inline colour
grep -rn "$(printf '\342\200\224')" apps/<tool>/src                                # 2. no em dashes (U+2014)
grep -rn ": any\b\|as any" apps/<tool>/src --include="*.ts*"                     # 3. no any
grep -rnE 'className=\{(`|[^}]*\?)' apps/<tool>/src --include="*.tsx" | grep -v "cn("   # 4. cn() for conditionals
grep -rn "<Input\|<input\|<Textarea" apps/<tool>/src --include="*.tsx"           # 5. every input labelled
```

Colour is never the only carrier of meaning: a status has a colour, an icon and its written name.

## 10. Checklist for a new tool

- [ ] Workspace `apps/<tool>` with `src/index.ts` exporting the page, `"@tlb/ui": "*"` and `"@tlb/auth": "*"`.
- [ ] Vite alias in `apps/web/vite.config.ts` and a lazy import plus `ToolDefinition` in the registry.
- [ ] `@source "../../<tool>/src";` in `apps/web/src/index.css`.
- [ ] Standalone `index.css` is the starter-kit token file plus `@source "../../../packages/ui/src";`; standalone `index.html` is the starter-kit one.
- [ ] Page is a `ToolPage`; tabs are `ToolTabs`; messages are `Notice` / `LoadingState`; tiles are `KpiCard`.
- [ ] Any new token in the portal's `index.css` with both tracks.
- [ ] Firms read from `useWorkspace()` / `useActiveEntity()`.
- [ ] The five greps come back clean; lint and build pass.
