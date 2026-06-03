# Brand and Voice

The product-side brief for everything in this repo: what TLB is, who uses it, how it talks, and how it looks. Read this first if you are about to write copy, lay out a screen, or design a new asset. The engineering-side primer is in [01-decision-record.md](./01-decision-record.md); the token reference is in [03-tokens-and-theme.md](./03-tokens-and-theme.md).

## 1. Product context

**The Launch Box** is an *internal tool platform*, not a consumer product. It hosts a suite of specialized financial tools behind a single shell: think of it as the operating surface where a firm's analysts run reconciliations, monitor exposure, build pricing spreadsheets, and audit ledgers. Users are professionals who live in the product all day, so the design optimizes for **density, precision, scannability, and trust** over marketing polish.

The aesthetic is **"developer-grade financial terminal"**: a dark-first surface in the spirit of a modern IDE / GitHub-dark canvas, crossed with the data discipline of a trading terminal (tabular monospaced numbers, strict green/red signal), and branded with a single hot **TLB orange** accent reserved for action and focus.

## 2. Content fundamentals (voice and copy)

TLB copy is written the way good financial software talks: **terse, precise, and operator-facing.** It respects that the reader is an expert under time pressure.

- **Tone:** Confident, factual, calm. No hype, no exclamation marks, no marketing adjectives ("powerful", "seamless", "revolutionary" are banned). State what a thing does and what state it's in.
- **Person:** Address the user as "you" sparingly; mostly write **imperative, object-first labels**, *"Run reconciliation"*, *"Export ledger"*, *"Open positions (142)"*. Avoid "we".
- **Casing:**
  - **Sentence case** for body copy, descriptions, helper text, and most buttons (*"Reconcile ledgers across desks"*).
  - **UPPERCASE with wide tracking** for eyebrows, table column headers, and metric labels (*"ASSETS UNDER MGMT"*, *"NOTIONAL (USD)"*). This is a signature TLB device: small, faint, tracked-out labels above dense data.
  - **Title Case** only for proper product or desk names (*"Global Macro"*, *"Portfolio Risk Engine"*).
- **Numbers are first-class.** Always show currency symbol, thousands separators, and fixed decimals (`$1,204,889.50`). Deltas always carry sign and direction (`▲ +3.42%`, `▼ −1.08%`, never bare). Use the real minus glyph `−` (U+2212), not a hyphen, in financial figures.
- **Timestamps and provenance** are part of the voice: *"Last synced 2 minutes ago · 14,208 rows scanned"*. TLB always tells you how fresh and how complete the data is.
- **Emoji:** Never. Not in product, not in copy. Status is shown with colored dots or badges, not icons-as-emotion.
- **Em dashes:** Never. Use commas, periods, colons, or parentheses. (See [AGENTS.md](../AGENTS.md).)
- **Microcopy examples:**
  - Empty state: *"No unreconciled items. Last run 4 minutes ago."*
  - Error: *"Invalid settlement date."* (short, no apology, no blame)
  - Destructive confirm: *"Delete desk? This removes 1,204 linked positions."*

## 3. Visual foundations

The single most important rule: **TLB is dark-first.** Build against the dark surface ladder by default. The light theme exists for marketing surfaces and the occasional consumer-facing export. Switch with the `.dark` class on `<html>` (see [03-tokens-and-theme.md](./03-tokens-and-theme.md#light-theme-vs-dark-theme)).

### Color

- **Surfaces climb an elevation ladder, not a gradient:** `bg-0 #0d1117` (app canvas) → `bg-1 #161b22` (panels, cards, sidebar) → `bg-2 #1c2128` (inputs, hover rows, table headers) → `bg-3 #262c36` (menus, popovers, active). Higher is lighter. Never use drop-shadows to fake elevation on flat panels; use the ladder + a `#30363d` hairline border. Tokens live as `--color-tlb-bg-0|1|2|3` and surface utility tokens `--color-bg-canvas|surface|raised|overlay` in `src/styles/tailwind.css`.
- **Orange is sacred.** `#FF6600` is reserved for **primary action, active or selected state, and focus only.** It is never decorative, never a background fill for large areas, never used for data. Hover lightens to `#FF844D` (`--color-tlb-orange-soft`); press darkens to `#FF3300` (`--color-tlb-dark-orange`); a near-black `#2B1A0F` wash (`--color-tlb-orange-dim`) marks selection on dark rows.
- **Green and red are data-only.** `#4ade80` (`--color-tlb-positive`) / `#f87171` (`--color-tlb-negative`) mean *up or down, gain or loss, pass or fail* and nothing else. Dim companion fills (`--color-tlb-positive-dim`, `--color-tlb-negative-dim`) tint cells and tracks. Never use green or red for generic UI chrome. See the full data-signal table in [03-tokens-and-theme.md](./03-tokens-and-theme.md#data-signal-tokens).
- **Borders over shadows.** On dark, a `#30363d` hairline (`--color-tlb-border-dark`) defines almost every container. Shadows are subtle and only for true overlays (menus, modals, popovers).

### Type

- **Manrope** (geometric humanist sans) is the body family for everything in product UI. Weights 400 / 500 / 600 / 700 / 800. Tight negative tracking on large sizes. Loaded via Google Fonts; declared as `--font-sans`.
- **JetBrains Mono** is the mono family for **every number, ticker, price, P&L, ID, and code**, always with `tabular-nums` so columns align. The sans + mono split is the core typographic signature: prose in Manrope, data in mono. Declared as `--font-mono`.
- **Bebas Neue Pro** with `Arial Black` and `Impact` fallbacks is the display family (`--font-display`), used for marketing headers and large brand-mark callouts. Always uppercase with tight tracking; the `<h1>`..`<h4>` base layer in `tailwind.css` applies this automatically.
- Type scale is tuned dense: product body is **14px**, labels 11 to 12px, metrics 26 to 30px mono. Display 44px is reserved for hero KPIs.

### Spacing, radii, shape

- **4px base grid.** Components breathe on multiples of 4 (`8 / 12 / 16 / 24`).
- **Tight radii** (`6px` buttons and inputs, `8px` cards, `12px` modals). Nothing pillowy: the corners read "precise instrument", not "friendly app". Pills (`999px`) only for status badges and delta chips.
- Cards equal `bg-1` fill + `#30363d` 1px border + `8px` radius + at most `shadow-sm`. They are defined by border, not float.

### Motion

- **Restrained and fast.** `120 to 180ms`, `cubic-bezier(0.2, 0, 0, 1)`. Use opacity / position fades and subtle background-color transitions. No bounces, no springs, no parallax, no decorative animation. Numbers may tick or flash a brief positive or negative tint on update: that is the one expressive motion allowed. Tokens: `--duration-fast|base|slow`, `--ease-standard`, `--ease-out`.

### States

- **Hover:** raise one rung on the ladder (`bg-1 → bg-2`) and / or lift text from muted to default. Buttons lighten.
- **Press or active:** darken (orange → dark-orange); no scale-shrink on data UI (it is distracting in dense grids). Selected rows get the orange wash + a 2px left orange rule.
- **Focus:** always a `3px rgba(255, 102, 0, 0.30)` orange glow ring (`--shadow-focus-ring`) + orange border. Keyboard focus is highly visible; operators are keyboard-driven.
- **Disabled:** drop to `bg-2` fill, faint text, `not-allowed` cursor.

### Imagery and texture

- TLB is **chrome-light**: almost no photography or illustration inside the product. The "imagery" is the data itself: sparklines, mini bar charts, heatmap cells, tabular grids. When charts appear they are flat, thin-stroked, and use the signal palette (orange for the focused series, green or red for direction, muted gray for context). No gradients-as-decoration, no glow, no glassmorphism, no grain.

### Transparency and blur

- Used only for **scrims and protection**: a `rgba(13, 17, 23, 0.7)` + `backdrop-blur(8px)` scrim behind modals, and a top or bottom fade on scrollable dense regions so rows do not hard-clip. Never frosted-glass cards.

### Layout rules

- **Fixed app shell:** left sidebar (nav across tools) + top bar (context, search, account) are fixed; only the content region scrolls. Tables get sticky headers and often a sticky first column. Dense toolbars sit directly above grids. Generous outer canvas padding (`24px`), tight internal padding in data rows (`10 to 14px`). The `AppShell` composite in `src/components/composites/app-shell.tsx` encodes this contract.

## 4. Iconography

- **System:** [Lucide](https://lucide.dev) via `lucide-react`, the 1.5 to 2px stroke, rounded-join line icon set. It matches TLB's precise, modern, low-ornament feel and pairs cleanly with Manrope. No other icon library is allowed (see [AGENTS.md](../AGENTS.md#libraries-you-must-not-add)).
- **Usage rules:**
  - Default icon stroke color is `text-muted-foreground`; it lifts to `text-foreground` on hover / active, and to `text-tlb-orange` only when it represents the active action.
  - Standard sizes: `16px` inline / in-row, `18 to 20px` in toolbars and nav, `24px` rarely (empty states). Stroke width `1.75`.
  - Icons are **functional, not decorative**, every icon labels an action or status. Do not pair an icon with a metric just to fill space.
  - Common glyphs: `TrendingUp` / `TrendingDown`, `LayoutDashboard`, `Table2`, `Wallet`, `ArrowLeftRight` (reconcile), `FileSpreadsheet`, `ShieldCheck` (audit), `Search`, `Settings`, `Download`, `Bell`, `Chevron*`.
- **Unicode as icons:** the triangle markers `▲ ▼` and arrows `→` are used inline in numeric / data contexts (deltas, links) where a full icon would be too heavy. The real minus `−` is used in figures. The `Delta` composite encodes this convention.
- **Emoji:** never.
- **Brand mark:** `public/tlb-logo.png` is the official logo. It is a stacked, left-aligned wordmark "THE LAUNCH / BOX" set in a heavy condensed grotesque, in white, with a single solid orange `#FF6600` launch arrow (pointing up-and-to-the-right) at the top-right, all on a solid black field. There is no box outline or container in the mark. Clear-space: keep at least the height of one wordmark line clear on all sides. The logo's native background is black; on lighter dark surfaces place it inside a rounded black tile so it reads as a deliberate brand lozenge. The `BrandMark` composite in `src/components/composites/brand-mark.tsx` renders this lozenge at three sizes.

## 5. Cross-references

| Topic | Authoritative doc |
|---|---|
| Stack and library choices | [01-decision-record.md](./01-decision-record.md) |
| Installing in a consumer repo | [02-installation.md](./02-installation.md) |
| Full token reference | [03-tokens-and-theme.md](./03-tokens-and-theme.md) |
| Picking a component | [04-component-catalog.md](./04-component-catalog.md) |
| Common patterns | [05-patterns.md](./05-patterns.md) |
| Accessibility | [06-accessibility.md](./06-accessibility.md) |
| Icons and charts | [07-icons-and-charts.md](./07-icons-and-charts.md) |
| Do and don't | [09-do-and-dont.md](./09-do-and-dont.md) |
| Portco theming | [12-portco-themes.md](./12-portco-themes.md) |
| AI agent rules | [../AGENTS.md](../AGENTS.md) |
