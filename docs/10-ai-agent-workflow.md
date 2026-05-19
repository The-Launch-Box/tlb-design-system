# AI Agent Workflow

How TLB engineers brief AI coding tools (Claude Code, Cursor, Windsurf, v0, Cline) to produce UI code that lands inside the standards on the first try. Most rework comes from underspecified prompts, not from agent limitations.

## The Three-File Setup (Required in Every TLB Repo)

Every TLB repository carries three files at the root that tell agents how to behave:

| File | Read by | Purpose |
|---|---|---|
| `AGENTS.md` | Most modern agents (industry convention) | Full standards, libraries, hard rules |
| `CLAUDE.md` | Claude Code specifically | Pointer to AGENTS.md plus quick constraints |
| `.cursorrules` | Cursor specifically | Compact constraint list |

Without these files at the repo root, agents fall back to generic React patterns and the output diverges from TLB standards within the first few responses. Drop the templates from `starter-kit/` into every repo before the first AI-assisted PR.

## The Standard Prompt Pattern

When asking an agent to build UI, structure the request like this:

```
Task: <one-sentence what>
Surface: <page, route, or component name>
Scope: <new component | edit existing | full feature>
Context: <link to AGENTS.md or paste the relevant section>
Inputs: <data shapes, API endpoints, zod schemas>
Constraints: <anything beyond AGENTS.md>
Acceptance: <visible verifiable outcomes>
```

Concrete example for `tlb-financial-tools`:

```
Task: Build a "Vendor invoices" page that lists invoices with filters and a row detail sheet.
Surface: src/pages/vendor-invoices.tsx, route /vendor-invoices
Scope: New page plus a new feature folder src/components/feature/vendor-invoices/
Context: Read AGENTS.md and docs/05-patterns.md. Use the DataTable composite.
Inputs:
  - GET /api/invoices returns Invoice[] (id, vendor, amount, status, dueDate)
  - Invoice statuses: 'draft', 'pending', 'paid', 'overdue'
Constraints:
  - Filters: status (multi-select Combobox), date range (Popover + Calendar)
  - Currency rendered with Intl.NumberFormat (USD)
  - Overdue rows show a destructive-colored badge
  - Row click opens a Sheet with full invoice detail
Acceptance:
  - Page renders inside AppShell with PageHeader title "Vendor invoices"
  - DataTable supports sort and pagination at default page size 25
  - Empty state shows when filters return zero rows
  - Light and dark mode both render correctly
  - npm run lint and npm run typecheck pass
```

Why this pattern works:

- Constraints are explicit. The agent does not invent a chart library, a date picker, or a state manager.
- Inputs include exact data shapes. The agent does not guess types.
- Acceptance is verifiable. The agent (and reviewer) can check each item.
- Context references AGENTS.md, which keeps the agent anchored to TLB standards across the session.

## Briefing Tips by Tool

### Claude Code

- Start the session in the repo root. Claude Code reads `CLAUDE.md` automatically.
- Reference relevant doc files explicitly in the first turn: "Read AGENTS.md and docs/05-patterns.md."
- Use the shadcn MCP server if installed. It gives Claude Code direct access to add components from your private registry. Configure once per repo.
- For multi-file work, ask Claude Code to plan first, then implement. The plan surfaces wrong assumptions cheaply.

### Cursor

- Cursor reads `.cursorrules` automatically.
- Use Cursor's @-file mentions to anchor the agent: `@AGENTS.md @docs/04-component-catalog.md`.
- For UI work, keep the relevant page or component file open. Cursor uses the open tabs as context.

### v0 by Vercel

- v0 leans heavily into shadcn. The TLB tokens may not match v0's default theme.
- After generating in v0, paste the output into the repo, then prompt Claude Code or Cursor to "reconcile to AGENTS.md." The reconciliation pass replaces v0's default tokens with TLB tokens.

### Windsurf, Cline, Continue

- Same as Cursor: rely on `AGENTS.md` and `.cursorrules`. Open the target files. Give the standard prompt pattern.

## Bad Prompt vs Good Prompt

**Bad:**
> "Add a vendors page."

What goes wrong: the agent picks a random table component, hardcodes some colors, may add a chart library, may invent a status pattern, may write an inline form. Probability of rework: high.

**Good:**
> "Add a vendors page following docs/05-patterns.md. Use DataTable from src/components/data/. Columns: name (string), status (badge), spend (currency, Intl.NumberFormat). Add a primary 'Add vendor' action in PageHeader that opens a Dialog with VendorForm. Light and dark mode must render correctly. Run lint and typecheck before reporting done."

What goes right: the agent knows exactly which composites to use, which patterns to follow, and what to verify.

## Reviewing Agent Output

Treat agent output as a junior engineer's first draft. Reviewers check:

1. **Forbidden imports.** Grep the diff for any banned library names.
2. **Hardcoded colors.** Grep for `#`, `rgb(`, `hsl(` inside `src/components/`.
3. **`any` types.** Grep for `: any` and `as any`.
4. **Em dashes.** Grep for the character itself.
5. **Inline styles.** Grep for `style={{`.
6. **Pre-PR checklist.** Items in `docs/09-do-and-dont.md` are all satisfied.

A simple grep pass catches roughly 80% of standards violations. The remaining 20% requires reading the diff.

## When the Agent Asks to Add a Library

The agent will sometimes propose adding a library that is on the banned list, especially `moment.js`, a different icon library, or a different chart library. The standard response:

> "That library is banned by AGENTS.md. Use the approved alternative from `docs/04-component-catalog.md` instead."

If the approved alternative cannot do the job, escalate to the human. Do not bend the rule.

## Common Failure Modes and Fixes

| Symptom | Likely cause | Fix |
|---|---|---|
| Agent hardcoded a color | Did not read tokens section | Add "Read docs/03-tokens-and-theme.md" to the prompt |
| Agent imported a non-shadcn UI component | Did not read AGENTS.md | Add "Read AGENTS.md end to end before writing JSX" |
| Agent used inline `<select>` | Underspecified component pick | Reference docs/04-component-catalog.md by name |
| Agent generated em dashes in copy | Default LLM behavior | Add "No em dashes anywhere" to the prompt |
| Agent rolled a custom dialog | Did not search for existing composites | Ask the agent to grep for `Dialog` before generating |
| Agent invented a chart library | Default LLM behavior with `recharts` confusable for others | Add "Use recharts. No other chart library." |

## Make AGENTS.md Easy to Cite

When briefing an agent, copying the relevant section of AGENTS.md into the prompt costs little and improves output quality. The full file fits comfortably in any modern model's context window. There is no penalty for redundancy.

## The Bottom Line

AI agents are good at producing repeatable code when the target is opinionated and the constraints are surfaced. shadcn plus TLB tokens plus AGENTS.md gives them that target. The remaining variance is in how engineers brief them. Take the extra minute on the prompt. The rework you avoid will be larger than the prompt you wrote.
