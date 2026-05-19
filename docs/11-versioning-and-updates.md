# Versioning and Updates

How TLB keeps its UI stack current without breaking apps on Friday afternoons.

## What We Pin

All TLB internal repos pin the following at major-version precision in `package.json`:

| Package | Pin style | Why |
|---|---|---|
| `react`, `react-dom` | `^19.x` | Major-version compat. React 19 is the floor across all TLB apps. |
| `tailwindcss`, `@tailwindcss/vite` | `^4.x` | Tailwind v4 is the floor. v3 not supported in TLB apps. |
| `typescript` | `^5.x` or `^6.x` (whichever the repo is on) | Aligned across the fleet over time. |
| `class-variance-authority`, `clsx`, `tailwind-merge` | `^x.y` | shadcn's required trio. Float on patch and minor. |
| `lucide-react` | `^x` | New icons are a benefit. Float. |
| `recharts` | `~x.y` | Pin minor to avoid surprise renders. |
| `react-hook-form`, `zod`, `@hookform/resolvers` | `^x` | Float minor; verify on major. |
| `@tanstack/react-table` | `^x` | Float minor. |
| `@radix-ui/react-*` | Managed transitively by shadcn | Do not pin directly. |

`package-lock.json` is committed in every repo. Reproducible installs are required.

## How Often We Sync

A scheduled task runs quarterly:

- Bump `lucide-react` and `react-hook-form` to latest minor.
- Run `npx shadcn@latest diff` against every TLB repo. Apply non-breaking diffs.
- Snapshot the `tlb-ui-standards` repo on the cadence. Tag the release `v2026.Q2`, `v2026.Q3`, etc.
- Open a follow-up PR per repo to absorb the snapshot.

Out-of-cycle updates are reserved for security advisories.

## shadcn Diffs

shadcn ships component updates by editing the upstream source. Because TLB owns the copy, we can:

- Run `npx shadcn@latest diff` to see what changed upstream.
- Cherry-pick the diffs that matter.
- Skip the diffs that conflict with TLB tokens or local edits.

This is the explicit benefit of the copy-and-own model. We do not get silent breaking changes via `npm install`.

## Tailwind v4 Upgrades

Tailwind v4 is stable but young relative to v3. Treat minor bumps as if they were minors and read the changelog. The `@theme` syntax is the most likely surface for breaking changes. If a bump moves tokens, the `starter-kit/tailwind.css` updates first, then propagates per repo.

## When a Major Version Lands

Major-version upgrades (React 20 in the future, Tailwind v5, shadcn CLI v5) follow a deliberate path:

1. **Pilot one repo.** Smaller, less critical repo first. `improv-procurement` once stabilized, then `tlb-financial-tools`.
2. **Three-week soak.** No production fires before promoting the upgrade across the fleet.
3. **Document deviations.** If the new version conflicts with a TLB rule, decide whether the rule moves or the upgrade waits.
4. **Update `starter-kit/`.** The starter is updated last, after the pilot succeeds.
5. **Tag the standards release.** `v2027.Q1` style, with a CHANGELOG entry.

Major upgrades require Administrator (Alam) sign-off because they affect every TLB internal tool.

## Component Lifecycle

| Phase | What it means |
|---|---|
| **Proposed** | A composite suggested for inclusion in `starter-kit/`. Open a PR with a working implementation and at least one repo using it. |
| **Adopted** | Lives in `starter-kit/` and is documented in `docs/04-component-catalog.md`. Available to all repos. |
| **Deprecated** | Marked in the catalog with a deprecation note and a recommended replacement. Existing usages can stay; new usages should not be added. |
| **Removed** | Deleted from `starter-kit/`. All repos must have migrated by the next quarterly sync. |

Deprecation needs a stated reason and a replacement. We do not deprecate things on aesthetic grounds.

## Snapshot Versioning Scheme

`tlb-ui-standards` releases use a calendar-major scheme:

- `v2026.Q2` is the second-quarter 2026 snapshot.
- Patches inside a quarter: `v2026.Q2.1`, `v2026.Q2.2`.
- A new major (breaking change to tokens or rules) increments the year-quarter.

Each release is tagged in git and noted in `CHANGELOG.md` (added on first amendment).

## How to Propose a Change to the Standards

1. Open a PR against `tlb-ui-standards`.
2. State the change, the reason, and the affected repos.
3. Include a migration note if the change is not backward compatible.
4. Reviewer: Jonatan Hernandez Jr. Approver: Administrator (Alam) for breaking changes.
5. Once merged, the next quarterly sync absorbs the change into every repo.

For urgent changes (security, accessibility regression), the same path applies on a same-day cadence with sign-off from the Administrator.
