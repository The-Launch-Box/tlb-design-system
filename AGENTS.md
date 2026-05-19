# AGENTS.md: Instructions for AI Coding Agents

This file is the primary contract between TLB and any AI coding assistant working inside a TLB internal-tooling repository. Claude Code, Cursor, Windsurf, v0, Cline, and any MCP-aware agent must read this file before producing UI code.

If you are an AI agent and this file is present in the workspace, treat it as authoritative. Where this file conflicts with general best practices, this file wins.

## Stack You Are Allowed to Use

| Layer | Choice | Notes |
|---|---|---|
| UI components | shadcn/ui | Components are copied into the repo at `src/components/ui/`. You may modify them. |
| Primitives | @radix-ui/react-* | Already a transitive dependency of shadcn. Do not add competing primitive libs. |
| Styling | Tailwind CSS v4 | Use the `@theme` block in `src/styles/tailwind.css`. Do not write inline `style={}` for layout. |
| Class merging | `cn()` from `src/lib/utils.ts` | Wrap every conditional className with `cn()`. |
| Icons | lucide-react | No other icon library. No raw SVGs for stock icons. |
| Charts | recharts | The only approved chart library for TLB internal apps. |
| Forms | react-hook-form + zod | Schema in `src/schemas/`, form component owns submission. |
| Tables | @tanstack/react-table | Headless, paired with shadcn `Table` primitives for rendering. |
| State (local) | React state and `useReducer` | Default to local state. |
| State (cross-page) | zustand | Only when state must persist across routes. |
| Routing | react-router v7 | Already established in both repos. |
| Auth | @azure/msal-react | Already established. Do not introduce competing auth libs. |
| Date / time | `Intl.DateTimeFormat` or `date-fns` | No moment.js. |

## Libraries You Must Not Add

Adding any of these to a TLB internal repo requires written Administrator approval:

- Any other React component library (MUI, Ant Design, Chakra, Mantine, HeroUI, Fluent UI, Bootstrap, Semantic UI).
- Any other icon set (Heroicons, Font Awesome, Material Icons, Tabler, Phosphor).
- Any other CSS-in-JS runtime (Emotion, styled-components, stitches).
- Any other styling utility competing with Tailwind (UnoCSS, Panda, vanilla-extract).
- Any chart library other than recharts.
- Any date library other than `date-fns` or native `Intl`.

If you believe the task requires one of these, stop and ask the human for approval before installing.

## The Hard Rules

1. **Components live in the repo.** When you need a shadcn component that is not yet installed, run `npx shadcn@latest add <component>` (or its equivalent MCP call) rather than re-implementing it. After install, you may modify the file directly.
2. **No inline color values.** Hex codes, `rgb()`, `hsl()`, named colors are not allowed in JSX or CSS files outside the `@theme` block in `src/styles/tailwind.css`. All colors flow through tokens.
3. **No em dashes.** TLB writing standards prohibit em dashes. Use commas, periods, colons, or parentheses. This applies to UI copy, button labels, and code comments.
4. **`cn()` is mandatory** for any class string that has conditional segments. Never concatenate classNames with `+` or template strings.
5. **Accessibility is not optional.** Every interactive element needs a discernible name. Every form input needs a label or `aria-label`. Tab order must be logical. Color is never the sole carrier of meaning.
6. **No `any`.** Use `unknown` and narrow, or define the type. If a library types are weak, augment them in `src/types/`.
7. **No inline `style={{}}` for layout, spacing, color, or typography.** The only acceptable use is dynamic values that cannot be expressed as a class (for example, a CSS variable controlling a chart's computed height).
8. **One source of truth for variants.** Use `class-variance-authority` (`cva`) inside the component file. Do not branch on props with manual ternaries scattered across the JSX.

## Folder Conventions

```
src/
├── components/
│   ├── ui/            shadcn primitives. Generated. Edit carefully.
│   ├── layout/        AppShell, Sidebar, TopBar, PageHeader.
│   ├── forms/         Field wrappers built on react-hook-form.
│   ├── data/          DataTable, EmptyState, ChartCard, KpiTile.
│   └── feature/<name>/  Feature-specific composites.
├── lib/
│   ├── utils.ts       The cn() helper. Do not delete.
│   └── ...
├── hooks/             Custom hooks. One per file. Prefix with `use`.
├── schemas/           Zod schemas. One per resource.
├── styles/
│   └── tailwind.css   Single source of theme tokens.
└── pages/ or routes/  Route components only. No business logic inline.
```

## How to Pick a Component

Before generating new JSX, walk this decision tree:

1. Is there a shadcn primitive that fits? Use it directly.
2. Is there an existing composite in `src/components/` that fits? Reuse it.
3. Is the new piece reusable across two or more features? Create a composite in `src/components/data/` or `src/components/layout/`.
4. Otherwise, scope it to `src/components/feature/<feature>/`.

Never duplicate a component that already exists. Search `src/components/` first.

## Standard Patterns (Cheat Sheet)

- **Page layout:** `AppShell` > `PageHeader` > one or more `Card` blocks.
- **Form:** `react-hook-form` + zod resolver, `Form` and `FormField` from shadcn, `Button type="submit"` with loading state via `disabled` and a `Loader2` icon from lucide.
- **Table:** `@tanstack/react-table` headless instance + shadcn `Table`, `TableHeader`, `TableRow`, `TableCell`. Paginated by default. Sortable columns expose a header button with `ArrowUpDown` icon.
- **Empty state:** Use `EmptyState` composite from `src/components/data/`. Always includes an icon, a one-sentence explanation, and a primary action.
- **Destructive action:** Always behind an `AlertDialog`. Confirm button uses `variant="destructive"`.
- **Loading:** Skeletons for lists and tables. `Loader2` spinning icon inline for button-scoped loads.
- **Toasts:** shadcn `Sonner` integration. One toast per user action. No stacked verbose logs.

## Color and Typography (Quick Reference)

- Primary action: `bg-tlb-orange text-white` (token: `--color-tlb-orange` = `#FF6600`).
- Destructive: `bg-destructive text-destructive-foreground` (mapped to TLB dark orange `#FF3300`).
- Body text on light: `text-foreground` resolves to `#000000`.
- Body text on dark: `text-foreground` resolves to `#FFFFFF` under the `.dark` class.
- Display / heading fonts: `font-display` resolves to Bebas Neue Pro, with Arial Black as fallback. Headers use uppercase.
- Body: `font-sans` resolves to Helvetica, Arial, sans-serif.

Full token map is in [docs/03-tokens-and-theme.md](./docs/03-tokens-and-theme.md).

## Copy Rules for UI Strings

- TLB style is plain-spoken and active-voice. "Save changes" not "Click here to save your changes."
- Title case for primary buttons and section headers in formal apps. Sentence case for help text, tooltips, and inline copy.
- "Client" not "customer." "Firm" not "company." "Founder" not "owner."
- Never use "leverage" as a verb. Use "use" or be specific.
- Banned filler: "basically," "frankly," "honestly," "synergy," "best-in-class," "world-class," "cutting-edge."
- No em dashes anywhere, including button labels and tooltip text.

## What to Do Before Submitting Code

1. Run `npm run lint` and `npm run typecheck`. Fix everything.
2. Visually verify in dev mode: the page renders in light and dark mode without color clashes.
3. Tab through every interactive element with the keyboard. Confirm focus rings are visible.
4. Confirm every form input has a label and shows validation errors inline.
5. If you added a new shadcn component, confirm it landed in `src/components/ui/` and was added to the imports map.
6. If you added a dependency, justify it in the PR description and confirm it is not on the forbidden list above.

## When You Are Stuck

Stop and ask the human. Do not invent a component pattern. Do not add a library to bridge a gap. Do not silently violate any rule in this file to make the task easier.

The point of these standards is repeatability. Diverging silently costs the firm more than asking costs you.
   