# Project State: TLB Design System

Current snapshot. Overwrite stale entries; this is not a changelog (git holds history).
Last updated: 2026-11-06 · branch `feat/fintools-echelon-composites`

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
- Portco component board merged (PR #12, #13, #14).
- Lifted tool-page composites from tlb-financial-tools (`ToolPage`, `ToolTabs`, `FilterBar`, `Notice`/`LoadingState`, `AppSwitcher`, `Flapboard`) and review-flow composites from the Echelon Automation Hub (`ReviewItemCard`, `PayloadList`, `FieldDiff`, `AuditTimeline`, `ActorBadge`); extended `StatusBadge` and `KpiCard`; added console utilities and `bg-bg-sunken`. All registered, demoed in `src/pages/tool-and-review-showcase.tsx`, and listed in `docs/04-component-catalog.md`.
- Made the repo a Claude Code plugin marketplace (`.claude-plugin/`, `skills/tlb-design-system/SKILL.md`) plus `public/llms.txt`; consumer setup in `docs/13-agent-access.md`.

## In flight
- `feat/fintools-echelon-composites` pending review/merge. The Claude plugin install was tested from a local directory source; the GitHub-source install works only after merge to `main`.
- Wiring `tlb-financial-tools` to the plugin (`.claude/settings.json` + AGENTS.md fixes) on its own branch.

## Blocked / not started
- Re-theming data primitives (DataTable, KpiCard, StatusBadge) per portco; deferred to a second pass (see "Out of Scope for Pass 1" in `docs/12-portco-themes.md`).
- Animated logo/background effects (Echelon glitch, Improv mobius); static SVGs are the contract today.
- `npm run lint` has no working eslint config (pre-existing gap, not introduced by this branch).
- `starter-kit/tailwind.css` is far behind `src/styles/tailwind.css` (158 vs 600 lines, no data-signal tokens or utilities). Sync it, or generate it in `build:registry`.
- Consumer apps still use their local copies of the lifted composites; adopting the registry versions is per-repo work.
- Not adopted: the portal's `AppShell`, `FirmGate`, `FeedbackOverlay`, `ToolIcon`, firm-themes registry (app/auth-coupled), and Echelon's auth screens, console layout, and run pages (app-specific).

## Last decision
- Distribute the design system to every repo's agent as a Claude Code plugin marketplace hosted in this repo (no `version`, so commits are versions), with `llms.txt` + consumer `AGENTS.md` for other agents; lift app components as generic, type-free composites. See `decisions/2026-11-06-plugin-marketplace-for-agent-access.md`.

## Next step
- Merge `feat/fintools-echelon-composites`, then on a clean machine: trust a wired consumer repo, confirm `/plugin` shows `tlb-design-system` and `/tlb-design-system:` autocompletes. Then wire Echelon (`claude plugin marketplace add The-Launch-Box/tlb-design-system --scope project`).
