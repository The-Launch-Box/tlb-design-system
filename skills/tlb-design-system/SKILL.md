---
name: tlb-design-system
description: Use whenever you build, change, review, or prototype UI in any The Launch Box (TLB) repo (tlb-financial-tools, Echelon Automation Hub, tlb-workspace, new apps). Gives you the TLB design system's rules, tokens, docs, and component source so you reuse existing composites instead of rebuilding them. Also use when asked which TLB component fits, how to theme a firm (colours only), how to rebuild the tlb-financial-tools portal, or how to install a component from the TLB registry.
---

# TLB Design System

You have a local copy of the `The-Launch-Box/tlb-design-system` repo at:

`${CLAUDE_PLUGIN_ROOT}`

Read files from there with your Read/Grep/Glob tools. Do not guess at components, tokens, or rules that you can look up.

## Source of truth

The TLB look is the tlb-financial-tools portal's. Tokens, fonts and components here are copies of it, and `${CLAUDE_PLUGIN_ROOT}/docs/14-tlb-financial-tools-blueprint.md` describes how the portal is assembled. Firms (TLB and each portfolio company) differ by colour tokens only: never build a per-firm component, page, font or logo.

## Precedence

1. The consumer repo's own `AGENTS.md` / `CLAUDE.md` win for anything repo-specific (where tokens live, path aliases, domain rules, restricted brand assets).
2. This design system wins for everything else: stack, hard rules, component choice, tokens, copy and voice.
3. If the two conflict on a hard rule, stop and ask the human.

## Workflow

1. **Rules first.** Read `${CLAUDE_PLUGIN_ROOT}/AGENTS.md` once per session before writing JSX.
2. **Find before you build.** Check whether a component already exists:
   - Index: `${CLAUDE_PLUGIN_ROOT}/registry/registry.json` (name and one-line description of every installable item).
   - Guidance: `${CLAUDE_PLUGIN_ROOT}/docs/04-component-catalog.md`.
   - Source: `${CLAUDE_PLUGIN_ROOT}/src/components/ui/` (shadcn primitives), `.../composites/` (TLB app composites), `.../marketing/`, and `${CLAUDE_PLUGIN_ROOT}/src/lib/firm-themes.ts`.
   - Live demo of every component: `${CLAUDE_PLUGIN_ROOT}/src/pages/components-board.tsx` and `tool-and-review-showcase.tsx` show real usage.
3. **Install, don't copy by hand**, when the consumer repo has a `components.json`:
   ```bash
   npx shadcn@latest add https://the-launch-box.github.io/tlb-design-system/r/<name>.json
   ```
   Then fix the import aliases if the repo's differ from `@/components` and `@/lib/utils`. A composite that uses the design-system additions (motion tokens, `eyebrow`, `figures`, `pip`, `lift`) also needs that block from `${CLAUDE_PLUGIN_ROOT}/src/styles/tailwind.css` in the repo's own CSS.
4. **Tokens.** `${CLAUDE_PLUGIN_ROOT}/docs/03-tokens-and-theme.md` and `src/styles/tailwind.css` are the source of truth. Use semantic utilities only (`bg-primary`, `bg-card`, `text-muted-foreground`, `text-accent-ink`, `text-positive`, ...). Fonts: Bebas Neue (display), Inter (body), JetBrains Mono (figures). No raw hex/rgb/hsl outside `@theme`.
5. **Patterns.** Page layout, forms, tables, empty states, destructive actions: `docs/05-patterns.md`. Accessibility: `docs/06-accessibility.md`. Icons and charts: `docs/07-icons-and-charts.md`. Firm theming: `docs/12-firm-themes.md`. Rebuilding the portal: `docs/14-tlb-financial-tools-blueprint.md`. Voice and copy: `docs/00-brand-and-voice.md`.

## Hard rules (summary; AGENTS.md is authoritative)

- shadcn/ui + Radix, Tailwind v4, lucide-react, recharts, react-hook-form + zod, @tanstack/react-table. No other UI, icon, or chart library.
- No inline colors, no `any`, no em dashes, `cn()` for every conditional class.
- Every input has a label or `aria-label`; color is never the only signal.

## Giving back

If you build something in a consumer repo that another TLB app would reuse (a composite, not a one-off page), say so in your summary and suggest upstreaming it to `tlb-design-system`: add it under `src/components/composites/`, register it in `registry/registry.json`, demo it on the component board, and list it in `docs/04-component-catalog.md`.

## Freshness

This copy updates when the marketplace updates. If something you need seems missing, tell the user to run `/plugin marketplace update tlb-design-system`, or check the live registry at https://the-launch-box.github.io/tlb-design-system/r/registry.json.
