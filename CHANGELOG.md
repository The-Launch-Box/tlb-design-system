# Changelog

All notable changes to `tlb-design-system` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versioning uses a calendar scheme: `YYYY.Q.PATCH`.

## [Unreleased]

### Added
- Initial `tlb-design-system` scaffold migrated from `_tlb-ui-standards-STAGING/` in `tlb-financial-tools`.
- 22 shadcn primitives re-styled with TLB tokens (`@theme` in `src/styles/tailwind.css`).
- 6 TLB composites: `AppShell`, `PageHeader`, `DataTable`, `KpiCard`, `EmptyState`, `StatusBadge`.
- shadcn custom registry pipeline: `registry/registry.json`, `scripts/build-registry.ts`, GitHub Actions deploy to GitHub Pages.

### Notes
- GitHub Pages CDN cache is ~10 minutes. After a release, hard-refresh the registry URL or wait one cache cycle.
- Consumers must use shadcn CLI 2.x (the URL install form). Pin install commands to `npx shadcn@latest`.
