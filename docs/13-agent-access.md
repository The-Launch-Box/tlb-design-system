# Agent Access: Using the Design System From Any TLB Repo

How a developer's AI agent working in `tlb-financial-tools`, the Echelon Automation Hub, or any future TLB repo finds and follows this design system without anyone pasting docs into a prompt.

## The Three Layers

| Layer | Who it serves | What it gives the agent |
|---|---|---|
| **Claude Code plugin** (this repo is the marketplace) | Every teammate using Claude Code | The `tlb-design-system` skill plus a local copy of this whole repo: rules, docs, tokens, and real component source the agent can Read and Grep. |
| **Consumer `AGENTS.md`** (from `starter-kit/AGENTS.md.template`) | Every agent, every tool | The hard rules inline, plus pointers to the registry and `llms.txt`. Works even with no plugin. |
| **`llms.txt` + shadcn registry on Pages** | Cursor, Codex, Windsurf, v0, anything that can fetch a URL | A link index to the raw docs and `r/registry.json`, the machine-readable list of components. |

The plugin is the main path. The other two are the floor for tools that cannot load Claude plugins, and the backstop when a teammate has not trusted the repo yet.

## Wire Up a Consumer Repo (once per repo)

Run at the consumer repo's root:

```bash
claude plugin marketplace add The-Launch-Box/tlb-design-system --scope project
claude plugin install tlb-design-system@tlb-design-system --scope project
```

That writes `.claude/settings.json` (or merges into it). Check it matches [`starter-kit/claude-settings.json`](../starter-kit/claude-settings.json), then commit it:

```json
{
  "extraKnownMarketplaces": {
    "tlb-design-system": {
      "source": { "source": "github", "repo": "The-Launch-Box/tlb-design-system" }
    }
  },
  "enabledPlugins": {
    "tlb-design-system@tlb-design-system": true
  }
}
```

If the repo already has a `.claude/settings.json`, merge these two keys into it; do not replace the file.

Then add the "Design System Access" block from `starter-kit/AGENTS.md.template` to the repo's `AGENTS.md`, so agents that do not load plugins still know where to look.

## What a Teammate Does

1. Pull the repo and open it in Claude Code.
2. Accept the workspace trust prompt. Claude Code applies `extraKnownMarketplaces` from a repo only after the folder is trusted.
3. If `/plugin` shows the plugin as enabled but not installed, run `/plugin install tlb-design-system@tlb-design-system`.
4. Confirm the skill is there: type `/tlb-design-system:` and it autocompletes. Agents also load it on their own for UI work, because the skill's description names that trigger.

This repo is public, so no GitHub credentials are needed to fetch it.

## Keeping It Current

- `plugin.json` deliberately has **no `version`**, so each commit to `main` counts as a new version. Do not add a `version` unless you also bump it on every release; otherwise teammates stay on a cached copy.
- Auto-update is off by default for non-official marketplaces. Each teammate either turns it on once (`/plugin`, then Marketplaces, then `tlb-design-system`, then Enable auto-update) or runs `/plugin marketplace update tlb-design-system` when they need the latest.
- The shadcn registry on Pages updates on every push to `main` (CDN cache about 10 minutes).

## Validate Changes to the Plugin

```bash
claude plugin validate .
```

Expected warnings: no `version` (on purpose, see above), and `CLAUDE.md` at the plugin root is not loaded as plugin context (correct: it is this repo's own contract; the plugin ships context through `skills/tlb-design-system/SKILL.md`). `--strict` fails on those warnings, so do not use it in CI.

## Limits

- Cloud sessions on claude.ai/code do not load marketplace plugins. Those sessions fall back to the consumer repo's `AGENTS.md` and `llms.txt`.
- The skill reads a local snapshot. When it and the consumer repo disagree on something repo-specific (token file location, path aliases, restricted brand assets), the consumer repo's `AGENTS.md` and `CLAUDE.md` win. The skill says so.

## Giving Back

When an agent builds a reusable composite in a consumer repo, the skill asks it to suggest upstreaming. To upstream: add it under `src/components/composites/`, register it in `registry/registry.json`, demo it on the component board, list it in `docs/04-component-catalog.md`, and note the source repo in the file header.
