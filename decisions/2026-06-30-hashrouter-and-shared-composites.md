# 2026-06-30: HashRouter and shared marketing composites

## Context
The showcase grew from one page to a per-portco board across seven brands. We needed client-side routing that survives GitHub Pages subpath hosting, and a way to avoid duplicating hero/stat/quote composites per brand.

## Decision
- Use react-router `createHashRouter`. Hash routing needs no server rewrite or 404.html fallback on Pages, where the app is served from `/tlb-design-system/`.
- Introduce `src/components/marketing/` token-driven composites reused by every portco page. Per-portco folders keep only signature marks (logo, motif). Echelon and Improv were refactored onto this layer.

## Consequences
- Deep links use the `/#/<route>` form.
- Adding a portco is: token block, union entry, signature mark, one page file composing shared composites.
- Brand fidelity now lives in tokens and page copy, not bespoke components.
