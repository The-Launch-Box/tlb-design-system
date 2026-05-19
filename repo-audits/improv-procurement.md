# Repo Audit: improv-procurement

Audit date: 2026-05-15  
Audited path: `C:\Users\NikolaMarkovic\Projects\improv-procurement`  
Auditor: TLB Engineering

## TL;DR

**`improv-procurement` is on Microsoft Fluent UI v9 and must migrate off it.** The runtime (React 19, Vite, TypeScript, Azure MSAL, react-router v7) is otherwise compatible with the standards. The migration is non-trivial: every page that imports from `@fluentui/react-components` needs to be reworked, and the visual identity needs to flip from Microsoft Fluent to TLB. Plan for a multi-week phased migration rather than a single sweeping PR.

## What I Inspected

- Root `package.json` (workspaces structure)
- `packages/client/package.json` (the Vite plus React app)
- `packages/shared/` (cross-package types and constants)
- `packages/api/host.json` (Azure Functions backend, out of UI scope)
- Asset directory and high-level layout

## Current Stack (packages/client)

| Concern | Current | Standards target | Status |
|---|---|---|---|
| Framework | React 19.2 plus Vite 8 | React 19 plus Vite | Matches |
| Language | TypeScript ^5.8 | TypeScript 5.x or 6.x | Matches |
| UI library | **`@fluentui/react-components@^9.62`** | **shadcn/ui** | **Replace** |
| Styling | Fluent UI runtime tokens (Griffel) | Tailwind v4 with TLB `@theme` | Replace |
| Class utilities | (none) | cva, clsx, tailwind-merge | Add |
| Icons | Fluent UI icons (transitive) | lucide-react | Replace |
| Charts | (none) | recharts | Add when needed |
| Forms | (manual; not standardized) | react-hook-form plus zod | Add |
| Tables | (manual; not standardized) | @tanstack/react-table | Add |
| State | `zustand@^5` | zustand | Matches |
| Auth | `@azure/msal-react`, `@azure/msal-browser` | @azure/msal-react | Matches |
| Routing | `react-router@^7.6` | react-router v7 | Matches |
| PDF | `jspdf@^4.2` | (TBD; jspdf acceptable for now) | Acceptable |
| Linting | ESLint 10 with typescript-eslint 8 | ESLint with typescript-eslint | Matches |

## Why the Migration Is Worth It

Fluent UI v9 is a Microsoft-flavored design system. Its strengths are tight integration with the M365 visual identity. The downsides for TLB internal tooling:

- The visual identity is Microsoft, not TLB. Heavy theme overrides are required to make it feel like a TLB tool, and even then the gestures and motion remain Microsoft.
- Fluent has less training-data footprint than shadcn for current LLMs. AI agents produce shakier output. Variability across the fleet grows.
- Two repos on two stacks doubles the cognitive load for every engineer crossing between them.
- The Griffel runtime CSS-in-JS adds bundle weight that Tailwind v4 plus shadcn does not.

The migration costs weeks. The standardization payoff compounds for the life of the app.

## Migration Plan (Phased)

### Phase 0: Standards bootstrap (1 PR, ~1 day)

Goal: make the repository capable of running both Fluent UI and shadcn side by side during migration.

- Copy `starter-kit/components.json` to `packages/client/`.
- Copy `starter-kit/tailwind.css` to `packages/client/src/styles/tailwind.css`. Import it in `packages/client/src/main.tsx`.
- Install Tailwind v4: `npm install -w packages/client tailwindcss@^4 @tailwindcss/vite`. Wire `tailwindcss()` into `vite.config.ts`.
- Install `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`, `react-hook-form`, `@hookform/resolvers`, `zod`, `@tanstack/react-table`, `sonner`, `date-fns`.
- Copy `starter-kit/lib-utils.ts` to `packages/client/src/lib/utils.ts`.
- Run `npx shadcn@latest init` in `packages/client/`.
- Install baseline shadcn components.
- Copy `AGENTS.md`, `CLAUDE.md`, `.cursorrules` to the repo root.
- Mount `Toaster` once in `packages/client/src/App.tsx`.
- Verify the existing app still builds and runs (Fluent UI still in place).

### Phase 1: Layout shell (1 PR, ~2 to 3 days)

Goal: replace the app shell. This sets the visual identity even before page-level migration.

- Build `AppShell`, `Sidebar`, `TopBar`, `PageHeader`, `ThemeToggle` composites from shadcn primitives. Reference patterns in `docs/05-patterns.md`.
- Move the app's outer scaffolding off Fluent UI's `FluentProvider`. Keep `FluentProvider` wrapping the page content area temporarily so existing pages still render.
- Update the TLB logo placement to use the TLB Stacked variant in the sidebar.

### Phase 2: Page-by-page migration (multiple PRs, 2 to 6 weeks)

Goal: rewrite each page off Fluent UI onto shadcn primitives.

Migration order: lowest-risk pages first (settings, profile, library views), then write-heavy pages (request creation, approval flows), then any reporting or dashboards.

For each page:

1. Identify every `@fluentui/react-components` import in the file.
2. Map each Fluent component to a shadcn primitive (mapping table below).
3. Move the form (if any) onto `react-hook-form` plus zod with a schema in `packages/shared/src/schemas/` or `packages/client/src/schemas/`.
4. Move the table (if any) onto `@tanstack/react-table` plus the `DataTable` composite.
5. Replace Fluent icons with lucide-react equivalents.
6. Run the page in light and dark mode. Confirm tokens render correctly.

### Phase 3: Cleanup (1 PR, ~1 day)

- Confirm no remaining imports of `@fluentui/react-components` or `@fluentui/react-icons`.
- Remove `@fluentui/react-components` from `packages/client/package.json`. Remove transitive Fluent packages.
- Delete any Fluent-specific theme files.
- Verify bundle size dropped. Document the before/after in the PR description.

### Phase 4: Polish (ongoing)

- Promote any feature-specific composites discovered during migration into `packages/client/src/components/data/` or `packages/client/src/components/forms/` if reused.
- Update any cross-package types in `packages/shared/` that referenced Fluent types.

## Fluent UI to shadcn Mapping

| Fluent UI v9 | shadcn / TLB target |
|---|---|
| `Button` | `Button` |
| `Input`, `Textarea` | `Input`, `Textarea` (with `Label` and `FormField`) |
| `Dropdown`, `Combobox` | `Select` (small lists), `Combobox` composite (long lists) |
| `Checkbox`, `Switch`, `Radio`, `RadioGroup` | shadcn equivalents (same names) |
| `Dialog`, `DialogSurface`, `DialogBody` | `Dialog`, `DialogContent`, `DialogHeader`, `DialogFooter` |
| `Dialog` for destructive actions | `AlertDialog` |
| `Drawer` | `Sheet` |
| `Menu`, `MenuTrigger`, `MenuList`, `MenuItem` | `DropdownMenu` family |
| `Tooltip` | `Tooltip` |
| `Popover` | `Popover` |
| `Tab`, `TabList` | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` |
| `Card`, `CardHeader`, `CardFooter` | `Card`, `CardHeader`, `CardContent`, `CardFooter` |
| `Badge` | `Badge` |
| `Divider` | `Separator` |
| `Spinner` | `Loader2` from lucide with `animate-spin`, scoped per surface |
| `ProgressBar` | `Progress` |
| `Toast`, `Toaster` | `sonner` |
| `Accordion`, `AccordionItem` | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` |
| `DataGrid` | `DataTable` composite (built on @tanstack/react-table) |
| `Calendar`, `DatePicker` | `Calendar` plus `Popover` |
| Fluent icons (`@fluentui/react-icons`) | lucide-react equivalents (see `docs/07-icons-and-charts.md`) |
| `FluentProvider` plus `makeStyles` | Tailwind v4 `@theme` plus `cn()` plus `cva` |
| `makeStyles`, `mergeClasses` | `cn()` from `src/lib/utils.ts` |

## Estimated Effort

| Phase | Engineer-days |
|---|---|
| Phase 0 (bootstrap) | 1 |
| Phase 1 (shell) | 2 to 3 |
| Phase 2 (pages) | 10 to 20, depending on page count and complexity |
| Phase 3 (cleanup) | 1 |
| Phase 4 (polish) | rolling, absorbed into normal feature work |
| **Total** | **~14 to 25 engineer-days** |

Adjust based on actual page count once Phase 1 lands.

## What Stays Out of Scope

- The Azure Functions backend in `packages/api/`. Not a UI concern.
- The `packages/shared/` types and constants. They are framework-agnostic and stay as-is. Only schemas may be added.
- The `.codex-run/` directory. Tooling artifact, not in the migration path.

## Risks

- **Hidden Fluent dependencies.** Some composites or hooks may rely on Fluent context providers in non-obvious ways. Phase 1 establishes the shell, which surfaces these early.
- **PDF generation.** `jspdf` is fine for now. Long-term, TLB may standardize on a server-side PDF approach. Out of scope for this migration.
- **Forms with complex validation.** A few procurement forms likely have multi-step or conditional logic. Plan extra time in Phase 2 for those.
- **Visual drift during migration.** Pages on Fluent and pages on shadcn will coexist for weeks. Accept the inconsistency for the duration. Avoid hybrid components.

## After Migration

`improv-procurement` joins `tlb-financial-tools` as a reference TLB app. The standards in this repository should be tested against both before being applied to the next internal tool.
