# Repo Audit: tlb-financial-tools

Audit date: 2026-05-15  
Audited path: `C:\Users\NikolaMarkovic\Projects\tlb-financial-tools`  
Auditor: TLB Engineering

## TL;DR

**Stop celebrating, but you are about 80% of the way there already.** `tlb-financial-tools` has every shadcn/ui dependency installed and the correct Vite plus React 19 plus Tailwind v4 plus Radix stack. What is missing is the configuration glue: `components.json`, the TLB-themed `tailwind.css`, the `lib/utils.ts`, and the shadcn-generated components in `src/components/ui/`. Migration is a one-PR setup task, not a rewrite.

## What I Inspected

- `apps/web/package.json`
- Top-level repository layout (Vite + React on `apps/web`, NestJS on `apps/api`)
- Asset and config files in `apps/web/`

## Current Stack (apps/web)

| Concern | Current | Standards target | Status |
|---|---|---|---|
| Framework | React 19.2 plus Vite 8 | React 19 plus Vite | Matches |
| Language | TypeScript ~6.0 | TypeScript 5.x or 6.x | Matches |
| Styling | Tailwind v4.2 plus `@tailwindcss/vite` | Tailwind v4 with TLB `@theme` | Stack matches, tokens missing |
| Primitives | `@radix-ui/react-{dialog,dropdown-menu,select,separator,slot,tabs,tooltip}` plus `radix-ui` umbrella | Radix via shadcn | Matches |
| Class utilities | `class-variance-authority`, `clsx`, `tailwind-merge` | Same trio | Matches |
| Icons | `lucide-react@^1.14` | lucide-react | Matches |
| Charts | `recharts@^3.8` | recharts | Matches |
| Forms | (none installed) | react-hook-form plus zod | Missing |
| Tables | (none installed) | @tanstack/react-table | Missing |
| State | (none beyond React) | React state, zustand if needed | Matches |
| Auth | `@azure/msal-react`, `@azure/msal-browser` | @azure/msal-react | Matches |
| Routing | `react-router-dom@^7.15` | react-router v7 | Matches |
| Linting | ESLint 10 with typescript-eslint 8 | ESLint with typescript-eslint | Matches |

## Gaps to Close

In order of importance:

### 1. shadcn never initialized

There is no `components.json` at the repo or `apps/web` root, and no `src/components/ui/` folder. shadcn primitives have to be installed via the CLI before any TLB-standard UI can be built.

**Fix:** Copy `starter-kit/components.json` into `apps/web/`, then run `npx shadcn@latest init` followed by the baseline component install command from `docs/02-installation.md`.

### 2. No TLB-themed `tailwind.css`

The repo uses Tailwind v4 but presumably with a vanilla import. The `@theme` block with TLB tokens is missing, so even though the dependencies are right, the visual identity is not enforced.

**Fix:** Copy `starter-kit/tailwind.css` to `apps/web/src/styles/tailwind.css` and import it in `apps/web/src/main.tsx`.

### 3. No `cn()` helper

`class-variance-authority`, `clsx`, and `tailwind-merge` are installed but no `src/lib/utils.ts` exists to expose `cn()`. shadcn primitives will not install cleanly without it.

**Fix:** Copy `starter-kit/lib-utils.ts` to `apps/web/src/lib/utils.ts`.

### 4. Missing forms and tables libraries

For any non-trivial financial tooling, forms and tables are the core surface. Both are unbuilt.

**Fix:** Install `react-hook-form`, `@hookform/resolvers`, `zod`, `@tanstack/react-table`. Add `sonner` for toasts.

### 5. No `AGENTS.md`, `CLAUDE.md`, or `.cursorrules`

Without these, AI agents in the repo default to generic React patterns and the UI will drift over time.

**Fix:** Copy the three templates from `starter-kit/` to the repo root.

### 6. No `src/components/` structure yet

The folder hierarchy in `docs/08-file-structure.md` (layout, data, forms, feedback, auth, feature) is not present. This is fine for a brownfield project but should be established as features land.

**Fix:** Create the folders empty (with `.gitkeep`) in the setup PR so future PRs land in the right place by default.

### 7. lucide-react pin is unusual

`"lucide-react": "^1.14.0"` is pinned to a very early major. lucide ships at higher majors today.

**Fix:** Verify whether this is intentional (a local fork or alias) or a typo. Standards target the latest stable major. Update in the setup PR if appropriate.

## Recommended Migration Plan

One setup PR titled "chore(ui): adopt TLB UI Standards." Steps inside the PR:

1. Copy starter-kit files: `components.json` (to `apps/web/`), `tailwind.css` (to `apps/web/src/styles/`), `lib-utils.ts` (to `apps/web/src/lib/utils.ts`), `AGENTS.md`, `CLAUDE.md`, `.cursorrules` (to the repo root and to `apps/web/` if both are used).
2. Update `apps/web/package.json` to add `react-hook-form`, `@hookform/resolvers`, `zod`, `@tanstack/react-table`, `sonner`, `date-fns`.
3. Run `npx shadcn@latest init` in `apps/web/`.
4. Run the baseline component install (`button input label textarea select checkbox radio-group switch card dialog alert-dialog sheet tooltip popover dropdown-menu table tabs separator badge skeleton sonner form`).
5. Create the empty `src/components/{layout,data,forms,feedback,auth,feature}/` directories with `.gitkeep`.
6. Add the smoke-test page from `docs/02-installation.md`, verify the orange renders, then remove the page.
7. Mount `Toaster` once in `src/App.tsx`.
8. Run `npm run lint` and `npm run build`. Confirm both pass.

Estimated effort: half a day for one engineer plus reviewer time.

## What Stays Out of Scope

- Backend changes in `apps/api`. The NestJS app is not part of the UI standard.
- The `lucide-react@^1.14` pin investigation. Resolve it in a follow-up if it is not a typo.
- Theme toggle and layout composites. Add them as the first features that need them, not in the setup PR.

## Risks

- `lucide-react@^1.14` may not match current shadcn expectations. Possible icon-import errors during `shadcn add`. Mitigation: bump to the current major in the setup PR.
- TypeScript `~6.0.2` is at the bleeding edge. Some shadcn-generated components may emit type warnings under stricter TS. Mitigation: address inline as they appear; do not relax `tsconfig.json`.
- The `apps/web` vs `apps/api` monorepo split is fine, but the `components.json` lives inside `apps/web` (not the repo root). The shadcn CLI must be run from inside `apps/web` for paths to resolve.

## After Migration

Once the setup PR is merged, `tlb-financial-tools` becomes the reference TLB app. The standards in this repository should be tested against `tlb-financial-tools` first before being applied to others.
