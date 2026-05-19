# Do and Don't

The fastest-reading file in this repository. Print this and pin it next to your monitor. Reviewers and AI agents use it as the first-pass checklist.

## Do

- Use shadcn primitives from `src/components/ui/`.
- Run `npx shadcn@latest add <name>` when a primitive is missing. Do not re-implement.
- Wrap conditional classNames with `cn()` from `src/lib/utils.ts`.
- Define variants with `class-variance-authority` (`cva`) inside the component file.
- Pull colors from tokens: `bg-primary`, `text-foreground`, `border-border`, `text-tlb-orange`.
- Pull fonts from tokens: `font-display`, `font-sans`, `font-mono`.
- Use `lucide-react` for icons. Always.
- Use `recharts` for charts. Always.
- Use `react-hook-form` plus `zod` for forms. Always.
- Use `@tanstack/react-table` plus shadcn `Table` for tables. Always.
- Format currency through `Intl.NumberFormat`. Dates through `Intl.DateTimeFormat` or `date-fns`.
- Give every interactive element a discernible name.
- Give every form input a `Label`.
- Run `npm run lint` and `npm run typecheck` before opening a PR.
- Tab through every interactive element after a change. Confirm focus rings are visible.
- Confirm light and dark mode both render correctly.
- Keep button labels short, active-voice, and in title case for primary actions.
- Use "Save", "Delete", "Cancel" rather than "Yes", "No", "OK".
- Put the primary action on the right in dialogs and forms.
- Use a single Sonner toast per user action.
- Use `AlertDialog` for destructive actions. Always.
- Document new composites with a JSDoc block at the top of the file.
- Search `src/components/` before creating a new component.

## Don't

- Add MUI, Ant Design, Chakra, Mantine, HeroUI, Fluent UI, Bootstrap, Heroicons, Font Awesome, Material Icons, Tabler, Phosphor, Emotion, styled-components, stitches, UnoCSS, Panda, vanilla-extract, moment.js, Chart.js, ApexCharts, Highcharts, Visx, Plotly, or Nivo. Ever.
- Hardcode hex, rgb, hsl, or named colors in JSX or CSS outside the `@theme` block.
- Use `style={{}}` for layout, spacing, color, or typography.
- Use the `any` type. Use `unknown` and narrow.
- Use em dashes anywhere. Anywhere.
- Concatenate classNames with `+` or template strings.
- Branch on roles with inline ternaries. Use `<Permission requires="...">`.
- Roll a custom modal, dropdown, tooltip, popover, or select. Use the shadcn primitive.
- Use `<button>` with hand-rolled styles. Use `Button`.
- Use `<select>` or `<dialog>` HTML elements. Use the shadcn equivalents.
- Use `title` attribute as a substitute for `aria-label` or `Tooltip`.
- Use a `placeholder` as a substitute for a `Label`.
- Use a full-screen spinner. Use skeletons or button-scoped loaders.
- Use color alone to communicate status. Pair with text.
- Use a pie or donut chart.
- Use `moment.js`.
- Mix icon libraries.
- Write a custom variant prop branch in JSX. Use `cva`.
- Re-implement a TLB composite that already exists. Search and reuse.
- Use "customer" when "client" is meant.
- Use "leverage" as a verb.
- Use "synergy", "best-in-class", "world-class", "cutting-edge".
- Start sentences in UI copy with "basically", "frankly", "honestly".
- Use animations longer than 200ms.

## Always Ask First

- Adding any library not on the approved list.
- Changing a TLB brand token.
- Introducing a new chart type or visualization library.
- Adding a third theme beyond light and dark.
- Adding a global CSS file outside `src/styles/tailwind.css`.
- Changing the file structure documented in `docs/08-file-structure.md`.

## Pre-PR Checklist (Copy Into the PR Description)

```
- [ ] No new dependencies, or new dependencies justified and on the approved list.
- [ ] No hardcoded colors outside the @theme block.
- [ ] cn() wraps every conditional className.
- [ ] All variants defined with cva.
- [ ] Every interactive element has a discernible name.
- [ ] Every form input has a Label.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] Light mode and dark mode both render correctly.
- [ ] Keyboard navigation works end to end with visible focus.
- [ ] No `any`. No em dashes. No inline style for layout, spacing, color, typography.
```
