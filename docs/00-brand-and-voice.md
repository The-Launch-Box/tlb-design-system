# Brand and Voice

The product-side brief for everything in this repo: what TLB is, who uses it, how it talks, and how it looks. Read this first if you are about to write copy, lay out a screen, or design a new asset. The engineering-side primer is in [01-decision-record.md](./01-decision-record.md); the token reference is in [03-tokens-and-theme.md](./03-tokens-and-theme.md).

## 1. Product context

**The Launch Box** is an *internal tool platform*, not a consumer product. It hosts a suite of specialized financial tools behind a single shell: think of it as the operating surface where a firm's analysts run reconciliations, monitor exposure, build pricing spreadsheets, and audit ledgers. Users are professionals who live in the product all day, so the design optimizes for **density, precision, scannability, and trust** over marketing polish.

The aesthetic is **"developer-grade financial terminal"**: a GitHub-dark canvas by default with an equally designed light theme, crossed with the data discipline of a trading terminal (tabular monospaced numbers, strict green/red signal), and branded with a single **accent** reserved for action and focus: TLB orange, or the active firm's brand colour. The reference implementation is the tlb-financial-tools portal; [14-tlb-financial-tools-blueprint.md](./14-tlb-financial-tools-blueprint.md) describes it.

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

Dark is the default and light is a full product, not an afterthought: both ship in the portal and both are tested. `<html class="dark">` is the default; next-themes swaps to light. Every colour has a light and a dark track (see [03-tokens-and-theme.md](./03-tokens-and-theme.md#light-theme-vs-dark-theme)).

### Color

- **Surfaces climb a ladder, not a gradient.** Dark: `bg-0 #0d1117` (canvas) → `bg-1 #161b22` (cards) → `bg-2 #1c2128` (inputs, hover rows) → `bg-3 #262c36` (menus). Light: canvas `#F6F8FA`, card `#FFFFFF`, well `#EFF2F6`. Use the semantic utilities (`bg-bg-canvas|surface|raised|overlay`), a hairline border, and no drop-shadows on flat panels.
- **The accent is sacred.** TLB orange `#FF6400`, or the active firm's accent, is reserved for **primary action, active or selected state, and focus**. Never decoration, never a large fill. Its label colour is `--accent-foreground` (black on TLB orange). Accent as text uses `text-accent-ink`, tuned per theme.
- **One colour per firm, nothing else.** A firm retints the accent, the header tint and the chart series through its token set. It never brings its own fonts, components or logo. See [12-firm-themes.md](./12-firm-themes.md).
- **Green and red are data-only.** `text-positive` / `text-negative` (light `#00A147` / `#E56062`, dark `#4ade80` / `#f87171`) mean up or down, gain or loss, pass or fail, and nothing else. See [03-tokens-and-theme.md](./03-tokens-and-theme.md#data-signal-tokens).
- **Borders over shadows.** A hairline (`border-border`: `#CCD4DB` light, `#30363d` dark) defines almost every container.

### Type

- **Inter** is the body family (`--font-sans`), at `0.875rem` / 1.5 on `body`. Weights 400 to 700.
- **JetBrains Mono** (`--font-mono`) for figures, identifiers, header controls and anything tabular, with `tabular-nums` where columns align.
- **Bebas Neue** (`--font-display`) for page titles (`font-display text-2xl uppercase`), card titles and display figures. Always uppercase.
- **Bebas Neue Pro Bold Italic** (`--font-brand`) only for the header wordmark ("ACCELERATED BY THE LAUNCH BOX") and the dashboard flapboard. It is a licensed, self-hosted file.
- All three web fonts load from Google Fonts in `index.html`. No other faces.
- Dense scale: body 14px, labels 11 to 12px (never below `text-xs` on tiles), page titles 24px, dashboard figures 48px, hero up to 80px.

### Spacing, radii, shape

- **4px base grid.** Components breathe on multiples of 4 (`8 / 12 / 16 / 24`).
- **Tight radii** (`6px` buttons and inputs, `8px` cards, `12px` modals). Nothing pillowy: the corners read "precise instrument", not "friendly app". Pills (`999px`) only for status badges and delta chips.
- Cards equal `bg-card` fill + 1px `border-border` + `rounded-lg` + at most `shadow-sm`. They are defined by border, not float.

### Motion

- **Restrained and fast.** `120 to 180ms`, `cubic-bezier(0.2, 0, 0, 1)`. A firm change animates the accent over 650ms. Use opacity / position fades and subtle background-color transitions. No bounces, no springs, no parallax, no decorative animation. Numbers may tick or flash a brief positive or negative tint on update: that is the one expressive motion allowed. Tokens: `--duration-fast|base|slow`, `--ease-standard`, `--ease-out`.

### States

- **Hover:** raise one rung on the ladder (`bg-1 → bg-2`) and / or lift text from muted to default. Buttons lighten.
- **Press or active:** darken (orange → dark-orange); no scale-shrink on data UI (it is distracting in dense grids). Selected rows get the orange wash + a 2px left orange rule.
- **Focus:** a 2px `--color-ring` outline at 2px offset (the base layer sets it on `:focus-visible`); shadcn controls add a `ring-[3px] ring-ring/50`. The ring follows the firm accent. Keyboard focus is highly visible; operators are keyboard-driven.
- **Disabled:** drop to `bg-2` fill, faint text, `not-allowed` cursor.

### Imagery and texture

- TLB is **chrome-light**: almost no photography or illustration inside the product. The "imagery" is the data itself: sparklines, mini bar charts, heatmap cells, tabular grids. When charts appear they are flat, thin-stroked, and use the signal palette (orange for the focused series, green or red for direction, muted gray for context). No gradients-as-decoration, no glow, no glassmorphism, no grain.

### Transparency and blur

- Used only for **scrims and protection**: a `rgba(13, 17, 23, 0.7)` + `backdrop-blur(8px)` scrim behind modals, and a top or bottom fade on scrollable dense regions so rows do not hard-clip. Never frosted-glass cards.

### Layout rules

- **Portal shell:** a sticky 56px header (brand, section label, app switcher, theme toggle, firm and department pickers, account) over a centred 1280px column; the dashboard runs full width with a sticky tool sidebar. Every page owns its own `py-6`. Tables get sticky headers. The `AppShell` composite encodes the header and column; [14-tlb-financial-tools-blueprint.md](./14-tlb-financial-tools-blueprint.md) has the rest.

## 4. Iconography

- **System:** [Lucide](https://lucide.dev) via `lucide-react`, the 1.5 to 2px stroke, rounded-join line icon set. It matches TLB's precise, modern, low-ornament feel and pairs cleanly with Inter. No other icon library is allowed (see [AGENTS.md](../AGENTS.md#libraries-you-must-not-add)).
- **Usage rules:**
  - Default icon stroke color is `text-muted-foreground`; it lifts to `text-foreground` on hover / active, and to `text-tlb-orange` only when it represents the active action.
  - Standard sizes: `16px` inline / in-row, `18 to 20px` in toolbars and nav, `24px` rarely (empty states). Stroke width `1.75`.
  - Icons are **functional, not decorative**, every icon labels an action or status. Do not pair an icon with a metric just to fill space.
  - Common glyphs: `TrendingUp` / `TrendingDown`, `LayoutDashboard`, `Table2`, `Wallet`, `ArrowLeftRight` (reconcile), `FileSpreadsheet`, `ShieldCheck` (audit), `Search`, `Settings`, `Download`, `Bell`, `Chevron*`.
- **Unicode as icons:** the triangle markers `▲ ▼` and arrows `→` are used inline in numeric / data contexts (deltas, links) where a full icon would be too heavy. The real minus `−` is used in figures. The `Delta` composite encodes this convention.
- **Emoji:** never.
- **Portal header mark:** the `launch-box-wordmark` lockup: the vector arrow (`public/brand/arrow.svg`, 22px) followed by the "ACCELERATED BY THE LAUNCH BOX" wordmark in `font-brand`, linking back to `https://os.thelaunchbox.com`. `AppShell` renders it by default; every new app uses it in the header instead of `tlb-logo.png`. The lockup is the only logo in any TLB app header, whatever the active firm. Assets and a plain HTML/CSS version live in `public/launch-box-wordmark/`.
- **Brand mark:** `public/tlb-logo.png` is the official logo. It is a stacked, left-aligned wordmark "THE LAUNCH / BOX" set in a heavy condensed grotesque, in white, with a single solid orange `#FF6400` launch arrow (pointing up-and-to-the-right) at the top-right, all on a solid black field. There is no box outline or container in the mark. Clear-space: keep at least the height of one wordmark line clear on all sides. The logo's native background is black; on lighter dark surfaces place it inside a rounded black tile so it reads as a deliberate brand lozenge. The `BrandMark` composite in `src/components/composites/brand-mark.tsx` renders this lozenge at three sizes.

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
| Firm theming (colours only) | [12-firm-themes.md](./12-firm-themes.md) |
| Rebuilding the portal | [14-tlb-financial-tools-blueprint.md](./14-tlb-financial-tools-blueprint.md) |
| AI agent rules | [../AGENTS.md](../AGENTS.md) |
