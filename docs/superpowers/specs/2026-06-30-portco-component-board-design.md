# Design: TLB Component Board + Portco Brand Pages

Date: 2026-06-30
Status: Approved pending implementation plan
Owner: Design system

## Goal

Turn the single-page showcase into a comprehensive, multi-page board that:

1. Catalogs every reusable component (shadcn primitives plus TLB composites) on a dedicated board page.
2. Gives each TLB portfolio company its own design-isolated page, themed to its real brand.
3. Replaces duplicated per-portco composites with a shared, token-driven marketing composite layer.

Source of brand truth: `Brand Guidelines - Visual 1.xlsx` (palettes) and each company's guideline microsite at `https://brands.foundbrand.agency/<name>/` (typography, voice, motifs).

## Scope

In scope: TLB house brand plus six portcos. Two exist today (Echelon, Improv); four are new (Hyperscayle, VEscape, Blue Trail Digital, DX Foundation). Improv's palette is migrated to the official guideline palette. Echelon and Improv pages are refactored onto the shared composites.

Out of scope: backend or data wiring, new shadcn primitives beyond what pages need, animated brand effects (static SVG marks remain the contract per `docs/12-portco-themes.md`).

## Architecture

### Routing

Add `react-router` v7 (approved in `AGENTS.md`). Use `HashRouter` so client routing works on GitHub Pages under the project subpath without a server rewrite or a `404.html` fallback. Asset URLs continue to resolve through `import.meta.env.BASE_URL` (the existing `brandAsset` helper).

`App.tsx` becomes a thin shell: `TooltipProvider` plus `Toaster` plus the router. Each route is its own file in `src/pages/`.

| Route | File | Theme | Content |
|---|---|---|---|
| `/` | `pages/home.tsx` | TLB | Board index: cards linking to the component board and each portco page |
| `/components` | `pages/components-board.tsx` | TLB | Comprehensive catalog: every primitive and composite, grouped by category |
| `/echelon` | `pages/portco/echelon.tsx` | Echelon | Rich themed marketing page |
| `/improv` | `pages/portco/improv.tsx` | Improv | Rich themed marketing page |
| `/hyperscayle` | `pages/portco/hyperscayle.tsx` | Hyperscayle | Rich themed marketing page |
| `/vescape` | `pages/portco/vescape.tsx` | VEscape | Rich themed marketing page |
| `/bluetrail` | `pages/portco/bluetrail.tsx` | Blue Trail | Rich themed marketing page |
| `/dxfoundation` | `pages/portco/dxfoundation.tsx` | DX Foundation | Rich themed marketing page |

The TLB app shell (`AppShell`, `Sidebar`, `TopBar`) wraps TLB routes. Portco routes render full-bleed inside `<PortcoTheme>` with a small "back to board" affordance and a top-right tab/nav to switch portcos.

### Two-tier component model

Tier 1, brand-agnostic marketing composites in `src/components/marketing/`. Token-driven, restyle automatically under any `<PortcoTheme>`:

| Composite | Purpose |
|---|---|
| `Hero` | Eyebrow, headline, optional highlight clause, body, actions slot. Two-column or stacked. |
| `SectionHeader` | Eyebrow plus heading plus optional intro, used to open each section. |
| `StatCallout` | Display figure plus label. Grid-friendly. |
| `QuoteCard` | Testimonial: quote, author, role. |
| `ProcessStep` | Numbered or phase-labeled step: index, icon, title, description. |
| `FeatureCard` | Icon, title, description card for capability grids. |
| `CTABanner` | Closing call to action: headline plus actions on an accent surface. |
| `LogoCloud` | Row of partner or client marks. |
| `PrimitivesStrip` | Buttons plus badges row that proves token cascade on each page. |

Each composite owns variants through `cva` (per the hard rules), takes content via props and slots, and carries no brand hex. The existing `EchelonHero`, `ImprovHero`, and siblings are removed once their pages consume the shared composites.

Tier 2, per-portco signature pieces in `src/components/portco/<name>/`: the `currentColor` logo mark, plus at most one signature motif component per brand. Keep the per-portco barrel `index.ts`.

| Portco | Signature motif |
|---|---|
| Echelon | Glitch mark (existing) |
| Improv | Wordmark (existing) |
| Hyperscayle | Wink mark plus data-grid accent |
| VEscape | Ignition gradient panel |
| Blue Trail | Trail-map rule or dashed path divider |
| DX Foundation | Cosmic pastel pattern block |

### Theming and tokens

For each new portco, add a `[data-portco="<name>"]` block to `src/styles/tailwind.css` that defines the brand hex then remaps every semantic shadcn token (`--color-background`, `--color-foreground`, `--color-card`, `--color-primary`, `--color-secondary`, `--color-accent`, `--color-destructive`, `--color-border`, `--color-ring`, and their foregrounds), plus `--font-display`, `--font-sans`, and the radius set. All hex lives only in this file (hard rule 2). Update the `[data-portco="improv"]` block to the official palette in the same pass.

Palettes (from the spreadsheet):

- Hyperscayle: Foundation Blue `#0B105B`, Hyper Pink `#F2055C`, Hyper Blue `#11EAFB`, Data Green `#01F34F`, Data Red `#FF3300`.
- VEscape: VEscape Blue `#330066`, Ignition Magenta `#FF0066`, Ignition Yellow `#FFFF00`, Ignition Purple `#660099`, White `#FFFFFF`, Black `#000000`, Gray `#E8E8E8`.
- Blue Trail: Trail Blue `#074E75`, Blaze Magenta `#FF2E78`, Blaze Blue `#00DBFF`, Trail Dirt `#D9DDCA`, Trail White `#F1F1EC`, Trail Black `#161615`.
- DX Foundation: Horizon Blue `#163259`, Nebula Pink `#F02D57`, Odyssey Violet `#8585CB`, Foundational Black `#05010B`, Discovery `#F9DFCA`, Aero `#C0D4EA`, Nova `#E9C3CD`, Exploration `#C2C2E9`, Infinity Off White `#FDF6F3`.
- Improv (migrated): Core Obsidian `#090B0C`, Strategic Blue `#003B59`, Noir Plum `#590341`, Pulse Raspberry `#CC3366`, Forge Sienna `#D86A39`, Iced Aqua `#9CD0D8`.

### Typography

Brand fonts are proprietary, so each portco names its real font first and falls back to a free Google Font plus system stack, matching how Echelon and Improv already declare stacks. Any free Google Font actually loaded is added once to `index.html`. Mappings:

| Portco | Real display font | Display stack | Real body font | Body stack | Radius | Voice note |
|---|---|---|---|---|---|---|
| Hyperscayle | Forma DJR | Space Grotesk, system grotesk | Forma DJR Micro | Inter, system | tight (`0.25rem`) | Direct, human, scale and data |
| VEscape | Aktiv Grotesk XBold | Archivo, Helvetica Neue | Aktiv Grotesk | Archivo, system | sharp (`0`) | Velocity, italic all-caps leads |
| Blue Trail | Museo Sans | Sora, system | Lato (free) | Lato, system | rounded (`0.5rem`) | Dry humor, trail and navigation |
| DX Foundation | Termina | Chivo, system | Termina (small sizes) | Inter, system | rounded (`0.5rem`) | Friendly, foundations for the future |

VEscape leading brand statements render in italic uppercase per the guideline; this is a `Hero` prop or class, not a new component.

### Improv palette migration

Re-map `[data-portco="improv"]` to the migrated palette above. Verify existing Improv composites still read cleanly during the refactor, then delete the bespoke Improv composites once `pages/portco/improv.tsx` uses the shared layer. Update the Improv token table in `docs/12-portco-themes.md`.

## Components data flow

Pages are presentational. Each portco page imports shared marketing composites plus its own signature mark, composes sections with hard-coded brand-accurate copy, and wraps everything in `<PortcoTheme portco="<name>">`. No state beyond what shadcn primitives manage internally. The component board page reuses today's `App.tsx` demo data (`DEMO_ROWS`, columns) for the table and KPI examples.

## Error handling and edge cases

- Unknown route renders a simple TLB-themed not-found with a link home.
- HashRouter avoids Pages 404s; verify deep links like `/#/vescape` load directly.
- Fonts: if a free fallback is not loaded, the system stack still renders; no layout depends on a specific font file.
- Focus rings: each portco sets `--color-ring`; verify visible focus on every interactive element inside each themed subtree (hard rule 5).

## Testing and verification

Per `AGENTS.md` "before submitting":

1. `npm run lint` and `npm run typecheck` pass.
2. Every route renders in `npm run dev`; light and dark where applicable.
3. Keyboard tab path is logical on each page; focus rings visible under every portco theme.
4. No new hex literal escapes `src/styles/tailwind.css` (grep the diff).
5. New composites build into the registry via `npm run build:registry`.

## Housekeeping

- Extend the `Portco` union in `src/components/portco/portco-theme.tsx` to all six names.
- Register new marketing and portco composites in `scripts/build-registry.ts`.
- Update `docs/12-portco-themes.md`: token tables for the four new portcos and the migrated Improv table, plus the composite index and the new shared marketing section.
- Update `docs/STATE.md` at the end.
- Record an ADR in `decisions/` for the router choice (HashRouter) and the shared-composite refactor.

## Build order

1. Foundation: add router and `src/pages` shell; add all six `data-portco` token blocks plus the Improv migration; wire font stacks and `index.html` font links; extend the `Portco` union; build the `src/components/marketing/` composites.
2. Pages (largely parallel): the six portco pages, the TLB `/components` board, the `/` home; refactor Echelon and Improv onto shared composites and delete their bespoke files; registry and docs updates; lint and typecheck.

## Open questions

None. All resolved during brainstorming:

- Scope: all six portcos plus TLB.
- Architecture: multi-page HashRouter.
- Improv: migrate to the official palette.
- Page depth: rich multi-section pages.
- Refactor: Echelon and Improv move onto shared composites; signature marks stay.
