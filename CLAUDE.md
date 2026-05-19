# CLAUDE.md

Claude Code reads this file at session start. Treat it as the operating contract for any UI work in this repository.

## Authoritative Standards

The full TLB UI standards live in `./AGENTS.md` and `./docs/`. Read `AGENTS.md` first. Read the relevant `docs/` file before generating non-trivial UI.

For installation, `docs/02-installation.md`. For tokens, `docs/03-tokens-and-theme.md`. For component picks, `docs/04-component-catalog.md`. For patterns, `docs/05-patterns.md`.

## Quick Constraints

- UI library: shadcn/ui only. Components live in `src/components/ui/`.
- Styling: Tailwind v4. Tokens are in `src/styles/tailwind.css` under `@theme`.
- Icons: lucide-react only.
- Charts: recharts only.
- Forms: react-hook-form plus zod.
- Tables: @tanstack/react-table plus shadcn table primitives.
- No inline hex colors. No `any`. No em dashes. No competing UI libraries.

## What to Do First

1. Read `./AGENTS.md` end to end.
2. Read the doc most relevant to the task.
3. If a shadcn component is needed and missing, install it with the shadcn CLI rather than re-implementing.
4. Run lint and typecheck before declaring done.

If a rule in `AGENTS.md` blocks the task, stop and ask the human. Do not improvise around it.
