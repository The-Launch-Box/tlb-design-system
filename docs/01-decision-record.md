# ADR-001: UI System for TLB Internal Tooling

**Status:** Accepted  
**Date:** 2026-05-15  
**Decision owner:** IT Director (Alam)  
**Author:** TLB Engineering

## Context

TLB builds and maintains internal applications across four functional domains: finance, people ops, marketing, and IT. The portfolio includes (today) `tlb-financial-tools` and `improv-procurement`, with more apps expected through 2026 and 2027. Each app has been built by different engineers and AI agents, and a UI inconsistency has already emerged: `tlb-financial-tools` is on the Tailwind plus Radix path while `improv-procurement` is on Microsoft Fluent UI v9.

Two cost drivers result from this inconsistency. The first is human: every engineer crossing repos pays a re-orientation tax. The second is agent: AI coding assistants (Claude Code, Cursor, v0, and similar) cannot produce repeatably correct code unless the target system is opinionated, well-known to the model, and stable.

## Decision

TLB internal applications adopt **shadcn/ui** as the standard UI system, layered on:

- **Radix UI** primitives (already a transitive dependency of shadcn).
- **Tailwind CSS v4** with TLB brand tokens in the `@theme` block.
- **lucide-react** for icons.
- **recharts** for charts.
- **react-hook-form** plus **zod** for forms.
- **@tanstack/react-table** for tables.

This applies to all new and existing internal apps. Existing apps on other systems migrate per the playbook in `docs/05-patterns.md` and the repo-specific audits.

## Options Considered

| Option | Rationale for | Rationale against | Verdict |
|---|---|---|---|
| **shadcn/ui** | Components are copied into the repo, giving humans and AI agents direct read and write access to the source. Built on Radix, which gives accessibility for free. Most AI coding tools default to it and produce accurate code with minimal prompting. The 2026 update (CLI v4, shadcn/skills, MCP server) explicitly targets agentic workflows. ~114k GitHub stars and growing fast. | New components require a CLI step to install. Theming via Tailwind v4 is a recent API. | **Chosen.** |
| **Mantine** | Most batteries-included system. 100+ components and a hooks library. Strong dashboards. | Components live in `node_modules`, harder for AI agents to inspect and modify. Less LLM training data than the leaders. | Strong runner-up. |
| **Ant Design** | Strongest out-of-the-box enterprise components, especially data tables and forms. ~97k stars. | Visual identity is strongly Ant-Chinese-enterprise. Hard to make feel like TLB without significant override work. | Rejected on brand fit. |
| **Material UI (MUI)** | Largest install base. 6.7M weekly downloads. Most AI training data. | Material Design language is opinionated in a direction that conflicts with TLB's identity. Theming is heavier. | Rejected on brand fit. |
| **Chakra UI** | Strong accessibility defaults. Modular. | Less opinionated, which weakens repeatability. 2026 internals are in flux (Emotion removal). | Rejected for now. |
| **Fluent UI v9** (currently in `improv-procurement`) | Tight Microsoft 365 / Azure visual fit. | Heavy bundle. Less common in AI training data, so agents produce shakier output. Visual identity is Microsoft, not TLB. | Rejected. Migration path provided. |
| **Roll our own** | Total control. | Costly. Solves no real problem better than shadcn. Hostile to AI agents. | Rejected. |

## Consequences

### Positive

- Every TLB internal app has the same primitives, the same tokens, the same patterns. Engineers and agents move between repos with no re-orientation.
- AI agents (Claude Code, Cursor, v0, Windsurf) produce compliant UI code with simple prompts, because shadcn is what they default to.
- TLB brand tokens flow through Tailwind v4's `@theme`, so the visual identity is enforced at the token layer rather than re-applied per component.
- Accessibility comes for free via Radix.

### Negative

- `improv-procurement` requires a multi-week migration off Fluent UI v9. See [repo-audits/improv-procurement.md](../repo-audits/improv-procurement.md).
- Engineers used to "install and import" component libraries will adjust to the "copy and own" model that shadcn uses.
- New shadcn major versions occasionally ship breaking changes to the CLI. We pin and upgrade deliberately per `docs/11-versioning-and-updates.md`.

### Neutral

- We keep the existing Azure MSAL auth pattern unchanged across repos. shadcn does not touch auth.
- We keep recharts as the chart library since both repos already use it (or are easy to add it to).

## Review Cadence

Re-evaluate this decision annually, or sooner if shadcn/ui makes a breaking change that is not absorbable inside one minor version bump. The IT Director owns the call.
