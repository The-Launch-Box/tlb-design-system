# TLB UI Standards

The single source of truth for user-interface decisions across all internal applications at The Launch Box (TLB).

This repository defines what UI library we use, how it is configured, how engineers and AI agents apply it, and how new internal tools stay visually and structurally consistent over time.

## Scope

These standards apply to every TLB-built internal application: financial tools, people-ops tools, marketing internal apps, IT internal apps, and any portfolio-company-facing internal tooling produced by TLB. Client-deployed software is out of scope unless explicitly adopted.

## The Decision in One Line

**TLB internal applications use [shadcn/ui](https://ui.shadcn.com) on top of Radix UI primitives, Tailwind CSS v4, and lucide-react icons. React 19 and TypeScript are the assumed runtime.**

The full reasoning is in [docs/01-decision-record.md](./docs/01-decision-record.md).

## How to Read This Repository

| If you are... | Start here |
|---|---|
| A human engineer setting up a new repo | [docs/02-installation.md](./docs/02-installation.md) |
| A human engineer adding a feature | [docs/04-component-catalog.md](./docs/04-component-catalog.md), [docs/05-patterns.md](./docs/05-patterns.md) |
| An AI coding agent (Claude Code, Cursor, Windsurf, v0) | [AGENTS.md](./AGENTS.md) |
| A reviewer auditing a PR | [docs/09-do-and-dont.md](./docs/09-do-and-dont.md) |
| Migrating an existing repo | [repo-audits/](./repo-audits) |

## Folder Map

```
tlb-ui-standards/
├── README.md                  This file.
├── AGENTS.md                  The primary instruction file for AI coding agents.
├── CLAUDE.md                  Mirror of AGENTS.md for Claude Code.
├── .cursorrules               Mirror of AGENTS.md for Cursor.
├── docs/
│   ├── 01-decision-record.md       Why shadcn/ui. ADR-style rationale.
│   ├── 02-installation.md          How to bring this stack into any repo.
│   ├── 03-tokens-and-theme.md      TLB brand tokens, Tailwind v4 theme, dark mode.
│   ├── 04-component-catalog.md     Approved components and when to use each.
│   ├── 05-patterns.md              Forms, tables, dashboards, dialogs, layouts.
│   ├── 06-accessibility.md         WCAG 2.2 AA targets and how to hit them.
│   ├── 07-icons-and-charts.md      lucide-react and recharts standards.
│   ├── 08-file-structure.md        Where components live inside an app.
│   ├── 09-do-and-dont.md           Fast-reference rules.
│   ├── 10-ai-agent-workflow.md     How to brief AI tools to produce compliant code.
│   └── 11-versioning-and-updates.md  How we upgrade shadcn and Tailwind.
├── starter-kit/               Drop-in files for new or migrating repos.
│   ├── README.md
│   ├── components.json             shadcn CLI configuration.
│   ├── tailwind.css                Tailwind v4 @theme block with TLB tokens.
│   ├── lib-utils.ts                The cn() helper.
│   ├── AGENTS.md.template          Template AGENTS.md to drop in a repo root.
│   └── .cursorrules.template
└── repo-audits/
    ├── tlb-financial-tools.md      Current state, gaps, migration steps.
    └── improv-procurement.md       Current state (Fluent UI), full migration plan.
```

## Compliance Notes

This repository contains no client data, no personal information, and no internal financials. It is design and engineering scaffolding only. Standard TLB AI Acceptable Use rules still apply when building features that touch financial, HR, or client data: redact before pasting into AI tools, never paste credentials, and route Echelon-related work past the Administrator.

Any UI work that ends up in a client-facing deliverable still requires Reviewer sign-off from Jonatan Hernandez Jr before it leaves TLB.

## Maintainers

Owner: IT Director (Alam).  
UI / Reviewer: Jonatan Hernandez Jr.  
Author: TLB Engineering.

Changes to these standards require a written note in `CHANGELOG.md` (to be added on first amendment) and a one-line summary in the relevant section's frontmatter.
