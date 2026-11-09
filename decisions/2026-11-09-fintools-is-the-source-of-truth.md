# 2026-11-09: tlb-financial-tools is the source of truth; firms are colours only

## Context
The design system and the tlb-financial-tools portal had drifted apart. The docs named Manrope and Helvetica, orange `#FF6600` and a dark-first rule, while the portal shipped Inter, Bebas Neue and JetBrains Mono, orange `#FF6400`, and two fully designed themes. Of 68 shared token names, 29 resolved to different values. Four composites (`FilterBar`, `KpiCard`, `ToolPage`, `EmptyState`) had moved on in different directions. The catalog listed components that existed nowhere. Meanwhile this repo carried six per-portco token blocks, component sets, pages, fonts and logos that no TLB app uses. The portal brands firms by colour tokens alone, and adding a portco's brand assets needs written TLB IT approval (Echelon's are restricted).

## Decision
- The portal is the source of truth. `src/styles/tailwind.css` is a copy of its `apps/web/src/index.css` (minus the `@source` list), fonts load exactly as its `index.html` does, and every component that exists in both places is the portal's copy: `packages/ui` for the shared primitives and composites, `apps/web/src/components/ui` for `dropdown-menu`, `label`, `separator`, `textarea`. Change the portal first, then copy.
- Firms are colours only. The portco components, pages, token blocks, Barlow font and Echelon and Improv logos are removed. The portal's `firm-themes.ts` ships as a registry `lib` item, and a Firm themes page demonstrates it.
- Components only this repo ships stay, restyled by the new tokens. The info, warning-dim and bg-sunken colours they need were added to the portal itself (tlb-financial-tools#366); the rest (motion tokens, console utilities) live in one marked "Design-system additions" block.
- App-coupled portal code (auth, workspace, telemetry, the dashboard data hooks) is described in `docs/14-tlb-financial-tools-blueprint.md`, not copied. This repo is public and the portal is private.

## Consequences
- An agent can rebuild the portal's UI from this repo: tokens, fonts, components, the shell and its contracts.
- Consumers that used the dropped props lose them: `KpiCard` `sparkline`, `tone`, `emphasis`; `FilterBar` generic `options` (now `users`). The Echelon Automation Hub should check before updating.
- The licensed Bebas Neue Pro file is not published; the wordmark falls back to Bebas Neue here.
- Copying is manual. A later step could generate `tailwind.css` from the portal in CI.
