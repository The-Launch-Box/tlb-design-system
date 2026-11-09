# Component Catalog

Every component this repo ships, where it came from, and when to use it. Install any of them with:

```bash
npx shadcn@latest add https://the-launch-box.github.io/tlb-design-system/r/<name>.json
```

**Source of truth: tlb-financial-tools.** Where a component exists there, the copy here is that file with its import paths rewritten to `@/components/ui/*` and `@/lib/utils`. Primitives and composites come from `packages/ui` (`@tlb/ui`, the "tool lineage" every tool imports); `dropdown-menu`, `label`, `separator` and `textarea` come from `apps/web/src/components/ui`. Change the portal first, then copy.

Live demo: the component board (`src/pages/components-board.tsx`) and the tool showcase (`src/pages/tool-and-review-showcase.tsx`).

## Primitives (shadcn, `src/components/ui/`)

| Primitive | Origin | When to use |
|---|---|---|
| `Button` | `@tlb/ui` | Any clickable action. Variants: default, secondary, destructive, outline, ghost, link. |
| `Input` | `@tlb/ui` | Single-line text. Always paired with `Label` or `aria-label`. |
| `Textarea` | portal | Multi-line text. |
| `Label` | portal | Every form field has one. |
| `Select` | `@tlb/ui` | Single choice from a short known list. |
| `Card` | `@tlb/ui` | Default container. `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, `CardFooter`. |
| `Dialog` | `@tlb/ui` | Non-destructive modal. |
| `Tooltip` | `@tlb/ui` | Short label on hover or focus. Never for required information. |
| `DropdownMenu` | portal | Action menu on a button or row; the account menu and `AppSwitcher`. |
| `Table` | `@tlb/ui` | Simple tables. Sortable or paginated: `DataTable`. |
| `Tabs` | `@tlb/ui` | Includes the `line` variant `ToolTabs` uses (`tabsListVariants`). |
| `Separator` | portal | Divider. |
| `Badge` | `@tlb/ui` | Non-interactive status label. |
| `Checkbox`, `RadioGroup`, `Switch`, `AlertDialog`, `Sheet`, `Popover`, `Skeleton`, `Sonner`, `Form` | design system | Standard shadcn, restyled with the tokens. Not yet used by the portal. Destructive confirmation is always `AlertDialog`. |

**Two lineages in the portal.** `apps/web/src/components/ui` still holds an older copy of button, badge, dialog, tabs and input (variants in separate `*-variants.ts` files). The tools use `@tlb/ui`, which is what ships here. New code uses this copy.

## Tool page (from `@tlb/ui`)

The pieces every tool is built from. See [14-tlb-financial-tools-blueprint.md](./14-tlb-financial-tools-blueprint.md#6-a-tool-page) for the full contract.

| Composite | Purpose |
|---|---|
| `ToolPage` | Page root and header: `flex flex-col gap-5 py-6`, `h1` in `font-display text-2xl uppercase`, one muted description line, `actions` on the right. |
| `ToolTabs` | One tab strip under the header: line variant, items `{ value, label, count?, icon? }`, optional right-hand children. You own the active value and render the content. |
| `Notice`, `LoadingState` | The inline message (`tone`: `info`, `error` with `role="alert"`, `sample`) with optional `action`; a spinner and label with `role="status"`. |
| `KpiCard` | THE tile: label `text-xs` (never smaller), value, optional `delta` `{ value, positive }`, optional lucide `icon`. |
| `FilterBar` | Period segmented buttons plus an optional user select. |
| `DataTable` | @tanstack/react-table + `Table`, sort and paginate built in. |
| `EmptyState` | Icon, title, description, action. |
| `FileUpload` | Drop zone and file picker that reads the chosen file as text (CSV imports): `onFile(content, file)`. |
| `ChartTooltip` | recharts tooltip body in the token colours. |

## Portal shell (from `apps/web`)

| Composite | Purpose |
|---|---|
| `AppShell` | Sticky 56px header tinted to the firm, TLB arrow + "ACCELERATED BY THE LAUNCH BOX" wordmark, section label, controls slot; 1280px main column or `fullWidth`; footer line. Auth-free: the portal passes its pickers and account menu as `actions`. |
| `AppSwitcher` | The header "Apps" menu: two-column tool grid, external-link marker, "All apps" link. Router-agnostic via `renderLink`. |
| `ThemeToggle` | Light/dark switch (next-themes). |
| `Flapboard` | Split-flap word board from the dashboard hero. Needs the flapboard CSS in the token file. |
| `firm-themes` (lib) | `FIRM_THEMES`, `firmThemeByKey()`, `applyFirmTheme()`. Colours-only firm branding. See [12-firm-themes.md](./12-firm-themes.md). |

## Design-system composites (not in the portal)

Built on the same tokens; some need the [design-system additions](./03-tokens-and-theme.md#design-system-additions) block.

| Composite | Purpose |
|---|---|
| `PageHeader` | Title, subtitle and actions for a standalone app. A tool inside the portal uses `ToolPage`. |
| `StatusBadge` | Status pill with paired icon: review and workflow statuses. |
| `Sparkline`, `Delta` | Inline spark bars; signed directional change in mono. |
| `SignalBadge`, `LiveSync` | Data-signal pill; data-freshness chip. |
| `BrandMark` | The TLB logo in a black lozenge. |
| `ToolLauncher` | Launcher tile for a tools grid. The portal dashboard uses its own pinned-tool cards; see the blueprint. |
| `ReviewItemCard`, `PayloadList`, `FieldDiff`, `AuditTimeline`, `ActorBadge` | Human-in-the-loop review flows (from the Echelon Automation Hub). |
| Marketing set (`Hero`, `SectionHeader`, `StatCallout`, `QuoteCard`, `ProcessStep`, `FeatureCard`, `CTABanner`, `LogoCloud`, `PrimitivesStrip`) | Token-driven sections for TLB-branded pages. Never per-firm. |

## Picking the right primitive

- **`Dialog` vs `AlertDialog`:** destructive or irreversible, always `AlertDialog`.
- **`Dialog` vs `Sheet`:** the action is the focus, `Dialog`; a contextual edit of a row, `Sheet`.
- **`Tooltip` vs `Popover`:** read-only label, `Tooltip`; anything interactive, `Popover`.
- **`Badge` vs `Button`:** non-interactive status, `Badge`.
- **Tabs:** one `ToolTabs` strip per page, directly under the header. No hand-rolled `border-b-2` button rows.
- **Messages:** `Notice` for every inline error, info or sample-data line; `LoadingState` while the first load is in flight. A reload that fails after data is on screen shows `Notice tone="error"` above the content.

## Banned component patterns

- Custom modals with `position: fixed`; use `Dialog` or `Sheet`.
- Custom dropdowns with outside-click detection; use `DropdownMenu`.
- Tooltips via the `title` attribute alone; use `Tooltip`.
- Native `<select>` styled by hand; use `Select`.
- Hand-styled `<button>` where `Button` fits.
- Labels smaller than `text-xs` (`text-[9px]`, `text-[10px]`).
- Any per-firm component, font or logo. Firms differ by colour tokens only.

## Adding a new composite

1. Build it in the consumer app first. If two TLB apps will use it, upstream it.
2. Add it under `src/components/composites/`, register it in `registry/registry.json`, demo it on the component board, list it here.
3. If it came from tlb-financial-tools, keep that file the source of truth and say so in the JSDoc header.
4. Any token it needs goes in the portal's `index.css` first, or in the design-system additions block if the portal does not use it.
