# Tokens and Theme

TLB visual identity flows into apps through CSS custom properties declared inside Tailwind v4's `@theme` block. No component file should ever hardcode a hex value. Every color, radius, shadow, and font family resolves from a token.

## TLB Brand Tokens

These are the source of truth. They mirror the TLB brand standards document.

| Role | Name | Hex | Token |
|---|---|---|---|
| Primary | TLB Orange | `#FF6600` | `--color-tlb-orange` |
| Secondary | TLB Dark Orange | `#FF3300` | `--color-tlb-dark-orange` |
| Base Dark | TLB Black | `#000000` | `--color-tlb-black` |
| Near-Black | TLB Charcoal | `#1A1A1A` | `--color-tlb-charcoal` |
| Base Light | TLB White | `#FFFFFF` | `--color-tlb-white` |
| Subtle | Light Gray | `#F5F5F5` | `--color-tlb-gray-50` |
| Accent Tint | Pale Orange | `#FFF8F4` | `--color-tlb-orange-tint` |

## Semantic Mapping to shadcn

shadcn expects a small set of semantic names. We map TLB tokens onto them.

| shadcn role | Light theme | Dark theme |
|---|---|---|
| `background` | TLB White | TLB Black |
| `foreground` | TLB Black | TLB White |
| `primary` | TLB Orange | TLB Orange |
| `primary-foreground` | TLB White | TLB White |
| `secondary` | TLB Charcoal | TLB Gray-50 |
| `secondary-foreground` | TLB White | TLB Black |
| `destructive` | TLB Dark Orange | TLB Dark Orange |
| `destructive-foreground` | TLB White | TLB White |
| `muted` | `#F5F5F5` | TLB Charcoal |
| `muted-foreground` | TLB Charcoal | TLB Gray-50 |
| `accent` | TLB Orange Tint | TLB Charcoal |
| `accent-foreground` | TLB Black | TLB White |
| `border` | `#E5E5E5` | TLB Charcoal |
| `input` | `#E5E5E5` | TLB Charcoal |
| `ring` | TLB Orange | TLB Orange |

## The `@theme` Block (Tailwind v4)

The full token definition lives in `src/styles/tailwind.css`. Reference implementation is in `starter-kit/tailwind.css`. The structure:

```css
@import "tailwindcss";

@theme {
  /* Brand colors */
  --color-tlb-orange: #FF6600;
  --color-tlb-dark-orange: #FF3300;
  --color-tlb-black: #000000;
  --color-tlb-charcoal: #1A1A1A;
  --color-tlb-white: #FFFFFF;
  --color-tlb-gray-50: #F5F5F5;
  --color-tlb-orange-tint: #FFF8F4;

  /* Semantic (light theme defaults) */
  --color-background: var(--color-tlb-white);
  --color-foreground: var(--color-tlb-black);
  --color-primary: var(--color-tlb-orange);
  --color-primary-foreground: var(--color-tlb-white);
  --color-destructive: var(--color-tlb-dark-orange);
  --color-destructive-foreground: var(--color-tlb-white);
  --color-muted: var(--color-tlb-gray-50);
  --color-muted-foreground: var(--color-tlb-charcoal);
  --color-accent: var(--color-tlb-orange-tint);
  --color-accent-foreground: var(--color-tlb-black);
  --color-border: #E5E5E5;
  --color-input: #E5E5E5;
  --color-ring: var(--color-tlb-orange);

  /* Typography */
  --font-display: "Bebas Neue Pro", "Arial Black", Impact, sans-serif;
  --font-sans: Helvetica, Arial, sans-serif;
  --font-mono: ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace;

  /* Radii */
  --radius: 0.375rem; /* 6px, slightly less round than shadcn default */
  --radius-sm: calc(var(--radius) - 2px);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) + 2px);
}

/* Dark theme override */
.dark {
  --color-background: var(--color-tlb-black);
  --color-foreground: var(--color-tlb-white);
  --color-muted: var(--color-tlb-charcoal);
  --color-muted-foreground: var(--color-tlb-gray-50);
  --color-accent: var(--color-tlb-charcoal);
  --color-accent-foreground: var(--color-tlb-white);
  --color-border: var(--color-tlb-charcoal);
  --color-input: var(--color-tlb-charcoal);
}
```

## Light Theme vs Dark Theme

TLB brand guidance splits theme usage by document type. The same logic applies to internal apps:

- **Light theme (default).** Most internal tools: financial dashboards, procurement, people-ops apps, marketing tools.
- **Dark theme (opt-in).** Security and IT tools where dark is preferred for long sessions, or audit-style report views inside an app.

Switch by toggling the `.dark` class on the `<html>` element. Persist the choice in `localStorage` under the key `tlb-theme`. A standard `ThemeToggle` component lives in `src/components/layout/theme-toggle.tsx`. Do not roll your own.

## Typography Rules

| Use | Class |
|---|---|
| Page H1 / hero | `font-display uppercase tracking-tight text-4xl text-tlb-orange` |
| Section header | `font-display uppercase tracking-tight text-2xl text-tlb-orange` |
| Card / dialog title | `font-display uppercase tracking-tight text-lg text-foreground` |
| Body | `font-sans text-base text-foreground` |
| Help text | `font-sans text-sm text-muted-foreground` |
| Metadata / footnote | `font-sans text-xs text-muted-foreground` |
| Inline code / values | `font-mono text-sm` |

Hard rule: Bebas Neue Pro is uppercase by default. Headings using `font-display` always carry `uppercase tracking-tight`.

## Color Rules to Enforce

These come straight from the TLB brand standards.

1. Never render small orange (`#FF6600`) text on white. Body copy is `#000000`. Orange is for headers, buttons, accent bars, links, and badges.
2. The destructive variant uses TLB Dark Orange (`#FF3300`), not red. TLB does not have a red in its palette.
3. Do not introduce new colors. If a client palette is referenced inside a tool that surfaces a portco's branded data, scope those colors to the data view, not to the app shell.

## Spacing, Radii, and Elevation

| Token | Value | Use |
|---|---|---|
| `--radius` | 6px | Default for buttons, inputs, cards. |
| `--radius-lg` | 8px | Dialogs, large cards. |
| `--radius-sm` | 4px | Badges, chips. |
| Shadows | shadcn defaults | Do not customize per component. |

Spacing follows Tailwind's default scale. Do not introduce custom spacing tokens.

## What to Do If You Need a New Token

Open a PR against this repository, not against the consuming app. The token gets added in `starter-kit/tailwind.css` and propagated to every TLB app on the next sync. This keeps the source of truth single.
