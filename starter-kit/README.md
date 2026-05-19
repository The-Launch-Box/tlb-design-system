# Starter Kit

Drop-in files for any TLB internal repository adopting the UI standards. Copy these files into the target repo, then follow [docs/02-installation.md](../docs/02-installation.md) for the install steps.

## Files

| File | Drop into | Purpose |
|---|---|---|
| `components.json` | Repo root | shadcn CLI configuration. The CLI reads this on every `shadcn add` call. |
| `tailwind.css` | `src/styles/tailwind.css` | Tailwind v4 entry plus TLB `@theme` tokens plus dark-mode override. |
| `lib-utils.ts` | `src/lib/utils.ts` | Exports `cn()`. Required by every shadcn component. |
| `AGENTS.md.template` | `AGENTS.md` at repo root | Tells AI agents how to behave in this repo. |
| `.cursorrules.template` | `.cursorrules` at repo root | Cursor-specific compact rules. |
| `claude-md.template` | `CLAUDE.md` at repo root | Claude Code entry pointer. |

The starter assumes Vite plus React 19 plus TypeScript plus Tailwind v4. For other stacks (Next.js, Remix), the same tokens apply but the installation steps differ. Open an issue rather than improvising.
