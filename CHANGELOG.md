# Changelog

All notable changes to `tlb-design-system` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning uses a calendar scheme: `YYYY.Q.PATCH`.

## [Unreleased]

### Changed (2026-11-09: tlb-financial-tools is the source of truth)
- `src/styles/tailwind.css` is now the portal's `apps/web/src/index.css`: orange `#FF6400`, light and dark tracks, firm token sets, tool palettes, flapboard and card motion. `info`, `info-dim`, `warning-dim` and `bg-sunken` now come from the portal (tlb-financial-tools#366); a marked "Design-system additions" block keeps only motion tokens and the console utilities. `--ease-out` is no longer redefined.
- Fonts match the portal: Bebas Neue, Inter, JetBrains Mono from Google Fonts; Bebas Neue Pro only for the wordmark. Manrope, Helvetica, Arial Black and Barlow are gone.
- Primitives `badge`, `button`, `card`, `dialog`, `input`, `select`, `table`, `tabs`, `tooltip` and composites `chart-tooltip`, `data-table`, `empty-state`, `file-upload`, `filter-bar`, `kpi-card`, `notice`, `tool-page`, `tool-tabs` replaced with the `@tlb/ui` copies; `dropdown-menu`, `label`, `separator`, `textarea` with the portal's.
- `AppShell` rebuilt as the portal header and column (auth-free props).
- Docs 00, 02, 03, 04, 06, AGENTS.md, both SKILL.md files, README, llms.txt and the starter kit rewritten to match.

### Added (2026-11-09)
- `firm-themes` registry lib item (`applyFirmTheme`), `theme-toggle` composite, Firm themes page.
- `docs/12-firm-themes.md` and `docs/14-tlb-financial-tools-blueprint.md`; `starter-kit/index.html`.

### Removed (2026-11-09)
- Portco components, pages, token blocks and the Echelon and Improv logos; `docs/12-portco-themes.md`; `@fontsource/barlow-condensed`.
- `KpiCard` `sparkline`, `tone`, `emphasis` props and `FilterBar` `options` props (the portal's versions do not have them).

### Added
- Claude Code plugin marketplace (`.claude-plugin/`, `skills/tlb-design-system/SKILL.md`) so any TLB repo's agents load the design system; `docs/13-agent-access.md`, `starter-kit/claude-settings.json`, `public/llms.txt`.
- Tool-page composites from tlb-financial-tools: `ToolPage`, `ToolTabs`, `FilterBar`, `Notice`/`LoadingState`, `AppSwitcher`, `Flapboard`.
- Review-flow composites from the Echelon Automation Hub: `ReviewItemCard`, `PayloadList`/`RawJson`, `FieldDiff`, `AuditTimeline`, `ActorBadge`.
- `StatusBadge` workflow statuses; `KpiCard` `tone` and `emphasis`; `bg-bg-sunken` token; `eyebrow`, `figures`, `pip`, `lift` utilities.

### Fixed
- Three stray NUL bytes at the end of `src/styles/tailwind.css` that made Tailwind drop the next rule.
- Stale `tlb-ui-standards` references in docs and starter-kit templates.

### Added (earlier)
- `docs/00-brand-and-voice.md`: product context, voice and copy rules, visual foundations (dark-first surface ladder, orange-only-for-action, green/red-only-for-data), iconography, and brand-mark spec. Lifted and adapted from the external Launch Box Design System reference; closes the gap where Manrope, JetBrains Mono, and the bg-0/1/2/3 ladder were declared as tokens but not documented.
- `SKILL.md` at repo root: Claude Code skill manifest pointing AI agents at `AGENTS.md`, the docs set, and the production component sources.
- Initial `tlb-design-system` scaffold migrated from `_tlb-ui-standards-STAGING/` in `tlb-financial-tools`.
- 22 shadcn primitives re-styled with TLB tokens (`@theme` in `src/styles/tailwind.css`).
- 6 TLB composites: `AppShell`, `PageHeader`, `DataTable`, `KpiCard`, `EmptyState`, `StatusBadge`.
- shadcn custom registry pipeline: `registry/registry.json`, `scripts/build-registry.ts`, GitHub Actions deploy to GitHub Pages.

### Notes
- GitHub Pages CDN cache is ~10 minutes. After a release, hard-refresh the registry URL or wait one cache cycle.
- Consumers must use shadcn CLI 2.x (the URL install form). Pin install commands to `npx shadcn@latest`.
