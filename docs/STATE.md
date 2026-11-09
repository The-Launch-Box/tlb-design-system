# Project State: TLB Design System

Current snapshot. Overwrite stale entries; this is not a changelog (git holds history).
Last updated: 2026-11-09 · branch `feat/fintools-source-of-truth`

## Done
- Registry of shadcn primitives and TLB composites on GitHub Pages; Claude Code plugin marketplace (`.claude-plugin/`, `skills/`), `llms.txt`.
- **tlb-financial-tools is the source of truth** (this branch): token file, fonts, shared primitives and composites copied from the portal; `AppShell` rebuilt as the portal shell; `firm-themes` lib and `theme-toggle` added; portco components, pages, tokens and logos removed; docs rewritten, including the rebuild blueprint (`docs/14-...`). ADR `decisions/2026-11-09-fintools-is-the-source-of-truth.md`.

## In flight
- `feat/fintools-source-of-truth` PR awaiting review.

## Blocked / not started
- Copying from the portal is manual. Generating `src/styles/tailwind.css` from the portal in CI would stop drift.
- tlb-financial-tools#366 adds `info`, `info-dim`, `warning-dim` and `bg-sunken` to the portal; this branch already carries them. If #366 changes in review, re-copy the portal's `index.css`. The remaining additions block is motion tokens and console utilities only.
- The portal's `apps/web/src/components/ui` keeps an older button, badge, dialog, tabs and input; several tools' standalone `index.css` still carry `#FF6600` and Helvetica. Portal-side cleanup.
- `npm run lint` has no working eslint config (pre-existing).

## Last decision
- The portal defines the TLB look; firms are colours only. See the 2026-11-09 ADR.

## Next step
- Merge the PR, then let the Echelon Automation Hub check for the dropped `KpiCard` and `FilterBar` props before it updates.
