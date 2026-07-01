# Project State: TLB Design System

Current snapshot. Overwrite stale entries; this is not a changelog (git holds history).
Last updated: 2026-06-30 · branch `feat/portco-component-board`

## Done
- Scaffolded `tlb-design-system` with 28 components + shadcn registry.
- Imported TLB UI standards from staging (`AGENTS.md` + `docs/`).
- Added `ChartTooltip` and `FileUpload` composites; consolidated financial-signal primitives from the design-system reference.
- Lifted brand-voice doc + skill manifest from the design-system reference; consolidated brand-voice docs (PR #3).
- Added official TLB and portco logo assets under `public/brand/` (PR #5); fixed the TLB brand mark to render correctly under the Pages base path and on light lozenge surfaces.
- Shipped the multi-page portco component board: `react-router` `createHashRouter` shell in `src/router.tsx`, with `src/App.tsx` reduced to a provider shell. Routes cover `/` (home), `/components` (catalog, including `BrandLogoShowcase`), one page per portco, and a `*` not-found.
- Extended the `Portco` union from two to six brands: Echelon, Improv, Hyperscayle, VEscape, Blue Trail, DX Foundation. Added full token blocks for the four new brands in `src/styles/tailwind.css`, and migrated Improv from its placeholder navy/teal palette to the official guideline palette (obsidian/aqua/raspberry).
- Built a shared, token-driven marketing composite layer in `src/components/marketing/` (`Hero`, `SectionHeader`, `StatCallout`, `QuoteCard`, `ProcessStep`, `FeatureCard`, `CTABanner`, `LogoCloud`, `PrimitivesStrip`), registered in the shadcn registry.
- Added per-portco signature marks (wordmark plus one motif each) for Hyperscayle, VEscape, Blue Trail, and DX Foundation under `src/components/portco/<name>/`.
- Refactored Echelon and Improv pages onto the shared marketing composites, deleting their bespoke hero/stat/quote/step composites; only signature marks (logos, `EchelonMarker`) remain per-brand.
- Updated `docs/12-portco-themes.md` with token tables for all six portcos, a shared-composite index, and a router-aware "Adding a Portco" walkthrough. Recorded the routing and composite-layer decision in `decisions/2026-06-30-hashrouter-and-shared-composites.md`.

## In flight
- None. The portco component board feature is complete on this branch pending review/merge.

## Blocked / not started
- Re-theming data primitives (DataTable, KpiCard, StatusBadge) per portco; deferred to a second pass (see "Out of Scope for Pass 1" in `docs/12-portco-themes.md`).
- Animated logo/background effects (Echelon glitch, Improv mobius); static SVGs are the contract today.
- `npm run lint` has no working eslint config (pre-existing gap, not introduced by this branch).

## Last decision
- Adopt `createHashRouter` for client-side routing (survives GitHub Pages subpath hosting with no server rewrite) and consolidate brand-specific hero/stat/quote composites into a single shared, token-driven `src/components/marketing/` layer reused by every portco page. See `decisions/2026-06-30-hashrouter-and-shared-composites.md`.

## Next step
- Review and merge `feat/portco-component-board`; then decide whether the data-primitive re-theming pass (DataTable, KpiCard, StatusBadge per portco) is next, or whether to onboard a seventh portco using the now-documented router page pattern.
