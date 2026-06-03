# TLB Design System

The single source of truth for user-interface decisions across all internal applications at The Launch Box (TLB), and the home of the production component library that ships those decisions as code.

## What This Is

- **Standards** — what UI library we use, how it is configured, the tokens, the patterns, the do's and don'ts. Authored in `docs/`.
- **Components** — 22 shadcn primitives + 6 TLB composites, re-styled with the TLB token system. Source lives in `src/components/`.
- **Registry** — a shadcn custom registry hosted on GitHub Pages. Consumer repos install components via the shadcn CLI.

## Stack

shadcn/ui on top of Radix primitives, Tailwind CSS v4, lucide-react icons, recharts, react-hook-form + zod, @tanstack/react-table. React 19, TypeScript, Vite. The full reasoning is in [docs/01-decision-record.md](./docs/01-decision-record.md).

## Installing Components in a Consumer Repo

Requires shadcn CLI 2.x (use `npx shadcn@latest`). The consumer repo must already have Tailwind v4 wired and a `components.json` (use the one in `starter-kit/`).

```bash
# Single component
npx shadcn@latest add https://nikola-code-ai-tlb.github.io/tlb-design-system/r/button.json

# Full baseline
for c in button input label textarea select checkbox radio-group switch \
         card dialog alert-dialog sheet tooltip popover dropdown-menu \
         table tabs separator badge skeleton sonner form \
         app-shell page-header data-table kpi-card empty-state status-badge; do
  npx shadcn@latest add https://nikola-code-ai-tlb.github.io/tlb-design-system/r/$c.json --yes
done
```

Composites pull their primitive dependencies automatically via `registryDependencies`.

## Bootstrapping a New Repo

If you are starting from zero, follow [docs/02-installation.md](./docs/02-installation.md). The `starter-kit/` folder is the drop-in:

- `starter-kit/tailwind.css` — the `@theme` block with TLB tokens.
- `starter-kit/lib-utils.ts` — the `cn()` helper.
- `starter-kit/components.json` — shadcn CLI config.
- `starter-kit/AGENTS.md.template`, `claude-md.template`, `.cursorrules.template` — drop these at the consumer repo root so AI agents follow TLB rules.

## How to Read This Repository

| If you are... | Start here |
|---|---|
| Getting product context, voice, and visual foundations | [docs/00-brand-and-voice.md](./docs/00-brand-and-voice.md) |
| A human engineer setting up a new repo | [docs/02-installation.md](./docs/02-installation.md) |
| A human engineer adding a feature | [docs/04-component-catalog.md](./docs/04-component-catalog.md), [docs/05-patterns.md](./docs/05-patterns.md) |
| An AI coding agent (Claude Code, Cursor, Windsurf, v0) | [AGENTS.md](./AGENTS.md), [SKILL.md](./SKILL.md) |
| A reviewer auditing a PR | [docs/09-do-and-dont.md](./docs/09-do-and-dont.md) |
| Migrating an existing repo | [repo-audits/](./repo-audits) |

## Folder Map

```
tlb-design-system/
├── AGENTS.md                  Primary contract for AI agents.
├── CLAUDE.md                  Claude Code entrypoint (mirrors AGENTS.md).
├── .cursorrules               Cursor entrypoint.
├── components.json            shadcn CLI config used by this repo.
├── index.html                 Demo page entry.
├── vite.config.ts             Vite + Tailwind v4 plugin.
├── docs/                      11 markdown standards files.
├── starter-kit/               Drop-in files for consumer repos.
├── repo-audits/               Migration plans for existing repos.
├── src/
│   ├── styles/tailwind.css    TLB @theme tokens (light + dark).
│   ├── lib/utils.ts           cn() helper.
│   ├── components/ui/         22 shadcn primitives, TLB-themed.
│   ├── components/composites/ 6 TLB composites.
│   └── App.tsx, main.tsx      Demo site rendered on GitHub Pages.
├── registry/
│   ├── registry.json          Hand-authored manifest index.
│   └── schema.ts              zod validator.
├── scripts/build-registry.ts  Emits public/r/<name>.json from sources.
├── public/r/                  Generated registry JSON (deployed to Pages).
└── .github/workflows/         CI: build registry + deploy Pages.
```

## Local Development

```bash
npm install
npm run build:registry   # emit public/r/*.json from src/
npm run dev              # demo site on http://localhost:5173
npm run typecheck
npm run build            # production build (registry + demo) into dist/
```

## Distribution

Every push to `main` runs `.github/workflows/deploy-registry.yml`. The workflow:

1. Builds `public/r/*.json` from `src/components/` via `scripts/build-registry.ts`.
2. Builds the demo site with Vite.
3. Deploys both to GitHub Pages at `https://nikola-code-ai-tlb.github.io/tlb-design-system/`.

Registry endpoints under `/r/<name>.json` are stable URLs consumers depend on. Pages CDN cache is ~10 minutes; account for that after a release.

## Compliance Notes

This repository contains no client data, no personal information, and no internal financials. Standard TLB AI Acceptable Use rules apply when building features that touch financial, HR, or client data: redact before pasting into AI tools, never paste credentials, and route Echelon-related work past the Administrator.

Any UI work that ends up in a client-facing deliverable still requires Reviewer sign-off from Jonatan Hernandez Jr before it leaves TLB.

## Maintainers

Owner: IT Director (Alam).  
UI / Reviewer: Jonatan Hernandez Jr.  
Authors: TLB Engineering.

Changes to standards require a `CHANGELOG.md` entry and a one-line summary in the relevant section's frontmatter.
