# Component Catalog

The approved component set for TLB internal apps. Use this table to choose the right primitive before writing any JSX. If a need is not covered here, raise it in PR review rather than inventing a new pattern.

## shadcn Primitives (Always Available)

These are installed via the shadcn CLI and live in `src/components/ui/`.

| Primitive | When to use | Source |
|---|---|---|
| `Button` | Any clickable action. Variants: default, secondary, destructive, outline, ghost, link. | `src/components/ui/button.tsx` |
| `Input` | Single-line text. Always paired with `Label`. | `src/components/ui/input.tsx` |
| `Textarea` | Multi-line text. Min 3 rows. | `src/components/ui/textarea.tsx` |
| `Label` | Every form field has one. Non-negotiable. | `src/components/ui/label.tsx` |
| `Select` | Single choice from a small known set (under 12 options). | `src/components/ui/select.tsx` |
| `Combobox` | Single choice from a long or async list. | Built from `Command` + `Popover`. |
| `Checkbox` | Boolean or multi-select. | `src/components/ui/checkbox.tsx` |
| `RadioGroup` | Single choice from 2 to 5 visible options. | `src/components/ui/radio-group.tsx` |
| `Switch` | Boolean toggle. Use over checkbox when the state has an immediate effect. | `src/components/ui/switch.tsx` |
| `Card` | Default container for a block of content. | `src/components/ui/card.tsx` |
| `Dialog` | Non-destructive modal interactions. | `src/components/ui/dialog.tsx` |
| `AlertDialog` | Destructive confirmations. Always. | `src/components/ui/alert-dialog.tsx` |
| `Sheet` | Side panel for secondary detail or quick edit. | `src/components/ui/sheet.tsx` |
| `Tooltip` | Short label or shortcut hint on hover or focus. Never for required info. | `src/components/ui/tooltip.tsx` |
| `Popover` | Compact UI floating off a trigger. Filter pickers, color pickers, inline edit. | `src/components/ui/popover.tsx` |
| `DropdownMenu` | Action menu attached to a button or row. | `src/components/ui/dropdown-menu.tsx` |
| `Table` | Static or simple tables. For sortable, filterable, paginated: see DataTable composite. | `src/components/ui/table.tsx` |
| `Tabs` | Top-level switching inside a page. Never inside a card. | `src/components/ui/tabs.tsx` |
| `Separator` | Visual divider. Replaces `<hr>`. | `src/components/ui/separator.tsx` |
| `Badge` | Status label. Variants: default, secondary, destructive, outline. | `src/components/ui/badge.tsx` |
| `Skeleton` | Loading placeholder. Use one per visible block. | `src/components/ui/skeleton.tsx` |
| `Sonner` (toast) | Transient confirmation or error. One toast per user action. | `src/components/ui/sonner.tsx` |
| `Form` | react-hook-form integration. | `src/components/ui/form.tsx` |
| `Accordion` | Collapsible content groups. Avoid for primary navigation. | `src/components/ui/accordion.tsx` |
| `Calendar` | Date selection. Pair with `Popover` for date pickers. | `src/components/ui/calendar.tsx` |
| `Progress` | Determinate progress. For indeterminate, use `Loader2` icon. | `src/components/ui/progress.tsx` |

## TLB Composites (Built on shadcn)

These live in `src/components/` outside `ui/`. They wrap shadcn primitives with TLB-specific defaults. Every internal app should have these:

| Composite | Location | Purpose |
|---|---|---|
| `AppShell` | `src/components/layout/app-shell.tsx` | Sidebar plus top bar plus content. Holds the route outlet. |
| `Sidebar` | `src/components/layout/sidebar.tsx` | Left nav. Collapsible. Shows TLB stacked logo at top. |
| `TopBar` | `src/components/layout/top-bar.tsx` | User menu, theme toggle, environment badge. |
| `PageHeader` | `src/components/layout/page-header.tsx` | Page title, subtitle, primary action slot. |
| `ThemeToggle` | `src/components/layout/theme-toggle.tsx` | Light or dark switch with localStorage persistence. |
| `DataTable` | `src/components/data/data-table.tsx` | @tanstack/react-table plus shadcn Table primitives. Includes pagination, sort, column visibility. |
| `EmptyState` | `src/components/data/empty-state.tsx` | Icon plus message plus primary action. |
| `KpiTile` | `src/components/data/kpi-tile.tsx` | Stat card. Label, value, optional delta, optional icon. |
| `ChartCard` | `src/components/data/chart-card.tsx` | Card with a header slot and a recharts container. |
| `FormField` | `src/components/forms/form-field.tsx` | Label plus input plus inline error. Wraps shadcn Form primitives. |
| `ConfirmDialog` | `src/components/feedback/confirm-dialog.tsx` | Standardized AlertDialog for destructive actions. |
| `Permission` | `src/components/auth/permission.tsx` | Children render only if the MSAL user has the required role. |
| `PortcoTheme` | `src/components/portco/portco-theme.tsx` | Scoped theme wrapper for portfolio companies (Improv, Echelon). Subtree picks up the portco's tokens. See [docs/12-portco-themes.md](./12-portco-themes.md). |

## Picking the Right Primitive

When unsure between similar primitives:

- **`Select` vs `Combobox`:** under 12 options that fit on screen, use `Select`. Long or async list, use `Combobox`.
- **`Dialog` vs `Sheet`:** the action is the focus, use `Dialog`. The action is a contextual edit of a list item, use `Sheet`.
- **`Dialog` vs `AlertDialog`:** destructive or irreversible, always `AlertDialog`. Otherwise `Dialog`.
- **`Tooltip` vs `Popover`:** label-only and read-only, use `Tooltip`. Anything interactive (filter, picker), use `Popover`.
- **`Badge` vs `Button`:** non-interactive status, use `Badge`. Interactive, use `Button variant="ghost"` or `Button variant="outline"`.
- **`Tabs` vs `Sheet`:** tabs are page-level navigation. A side detail panel is a `Sheet`.

## Banned Component Patterns

- Custom modal implementations using `position: fixed`. Use `Dialog` or `Sheet`.
- Custom dropdown menus using outside-click detection. Use `DropdownMenu`.
- Custom tooltips using `title` attribute or hover-only `aria-label`. Use `Tooltip`.
- Untyped HTML `<select>`. Use shadcn `Select`.
- `<button>` with hand-rolled styling. Use `Button`.
- HTML `<dialog>` element. Use `Dialog`.

## Adding a New Composite

A new composite enters `src/components/` only if it meets all of the following:

1. It is or will be used in two or more screens.
2. It is composed of shadcn primitives and conforms to the TLB tokens.
3. It is documented with a JSDoc block at the top of the file: purpose, props, example.
4. It carries a Storybook entry, if the app uses Storybook, or a runnable demo in `src/pages/_internal/components/`.

One-off compositions stay in the feature folder.
