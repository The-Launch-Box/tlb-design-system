# 2026-11-06: The repo is a Claude Code plugin marketplace; composites are lifted generic

## Context
Teammates' agents working in tlb-financial-tools, the Echelon Automation Hub and new repos kept rebuilding components the design system already had, or followed stale pointers: consumer `AGENTS.md` files still named the pre-transfer `nikola-code-ai-tlb` Pages host, which returns 404. Meanwhile both apps had grown reusable components (tool-page shell, review flow) that never made it back here.

## Decision
- Make this repo a Claude Code plugin marketplace with one root plugin (`.claude-plugin/`, `skills/tlb-design-system/SKILL.md`). A consumer repo commits `extraKnownMarketplaces` + `enabledPlugins` in `.claude/settings.json`; each teammate's agent then has the skill and a local copy of the docs and component source. Chosen over git submodules (pins drift, clutters the consumer), copying docs into each repo (forks immediately), and an MCP server (needs hosting for content that is static).
- Leave `version` out of `plugin.json`, so every commit to `main` is a new version and nobody has to remember a bump.
- Keep `llms.txt` on Pages and the "Design System Access" block in consumer `AGENTS.md` as the path for non-Claude agents and cloud sessions, which do not load marketplace plugins.
- Lift app components as generic composites: strip app types (Echelon `Operation`/`AuditEvent`, the portal's tool registry and firm themes) and take plain props or render slots instead. Brand-specific styling (Echelon's skewed pip) becomes brand-neutral.

## Consequences
- Wiring a new repo is two CLI commands and one committed file (`docs/13-agent-access.md`).
- Teammates must trust the folder, and turn on auto-update or run `/plugin marketplace update` to get new commits.
- Consumer apps can now adopt the lifted composites in place of their local copies, but nothing forces that; adoption happens repo by repo.
