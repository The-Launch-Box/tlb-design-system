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
| `portco` | `"improv" \| "echelon" \| "hyperscayle" \| "vescape" \| "bluetrail" \| "dxfoundation"` | Required. Sets `data-portco` on the root div. |
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

Migrated to the official guideline palette (replaces the earlier navy/teal placeholder).

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#090B0C` (Improv obsidian) |
| foreground | `--color-foreground` | `#F2F2F2` (Improv off-white) |
| card | `--color-card` | `#11181B` (Improv surface) |
| card-foreground | `--color-card-foreground` | `#F2F2F2` |
| primary | `--color-primary` | `#9CD0D8` (Improv aqua) |
| primary-foreground | `--color-primary-foreground` | `#090B0C` |
| secondary | `--color-secondary` | `#003B59` (Improv strategic blue) |
| destructive | `--color-destructive` | `#CC3366` (Improv raspberry) |
| muted | `--color-muted` | `#003B59` |
| accent | `--color-accent` | `#CC3366` |
| border | `--color-border` | `#003B59` |
| ring | `--color-ring` | `#9CD0D8` |
| display font | `--font-display` | Lustria / Iowan Old Style / Georgia |
| body font | `--font-sans` | Work Sans / Helvetica Neue |
| radii | `--radius` | `0.125rem` (subtle), scaling to `0.375rem` at `xl` |

Brand swatches not yet remapped to a semantic token (`--color-improv-noir-plum: #590341`, `--color-improv-sienna: #D86A39`) remain available for composites that need a third or fourth accent.

### Hyperscayle

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#0B105B` (Hyperscayle foundation) |
| foreground | `--color-foreground` | `#EAF0FF` (off-white) |
| card | `--color-card` | `#070A3D` (foundation dark) |
| card-foreground | `--color-card-foreground` | `#EAF0FF` |
| primary | `--color-primary` | `#F2055C` (Hyperscayle pink) |
| primary-foreground | `--color-primary-foreground` | `#EAF0FF` |
| secondary | `--color-secondary` | `#11EAFB` (Hyperscayle blue) |
| secondary-foreground | `--color-secondary-foreground` | `#0B105B` |
| destructive | `--color-destructive` | `#FF3300` (Hyperscayle red) |
| muted-foreground | `--color-muted-foreground` | `#11EAFB` |
| accent | `--color-accent` | `#01F34F` (Hyperscayle green) |
| border | `--color-border` | `#11EAFB` |
| ring | `--color-ring` | `#11EAFB` |
| display font | `--font-display` | Space Grotesk |
| body font | `--font-sans` | Inter |
| radii | `--radius` | `0.25rem` |

### VEscape

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#330066` (VEscape blue) |
| foreground | `--color-foreground` | `#FFFFFF` |
| card | `--color-card` | `#1A0033` (VEscape blue dark) |
| card-foreground | `--color-card-foreground` | `#FFFFFF` |
| primary | `--color-primary` | `#FF0066` (VEscape magenta) |
| primary-foreground | `--color-primary-foreground` | `#FFFFFF` |
| secondary | `--color-secondary` | `#660099` (VEscape purple) |
| destructive | `--color-destructive` | `#FF0066` |
| muted-foreground | `--color-muted-foreground` | `#E8E8E8` (VEscape gray) |
| accent | `--color-accent` | `#FFFF00` (VEscape yellow) |
| accent-foreground | `--color-accent-foreground` | `#330066` |
| border | `--color-border` | `#660099` |
| ring | `--color-ring` | `#FFFF00` |
| display font | `--font-display` | Archivo |
| body font | `--font-sans` | Archivo |
| radii | `--radius` | `0` (sharp edges) |

### Blue Trail (light brand)

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#F1F1EC` (Trail white) |
| foreground | `--color-foreground` | `#161615` (Trail black) |
| card | `--color-card` | `#FFFFFF` |
| card-foreground | `--color-card-foreground` | `#161615` |
| primary | `--color-primary` | `#074E75` (Trail blue) |
| primary-foreground | `--color-primary-foreground` | `#F1F1EC` |
| secondary | `--color-secondary` | `#00DBFF` (Blaze blue) |
| secondary-foreground | `--color-secondary-foreground` | `#161615` |
| destructive | `--color-destructive` | `#FF2E78` (Blaze magenta) |
| muted | `--color-muted` | `#D9DDCA` (Trail dirt) |
| accent | `--color-accent` | `#FF2E78` |
| border | `--color-border` | `#D9DDCA` |
| ring | `--color-ring` | `#074E75` |
| display font | `--font-display` | Sora |
| body font | `--font-sans` | Lato |
| radii | `--radius` | `0.5rem` |

This is the one light-surface portco theme in the set; do not assume every portco renders on a dark background.

### DX Foundation

| Role | Token | Resolves to |
|---|---|---|
| background | `--color-background` | `#05010B` (DXF black) |
| foreground | `--color-foreground` | `#FDF6F3` (DXF off-white) |
| card | `--color-card` | `#163259` (DXF horizon) |
| card-foreground | `--color-card-foreground` | `#FDF6F3` |
| primary | `--color-primary` | `#F02D57` (DXF nebula) |
| primary-foreground | `--color-primary-foreground` | `#FDF6F3` |
| secondary | `--color-secondary` | `#8585CB` (DXF violet) |
| secondary-foreground | `--color-secondary-foreground` | `#05010B` |
| destructive | `--color-destructive` | `#F02D57` |
| muted-foreground | `--color-muted-foreground` | `#C0D4EA` (DXF aero) |
| accent | `--color-accent` | `#C0D4EA` |
| accent-foreground | `--color-accent-foreground` | `#05010B` |
| border | `--color-border` | `#8585CB` |
| ring | `--color-ring` | `#F02D57` |
| display font | `--font-display` | Chivo |
| body font | `--font-sans` | Inter |
| radii | `--radius` | `0.5rem` |

Brand swatches `--color-dxf-discovery: #F9DFCA` and `--color-dxf-nova: #E9C3CD` and `--color-dxf-exploration: #C2C2E9` are reserved for composite-level accents (the cosmic field motif) and are not yet mapped to a semantic token.

All tokens live in `src/styles/tailwind.css` under the `[data-portco="..."]` selectors. They are not declared anywhere else. If a portco needs another color, add it to the same scope; do not introduce hex anywhere else in the repo.

## Composite Index

Brand fidelity is split across two layers. Shared marketing composites (hero, stats, quotes, process steps, CTA) live once in `src/components/marketing/` and are token-driven, so every portco gets the same layout primitives restyled by its own `[data-portco]` scope. Per-portco folders under `src/components/portco/<name>/` keep only signature marks (logo, wordmark, motif) that cannot be expressed as tokens.

### Shared marketing composites (`src/components/marketing/`)

Registered in the shadcn registry. Every portco page in `src/pages/portco/` wraps these in `<PortcoTheme portco="...">`; the composites carry no brand-specific styling of their own, only the layout and the token classes that resolve per scope.

| Composite | Purpose |
|---|---|
| `Hero` | Two-column hero with eyebrow, headline, optional highlighted clause, body copy, and action buttons. |
| `SectionHeader` | Eyebrow plus heading plus intro copy, left- or center-aligned, used to open a section. |
| `StatCallout` | Centered display-figure stat with a label underneath. |
| `QuoteCard` | Testimonial card with quote, author, and role. |
| `ProcessStep` | Numbered step in a process row (icon, title, description). |
| `FeatureCard` | Icon-led feature card (icon, title, description). |
| `CTABanner` | Full-width closing call-to-action with headline and action buttons. |
| `LogoCloud` | Labeled row of logos or partner marks. |
| `PrimitivesStrip` | Footer strip noting the page is built from unmodified shadcn primitives restyled by the token cascade. |

### Echelon (`src/components/portco/echelon/`)

Echelon's page (`src/pages/portco/echelon.tsx`) composes the shared composites above under `<PortcoTheme portco="echelon">`. Only the signature marks remain bespoke:

| Composite | Purpose |
|---|---|
| `EchelonMarker` | Inline `<mark>` highlight for yellow-on-blue text emphasis. |
| `EchelonLogoStacked`, `EchelonLogoWordmark` | Brand mark; uses `currentColor`. |

### Improv (`src/components/portco/improv/`)

Improv's page (`src/pages/portco/improv.tsx`) was refactored onto the same shared composites under `<PortcoTheme portco="improv">`. Only the signature mark remains bespoke:

| Composite | Purpose |
|---|---|
| `ImprovLogo` | Improv wordmark SVG; uses `currentColor`. |

### Hyperscayle, VEscape, Blue Trail, DX Foundation

Each ships a page in `src/pages/portco/<name>.tsx` built entirely from the shared marketing composites, plus a signature-mark folder:

| Portco | Folder | Composites |
|---|---|---|
| Hyperscayle | `src/components/portco/hyperscayle/` | `HyperscayleWordmark`, `HyperscayleWink` (motif) |
| VEscape | `src/components/portco/vescape/` | `VEscapeWordmark`, `VEscapeIgnitionPanel` (motif) |
| Blue Trail | `src/components/portco/bluetrail/` | `BlueTrailWordmark`, `BlueTrailTrailDivider` (motif) |
| DX Foundation | `src/components/portco/dxfoundation/` | `DXFWordmark`, `DXFCosmicField` (motif) |

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

A live gallery of every asset renders on the components board (`src/pages/components-board.tsx`, `BrandLogoShowcase`), reachable at `/#/components`. This curated set omits redundant size duplicates, the large Improv favicon, and the full per-color Echelon palette; add more variants to `public/brand/<brand>/` if a surface needs them.

## Adding a Portco

The board now has six portcos (Echelon, Improv, Hyperscayle, VEscape, Blue Trail, DX Foundation) under a `createHashRouter` route table in `src/router.tsx`. Adding another follows the same pattern as the last four:

1. Append a `[data-portco="<name>"]` selector to `src/styles/tailwind.css`. Define brand tokens, then re-map every semantic shadcn token, plus `--font-display`, `--font-sans`, and the radius set.
2. Add `"<name>"` to the `Portco` union in `src/components/portco/portco-theme.tsx`.
3. Create `src/components/portco/<name>/` with only the signature marks the brand needs (wordmark, motif). Mirror the structure of `hyperscayle/` or `bluetrail/`; do not reintroduce bespoke hero/stat/quote composites, those live in `src/components/marketing/`.
4. Add a per-portco `index.ts` barrel.
5. Create `src/pages/portco/<name>.tsx`: a page component that wraps `<PortcoTheme portco="<name>">` around the shared marketing composites (`Hero`, `SectionHeader`, `ProcessStep`, `StatCallout`, `QuoteCard`, `CTABanner`, `PrimitivesStrip`, etc.), composed with the new signature marks. Mirror `src/pages/portco/echelon.tsx`.
6. Register the page's route in `src/router.tsx` (`{ path: "/<name>", element: <NamePage /> }`) and link to it from the home/board page.
7. Extend this doc: tokens table plus signature-mark composite entry.

Keep every brand hex inside the new `[data-portco]` selector. No hex escapes into composite files.

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
