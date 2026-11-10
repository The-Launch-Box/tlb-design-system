# Starter Kit

Drop-in files for any TLB internal repository adopting the UI standards. Copy these files into the target repo, then follow [docs/02-installation.md](../docs/02-installation.md) for the install steps.

## Files

| File | Drop into | Purpose |
|---|---|---|
| `components.json` | Repo root | shadcn CLI configuration. The CLI reads this on every `shadcn add` call. |
| `tailwind.css` | `src/styles/tailwind.css` (the portal uses `src/index.css`) | The complete tlb-financial-tools token file: palette, semantic tokens, light and dark tracks, firm token sets, base layer, flapboard and card motion. Add your `@source` lines at the top. |
| `index.html` | Repo root | Google Fonts (Bebas Neue, Inter, JetBrains Mono), the Bebas Neue Pro preload, default `class="dark"` and the pre-paint theme script. Copy `public/brand/arrow.svg` (the launch-box-wordmark arrow) to `public/brand/` and the licensed `BebasNeuePro-BoldItalic.otf` from tlb-financial-tools to `public/fonts/`. |
| `lib-utils.ts` | `src/lib/utils.ts` | Exports `cn()`. Required by every shadcn component. |
| `AGENTS.md.template` | `AGENTS.md` at repo root | Tells AI agents how to behave in this repo. |
| `.cursorrules.template` | `.cursorrules` at repo root | Cursor-specific compact rules. |
| `claude-md.template` | `CLAUDE.md` at repo root | Claude Code entry pointer. |
| `claude-settings.json` | `.claude/settings.json` (merge if it exists) | Enables the `tlb-design-system` Claude Code plugin for every teammate. See [docs/13-agent-access.md](../docs/13-agent-access.md). |

The starter assumes Vite plus React 19 plus TypeScript plus Tailwind v4. For other stacks (Next.js, Remix), the same tokens apply but the installation steps differ. Open an issue rather than improvising.
