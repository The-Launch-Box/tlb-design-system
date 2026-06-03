---
name: tlb-design-system
description: Use this skill to generate well-branded interfaces and assets for The Launch Box (TLB), the internal enterprise financial-tools platform, either for production or throwaway prototypes and mocks. Contains design tokens, brand voice, visual foundations, iconography rules, and the production component library (shadcn primitives + TLB composites) for dark-first dashboards, spreadsheets, and data tools.
user-invocable: true
---

Read [AGENTS.md](./AGENTS.md) first, then the doc that matches what you are about to do. AGENTS.md is the authoritative rulebook for any AI agent producing UI code in TLB internal repos.

## Key files

- **[AGENTS.md](./AGENTS.md)** — the primary contract: stack, hard rules, folder conventions, copy rules, banned libraries. Always read first.
- **[CLAUDE.md](./CLAUDE.md)** — Claude Code entrypoint; mirrors AGENTS.md with quick constraints.
- **[docs/00-brand-and-voice.md](./docs/00-brand-and-voice.md)** — product context, voice and copy, visual foundations, iconography, brand mark. Start here for design choices and tone.
- **[docs/01-decision-record.md](./docs/01-decision-record.md)** — why shadcn, why Tailwind v4, why this stack.
- **[docs/02-installation.md](./docs/02-installation.md)** — bootstrapping a new consumer repo.
- **[docs/03-tokens-and-theme.md](./docs/03-tokens-and-theme.md)** — every brand, semantic, data-signal, and motion token. The single token reference.
- **[docs/04-component-catalog.md](./docs/04-component-catalog.md)** — shadcn primitives and TLB composites; how to pick one.
- **[docs/05-patterns.md](./docs/05-patterns.md)** — page layout, forms, tables, empty states, destructive actions, toasts.
- **[docs/12-portco-themes.md](./docs/12-portco-themes.md)** — portco-scoped theming (Improv, Echelon).
- **[src/styles/tailwind.css](./src/styles/tailwind.css)** — Tailwind v4 `@theme` block; the single source of truth for tokens. Import once from `src/main.tsx`.
- **[src/components/ui/](./src/components/ui/)** — 22 shadcn primitives re-styled with TLB tokens.
- **[src/components/composites/](./src/components/composites/)** — TLB composites: `AppShell`, `PageHeader`, `DataTable`, `KpiCard`, `EmptyState`, `Sparkline`, `Delta`, `SignalBadge`, `LiveSync`, `BrandMark`, `ToolLauncher`, `ChartTooltip`, `FileUpload`, more.
- **[src/components/portco/](./src/components/portco/)** — Echelon and Improv composites under `<PortcoTheme>` wrapper.
- **[public/tlb-logo.png](./public/tlb-logo.png)** — official brand mark.
- **[starter-kit/](./starter-kit/)** — drop-in `tailwind.css`, `lib-utils.ts`, `components.json`, and agent-rule templates for new consumer repos.

## Core rules to honor

- **Dark-first surfaces.** Build against the `bg-0 / 1 / 2 / 3` ladder + `#30363d` hairline borders, not shadows.
- **Orange `#FF6600` only for action, active, and focus.** Never decoration, never large fills, never data.
- **Green / red only for data signal** (gains, losses, pass, fail). Never for generic chrome.
- **Manrope** for UI text; **JetBrains Mono** (tabular) for every number; **Bebas Neue Pro** uppercase for display headers.
- Tight radii, restrained fast motion, no emoji, no decorative gradients, no em dashes.
- Voice is terse, precise, operator-facing, sentence case for body, UPPERCASE tracked-out labels for eyebrows.
- No inline hex colors, no `any`, no competing UI libraries, no inline `style={}` for layout. Use `cn()` for any conditional className.

## How to work

- **Production code.** Install components via the shadcn CLI from this repo's registry (see [docs/02-installation.md](./docs/02-installation.md)). Read [AGENTS.md](./AGENTS.md) end to end before writing JSX. Read the most relevant doc in `docs/` for the task. Run `npm run lint` and `npm run typecheck` before declaring done.
- **Throwaway prototypes or mocks.** Mirror the visual foundations and tokens in `src/styles/tailwind.css`. Use the `BrandMark` composite or `public/tlb-logo.png` for the wordmark. Follow the voice rules in `docs/00-brand-and-voice.md`.

If the user invokes this skill without other guidance, ask what they want to build, ask a few focused questions, and act as an expert TLB designer or engineer, outputting either HTML artifacts or production-grade React code depending on the need.
