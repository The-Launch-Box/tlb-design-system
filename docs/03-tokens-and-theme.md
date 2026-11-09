# Tokens and Theme

Every colour, font, radius and motion value the TLB apps use, and the rules that keep them consistent.

**Source of truth: tlb-financial-tools `apps/web/src/index.css`.** [`src/styles/tailwind.css`](../src/styles/tailwind.css) is a copy of that file. When a value changes, change the portal first and copy it here. Never fork a value. The one block here that the portal does not have is [Design-system additions](#design-system-additions).

## Files

| File | Holds |
|---|---|
| `src/styles/tailwind.css` | The whole token set: `@property` slots, `:root` runtime and firm slots, the `@theme` palette and semantic tokens, `@theme static` blocks, the `.dark` track, the base layer, the flapboard and tool-card motion, then the design-system additions. |
| `index.html` | The Google Fonts link and the pre-paint theme script. See [Fonts](#fonts). |
| `src/lib/firm-themes.ts` | The firm list and `applyFirmTheme()`. See [12-firm-themes.md](./12-firm-themes.md). |
| `starter-kit/tailwind.css`, `starter-kit/index.html` | The same two files, ready to drop into a new app. |

## Fonts

Three Google Fonts faces, loaded in `index.html` with `media="print"` and an `onload` swap so they never block first paint:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
  rel="stylesheet" media="print" onload="this.media='all'"
/>
```

| Token | Value | Used for |
|---|---|---|
| `--font-display` | `"Bebas Neue", "Arial Narrow", Impact, sans-serif` | Page titles (`font-display text-2xl uppercase`), card titles, uppercase labels, KPI values. |
| `--font-brand` | `"Bebas Neue Pro", "Bebas Neue", ...` | The header wordmark and the flapboard only. Bold italic. |
| `--font-sans` | `"Inter", ui-sans-serif, system-ui, ...` | Body text. The `body` base rule sets it at `0.875rem`, `line-height: 1.5`. |
| `--font-mono` | `"JetBrains Mono", "Fira Code", "Cascadia Code", Consolas, ...` | Figures, identifiers, header controls, anything tabular. |

**Bebas Neue Pro is licensed.** The portal self-hosts one cut, `public/fonts/BebasNeuePro-BoldItalic.otf`, declared with `@font-face` in the token file and preloaded in `index.html`. This public repo does not ship the file, so here `--font-brand` falls back to Bebas Neue. A TLB app copies the file from the portal repo.

Every weight in the link is used. Do not add Manrope, Helvetica, Arial Black or any other face: older copies of this doc named them, and five tools still declare them standalone. The portal never loaded them.

## TLB brand palette

Literal colour lives only inside `@theme`. Everything else references a token.

| Token | Value | Notes |
|---|---|---|
| `--color-tlb-orange` | `#FF6400` | The brand orange. Also the default `--accent`. Older docs said `#FF6600`; the portal is `#FF6400`. |
| `--color-tlb-dark-orange` | `#FF3300` | `--color-destructive`. |
| `--color-tlb-black` / `-white` | `#000000` / `#FFFFFF` | |
| `--color-tlb-charcoal` | `#1A1A1A` | Light-theme `secondary`. |
| `--color-tlb-gray-50` / `-100` | `#F5F5F5` / `#E5E5E5` | |
| `--color-tlb-orange-tint` | `#FFF8F4` | Light-theme `accent` (hover wash). |
| `--color-tlb-green` | `#1F9D55` | Approved / success status. |

## Semantic tokens

These are the only colour names valid in JSX: `bg-background`, `bg-card`, `bg-muted`, `bg-popover`, `bg-primary`, `bg-secondary`, `bg-accent`, `bg-destructive`, `text-foreground`, `text-muted-foreground`, `text-primary`, `text-destructive`, `border-border`, `border-input`, `ring-ring`, each `-foreground` pair, plus the surface and signal families below.

| Token | Light | Dark |
|---|---|---|
| `background` | `#F6F8FA` | `#0d1117` |
| `foreground` | `#1F2328` | `#f0f6fc` |
| `card` | `#FFFFFF` | `bg-1 #161b22` mixed 7% with the firm's primary |
| `popover` | `#FFFFFF` | `#161b22` |
| `primary` / `-foreground` | `var(--accent)` / `var(--accent-foreground)` | same (the firm accent) |
| `secondary` | `#1A1A1A` on white | `#1c2128` |
| `muted` / `-foreground` | `#EFF2F6` / `#57606A` | `#1c2128` / `#8b949e` |
| `accent` / `-foreground` | `#FFF8F4` / black | `#1c2128` / `#f0f6fc` |
| `destructive` | `#FF3300` | `#FF3300` |
| `border` | `#CCD4DB` | `#30363d` |
| `input` | `#CCD4DB` | `#1c2128` |
| `ring` | `var(--accent)` | `var(--accent)` |

`primary` and `ring` follow the active firm: they read `--accent`, which `applyFirmTheme()` rewrites. `--accent-foreground` is the label colour chosen to sit on that firm's fill (black for TLB orange).

### Surface ladder

| Utility | Light | Dark | Use |
|---|---|---|---|
| `bg-bg-canvas` | `#F6F8FA` | `#0d1117` + 5% firm primary | Page canvas (the `AppShell` root). |
| `bg-bg-surface` | `#FFFFFF` | `#161b22` + 7% firm primary | Panels. |
| `bg-bg-raised` | `#EFF2F6` | `#1c2128` | Hover rows, wells, icon tiles. |
| `bg-bg-overlay` | `#FFFFFF` | `#262c36` | Menus, popovers. |
| `bg-bg-header` | 10% accent into white | 32% firm primary into `#0d1117` | The sticky portal header (`bg-bg-header/90` + 10px blur). |
| `border-border-soft` | `#E4E8ED` | `#21262d` | Inner dividers. |
| `text-fg-faint` | `#6E7781` | `#6e7681` | Tertiary text. |
| `bg-accent-wash` | 14% accent | 15% accent into `#0d1117` | Selected or active control (Admin link, open app switcher). |
| `bg-accent-soft` | 74% accent into white | same | |
| `text-accent-ink` | `var(--accent-ink)` | same | The accent used as text: tuned per theme so acid brands stay legible on white. |
| `bg-mark` / `bg-mark-hover` | accent ink | accent soft / accent | Chart bars and sparkline fills. Light marks use ink; dark keeps the bright fill. |

## Light theme vs dark theme

Both themes are real products, gated by tests in the portal (contrast for light, a token baseline for dark). Neither is the afterthought.

- **Default is dark.** `<html class="dark">` ships in `index.html`; a pre-paint script reads `localStorage.theme` and swaps to `light` before React mounts, so a light-mode user never sees a dark flash. `next-themes` (`attribute="class"`, `storageKey="theme"`) takes over after mount. The `ThemeToggle` composite flips it.
- **Two tracks, not one colour dimmed.** `:root` and `@theme` hold the light track; `.dark` holds the dark one. Any palette you add needs both.
- **Contrast gates.** Light colours are derived against **4.5:1** when used as text and **3:1** when used as a graphical mark. A colour derived for a chart mark is not automatically legible as ink. The portal derives light tracks with a per-colour OKLCH lightness clamp (`scripts/derive-chart-light-tracks.mjs` there): hue and chroma stay, lightness drops until the gate clears.
- **Re-run the firm theme on theme flip.** The accent, ink and chart slots are theme-specific, so `applyFirmTheme(firm, isDark)` runs on firm change **and** on theme change.

## Data-signal tokens

| Utility | Light | Dark | Meaning |
|---|---|---|---|
| `text-positive` | `#00A147` | `#4ade80` | Gain, pass, up. |
| `text-negative` | `#E56062` | `#f87171` | Loss, fail, down. |
| `bg-positive-dim` / `bg-negative-dim` | `#1c3829` / `#3a2122` | same | Dark wells for tinted cells. |
| `text-warning` | `#C27C18` | `#f6ad55` | Aging, caution. Not a loss. |
| `bg-warning-dim` | warning at 14% | `#3a3320` | Fill behind warning text. |
| `text-info` | `#2369B9` | `#58a6ff` | Neutral references, in-progress states. 5.5:1 on the light card, 6.9:1 on the dark. |
| `bg-info-dim` | info at 12% | `#16304d` | Fill behind info text. |
| `bg-bg-sunken` | `#EFF2F6` | `#0d1117` | A well below the surface: code, raw payloads. |

Status colours are **never firm-tinted**: the colour is the meaning, and firm tinting would paint a warning in Echelon's acid yellow. Colour is never the only carrier of meaning: every status pairs colour with an icon and its written name.

## Chart series

| Token | Resolves to | Notes |
|---|---|---|
| `--color-chart-1..4` | `var(--firm-chart-1..4)` | Follow the active firm. TLB: orange, dark orange, cyan (`#33FFFF` dark, `#009B9D` light), slate. |
| `--color-chart-5` | `#4A4A4A` | Fixed. |
| `--color-chart-1..4-ink` | `var(--firm-chart-N-ink)` | The series colour used as **text** (legend values, labels). In a `@theme static` block. |

In recharts, pass the variable: `fill="var(--color-chart-1)"`. recharts is the only chart library. A tool that hardcodes its own chart hex is only correct standalone.

## Tool palettes

App-specific palettes from the portal, kept so a rebuilt app matches it exactly. All have light and dark tracks and are never firm-tinted. They sit in `@theme static` so Tailwind keeps them even before a utility uses them.

| Prefix | Owner | Contract |
|---|---|---|
| `--color-inv-*` | Invoicing | Seven statuses: drafted, scheduled, sent, partial, paid, unsent, cancelled. Pill text, so 4.5:1. |
| `--color-cat-1..14` | Expense Tracker | 14 spend categories. **The order is the contract**: cat-N is category N. |
| `--color-po-slot-1..5`, `--color-po-tooltip` | People Ops | Breakdown slots assigned in fixed order by the API. |
| `--color-rc-*` | Rate Comparison | Cost and bill series; within / above / below target. |
| `--color-cp-*` | Capacity Planner | Utilization bands under / healthy / hot / over, plus soft, run rate, pipeline. |

## Radii

`--radius: 0.375rem` (6px). `sm` 4px, `md` 6px, `lg` 8px, `xl` 10px.

## The `@theme static` gotcha

Tailwind v4 only emits theme variables it sees used. A token nothing references yet is tree-shaken out and resolves to **transparent at runtime**, failing silently as a colour. Tokens consumed only through `var()` (chart inks, tool palettes) therefore live in `@theme static`. Drop `static` only once a utility uses the token.

## Design-system additions

Not in the portal. They support composites only this repo ships (`ReviewItemCard`, `AuditTimeline`, `LiveSync`, `SignalBadge`):

- Motion: `--duration-fast|base|slow` (120 / 180 / 280ms), `--ease-standard` `cubic-bezier(0.2, 0, 0, 1)`. (`--ease-out` is deliberately not redefined: it would change Tailwind's `ease-out` utility across the portal.)
- Utilities: `eyebrow` (uppercase mono label), `figures` (tabular mono numerals), `lift` (2px hover lift), `pip` (status dot).

**A consumer that installs one of those composites must copy this block into its own token file.** The info, warning-dim and bg-sunken colours they also use are in the portal's token file itself since tlb-financial-tools#366.

## Color rules to enforce

1. No hex, `rgb()` or `hsl()` outside an `@theme` block (or `:root` / `.dark` slot definitions in the token file).
2. Semantic utilities only in JSX. Never `bg-tlb-orange` for an action: use `bg-primary`, so the firm theme applies.
3. Any token a tool's components use must exist in the **host** CSS (the portal's `index.css`), or it renders unstyled in production. A tool's own `index.css` never loads in the portal.
4. New palettes get both tracks, derived, not hand-picked.

## What to do if you need a new token

Add it to tlb-financial-tools `apps/web/src/index.css` (both tracks, `static` if nothing uses it yet), then copy the file here and update this table. If only a design-system composite needs it, add it to the additions block and say so in its comment.
