# Portco Themes

TLB portfolio companies have their own brand identities. When a TLB repo needs to surface portco-branded content (a client-facing page, a branded export, a data view inside an internal tool that visualizes a portco's data), wrap that subtree in the `<PortcoTheme>` composite. The TLB app shell stays TLB. The portco subtree restyles automatically.

This is the operational form of the rule already in `docs/03-tokens-and-theme.md`: *"If a client palette is referenced inside a tool that surfaces a portco's branded data, scope those colors to the data view, not to the app shell."*

## When to Use a Portco Theme

| Surface | Use a portco theme? |
|---|---|
| Client-facing landing page or marketing site rendered from a TLB repo | Yes |
| Portco-branded PDF or HTML export | Yes |
| A data view inside a TLB internal tool that visualizes a single portco's data | Yes, scoped to that view only |
| The TLB app shell, sidebar, top bar, or admin navigation | No |
| Multi-portco dashboards or roll-ups | No, stay on TLB tokens |
| Cross-portco comparison tables or summary pages | No |

If you cannot answer "this surface is owned visually by a single portco," default to TLB tokens.

## The Wrapper Contract

```tsx
import { PortcoTheme } from "@/components/portco/portco-theme";

<PortcoTheme portco="echelon">
  {/* every shadcn primitive inside picks up Echelon tokens */}
  <Button>Get in touch</Button>
  <Card>...</Card>
</PortcoTheme>
```

Props:

| Prop | Type | Notes |
|---|---|---|
| `portco` | `"improv" \| "echelon"` | Required. Sets `data-portco` on the root div. |
| `className` | `string` | Forwarded; merged with the default surface classes via `cn()`. |
| All standard `div` props | | Spread to the root. |

The wrapper renders a single `<div data-portco="<name>">` with `bg-background text-foreground font-sans`. Token resolution does the rest.

## Token Maps

### Echelon Risk + Cyber

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#000066` (Echelon blue) |
| foreground | `--color-foreground` | `#E0FF00` (Echelon yellow) |
| card | `--color-card` | `#00004D` (Echelon blue dark) |
| card-foreground | `--color-card-foreground` | `#F2F2F2` (off-white) |
| primary | `--color-primary` | `#E0FF00` |
| primary-foreground | `--color-primary-foreground` | `#000066` |
| secondary | `--color-secondary` | `#2A3DA8` (Echelon blue light) |
| destructive | `--color-destructive` | `#FF0033` (Echelon red) |
| accent | `--color-accent` | `#FF0033` |
| border | `--color-border` | `#2A3DA8` |
| ring | `--color-ring` | `#E0FF00` |
| display font | `--font-display` | Barlow Condensed / Oswald / Impact |
| body font | `--font-sans` | Inter / system grotesk |
| radii | `--radius`, `--radius-*` | `0` (sharp edges) |

### Improv (Improvizations, LLC)

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#000B23` (Improv navy) |
| foreground | `--color-foreground` | `#F2F2F2` (off-white) |
| card | `--color-card` | `#00050F` (Improv navy dark) |
| primary | `--color-primary` | `#9CD0D8` (Improv teal) |
| primary-foreground | `--color-primary-foreground` | `#000B23` |
| secondary | `--color-secondary` | `#1A2238` (Improv muted) |
| accent | `--color-accent` | `rgba(156, 208, 216, 0.15)` (teal soft) |
| accent-foreground | `--color-accent-foreground` | `#9CD0D8` |
| border | `--color-border` | `#1A2238` |
| ring | `--color-ring` | `#9CD0D8` |
| display font | `--font-display` | Lustria / Iowan Old Style / Georgia |
| body font | `--font-sans` | Work Sans / Helvetica Neue |
| radii | `--radius` | `0.125rem` (subtle) |

All tokens live in `src/styles/tailwind.css` under the `[data-portco="..."]` selectors. They are not declared anywhere else. If a portco needs another color, add it to the same scope; do not introduce hex anywhere else in the repo.

## Composite Index

Portco composites live in `src/components/portco/<name>/` and are exported from a per-portco barrel.

### Echelon (`src/components/portco/echelon/`)

| Composite | Purpose |
|---|---|
| `EchelonHero` | Two-column hero with optional yellow `<mark>` highlight on the second clause. |
| `EchelonProcessStep` | Numbered process step (Assess / Strategize / Implement / Level Up). |
| `EchelonStatCallout` | Centered display-figure stat in bold uppercase. |
| `EchelonQuoteCard` | Testimonial card with yellow attribution on Echelon-blue surface. |
| `EchelonMarker` | Inline `<mark>` highlight for yellow-on-blue text emphasis. |
| `EchelonLogoStacked`, `EchelonLogoWordmark` | Brand mark; uses `currentColor`. |

### Improv (`src/components/portco/improv/`)

| Composite | Purpose |
|---|---|
| `ImprovHero` | Serif headline hero matching "Elevating Possibilities. Inspiring Results." |
| `ImprovJourneyStep` | One step in the IGNITE / FORGE / EVOLVE row, teal accent on phase word. |
| `ImprovStatCallout` | Large teal display number plus body label. |
| `ImprovQuoteCard` | Testimonial card with serif italic quote and teal attribution. |
| `ImprovPillButton` | Pill-shaped `Button` wrapper for primary CTAs. |
| `ImprovLogo` | Improv wordmark SVG; uses `currentColor`. |

## Brand and Portco Logo Assets

The `currentColor` logo components above are themeable inline marks. For the *official* brand artwork (full color, fixed proportions), use the static files under `public/brand/`. They are deployed with the demo site and the registry, so consumers can pull them from the Pages URL or copy them into their own `public/`.

| Brand | Files (`public/brand/<brand>/`) | Format | Surface |
|---|---|---|---|
| The Launch Box | `tlb/tlb-square.png`, `tlb/tlb-horizontal.png` | PNG | Light (black wordmark + orange mark) |
| Echelon | `echelon/echelon-logo-long.svg`, `echelon-logo-stacked.svg`, `echelon-wordmark.svg`, `echelon-wordmark-light.svg`, `echelon-glitch.svg`, `echelon-glitch-light.svg`, `echelon-glitch-yellow.svg` | SVG | `*-light` variants for dark surfaces; others carry their own ink |
| Improv | `improv/improv-logo.png`, `improv-icon.png`, `improv-logo-reversed.png`, `improv-icon-reversed.png` | PNG | Base files on light; `*-reversed` on dark |

The root `public/tlb-logo.png` is the official TLB square mark, consumed by the `BrandMark` composite.

Reference these from app code through the Vite base so they resolve on the project Pages path (`/tlb-design-system/`), not the domain root:

```tsx
const brandAsset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

<img src={brandAsset("brand/tlb/tlb-square.png")} alt="The Launch Box" />
```

A live gallery of every asset renders in the TLB tab of `src/App.tsx` (`BrandLogoShowcase`). This curated set omits redundant size duplicates, the large Improv favicon, and the full per-color Echelon palette; add more variants to `public/brand/<brand>/` if a surface needs them.

## Adding a Third Portco

1. Append a `[data-portco="<name>"]` selector to `src/styles/tailwind.css`. Define brand tokens, then re-map every semantic shadcn token, plus `--font-display`, `--font-sans`, and the radius set.
2. Add `"<name>"` to the `Portco` union in `src/components/portco/portco-theme.tsx`.
3. Create `src/components/portco/<name>/` with the composites the portco's brand needs. Mirror the structure of `echelon/` or `improv/`.
4. Add a per-portco `index.ts` barrel.
5. Extend this doc: tokens table plus composite index.
6. If feasible, add a tab in `src/App.tsx` so the showcase carries the new portco.

Keep every brand hex inside the new selector. No hex escapes into composite files.

## Out of Scope for Pass 1

- Re-theming data primitives (DataTable, KpiCard, StatusBadge) under each portco. A second pass will ship those once the marketing composites have run for a sprint.
- Animated logo and background effects (Echelon glitch, Improv mobius). Static SVGs are the contract today.
- Portco-themed app shells. The TLB shell stays TLB; portco theming is scoped to subtrees.

## Verification Hooks

Before merging a PR that uses a portco theme:

1. The portco-themed subtree renders correctly with `npm run dev`.
2. The TLB app shell wrapping it remains TLB orange / white / charcoal.
3. Keyboard focus rings remain visible inside the portco subtree (ring tokens are set per portco).
4. No new hex literal escapes `src/styles/tailwind.css`. Grep the diff.
