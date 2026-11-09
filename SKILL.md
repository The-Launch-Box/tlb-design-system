---
name: tlb-design-system
description: Use this skill to generate well-branded interfaces and assets for The Launch Box (TLB), the internal enterprise financial-tools platform, either for production or throwaway prototypes and mocks. Contains design tokens, brand voice, visual foundations, iconography rules, and the production component library (shadcn primitives + TLB composites) of the tlb-financial-tools portal, for dashboards, spreadsheets, and data tools in light and dark.
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
- **[docs/12-firm-themes.md](./docs/12-firm-themes.md)**: firm theming, colours only (`applyFirmTheme`).
- **[docs/14-tlb-financial-tools-blueprint.md](./docs/14-tlb-financial-tools-blueprint.md)**: how the tlb-financial-tools portal is assembled, enough to rebuild it.
- **[src/styles/tailwind.css](./src/styles/tailwind.css)** — Tailwind v4 `@theme` block; the single source of truth for tokens. Import once from `src/main.tsx`.
- **[src/components/ui/](./src/components/ui/)**: the shadcn primitives, as tlb-financial-tools ships them.
- **[src/components/composites/](./src/components/composites/)** — TLB composites: `AppShell`, `PageHeader`, `DataTable`, `KpiCard`, `EmptyState`, `Sparkline`, `Delta`, `SignalBadge`, `LiveSync`, `BrandMark`, `ToolLauncher`, `ChartTooltip`, `FileUpload`, more.
- **[src/lib/firm-themes.ts](./src/lib/firm-themes.ts)**: the firm list and `applyFirmTheme()`.
- **[public/tlb-logo.png](./public/tlb-logo.png)** — official brand mark.
- **[starter-kit/](./starter-kit/)** — drop-in `tailwind.css`, `lib-utils.ts`, `components.json`, and agent-rule templates for new consumer repos.

## Core rules to honor

- **tlb-financial-tools is the source of truth.** This repo copies its tokens, fonts and components.
- **Both themes are real.** Dark is the default; light is a full track. Surfaces climb a ladder with hairline borders, not shadows.
- **The accent only for action, active, and focus.** TLB orange `#FF6400` (black label), or the active firm's accent. Never decoration, never large fills, never data.
- **Firms are colours only.** Same components, fonts and TLB logo for every firm.
- **Green / red only for data signal** (gains, losses, pass, fail). Never for generic chrome.
- **Inter** for UI text; **JetBrains Mono** (tabular) for every number; **Bebas Neue** uppercase for display headers; **Bebas Neue Pro** Bold Italic only for the wordmark.
- Tight radii, restrained fast motion, no emoji, no decorative gradients, no em dashes.
- Voice is terse, precise, operator-facing, sentence case for body, UPPERCASE tracked-out labels for eyebrows.
- No inline hex colors, no `any`, no competing UI libraries, no inline `style={}` for layout. Use `cn()` for any conditional className.

## How to work

- **Production code.** Install components via the shadcn CLI from this repo's registry (see [docs/02-installation.md](./docs/02-installation.md)). Read [AGENTS.md](./AGENTS.md) end to end before writing JSX. Read the most relevant doc in `docs/` for the task. Run `npm run lint` and `npm run typecheck` before declaring done.
- **Throwaway prototypes or mocks.** Mirror the visual foundations and tokens in `src/styles/tailwind.css`. Use the `BrandMark` composite or `public/tlb-logo.png` for the wordmark. Follow the voice rules in `docs/00-brand-and-voice.md`.

If the user invokes this skill without other guidance, ask what they want to build, ask a few focused questions, and act as an expert TLB designer or engineer, outputting either HTML artifacts or production-grade React code depending on the need.
