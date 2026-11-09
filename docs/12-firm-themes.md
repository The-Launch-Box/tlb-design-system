# Firm Themes

TLB apps serve several firms: TLB itself and its portfolio companies. **A firm changes colours, nothing else.** Every firm gets the same TLB components, the same fonts (Bebas Neue, Inter, JetBrains Mono), the same layout and the TLB logo. This is how tlb-financial-tools works, and it replaces the per-portco component sets, fonts and logos this repo used to carry.

Why: one component set means one place to fix a bug and one look to learn. Portco brand assets also carry legal weight. Echelon's are restricted, and adding any portco's logo or typeface to a TLB app needs written approval from TLB IT.

Live demo: the Firm themes page (`src/pages/firm-themes.tsx`).

## The firms

From `src/lib/firm-themes.ts` (`FIRM_THEMES`). The `key` must match the entity key the app's API returns **exactly**, dashes included.

| Key | Header and flapboard name | Display name |
|---|---|---|
| `tlb` | TLB | TLB |
| `echelon` | ECHELON | Echelon |
| `improv` | IMPROV | Improv |
| `hyperscayle` | HYPERSCAYLE | Hyperscayle |
| `vescape-labs` | VESCAPE | VEscape Labs |
| `dx-foundation` | DX FOUNDATION | DX Foundation |
| `bluetrail` | BTD | Blue Trail Digital |

Blue Trail Digital is keyed `bluetrail`, not `btd`, because the key has to match the entity and the token set.

## How it works

1. **Each firm owns a token set** in `src/styles/tailwind.css` (portal: `apps/web/src/index.css`), on `:root`, named `--firm-<key>-<part>`:

   | Part | Meaning |
   |---|---|
   | `accent`, `accent-light` | The brand fill, dark and light track. Drives `primary` and `ring`. |
   | `ink`, `ink-light` | The accent used as text, dark and light track. Drives `text-accent-ink`. |
   | `accent-foreground` | Label colour that sits on the fill (black or white). |
   | `primary` | The firm's dark base. Tints dark cards, canvas and the dark header. |
   | `chart-1..4` | Chart series, dark track. |
   | `chart-1..4-light` | Chart series as marks on the light canvas (3:1). |
   | `chart-1..4-ink-light` | Chart series as text on the light canvas (4.5:1). |

2. **Runtime slots** (`--accent`, `--accent-ink`, `--accent-foreground`, `--firm-primary`, `--firm-chart-N`, `--firm-chart-N-ink`) are what the semantic tokens read. Their defaults on `:root` and `.dark` are TLB's.

3. **`applyFirmTheme(firm, isDark)`** copies the active firm's set into the runtime slots, picking the dark or light track. For TLB, or an unmapped key, it removes the overrides so the TLB defaults apply. `html { transition: --accent ... }` animates the change.

```tsx
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { applyFirmTheme, firmThemeByKey } from "@/lib/firm-themes";

// In the app shell, once:
const { resolvedTheme } = useTheme();
const firm = firmThemeByKey(activeEntityKey);
useEffect(() => {
  applyFirmTheme(firm, resolvedTheme === "dark");
}, [firm, resolvedTheme]);
```

Run it on **theme change too**, not only firm change: the slots are theme-specific. Pass `isDark` rather than letting it read the `dark` class, which is stale during an in-page flip because child effects run before the theme provider's.

## What retints, and what never does

| Retints with the firm | Never retints |
|---|---|
| `bg-primary`, `ring-ring`, focus outlines | Fonts, radii, spacing, layout |
| `text-accent-ink`, `bg-accent-wash`, `bg-accent-soft` | The TLB logo and wordmark |
| `bg-bg-header` (light: accent tint; dark: primary tint) | Status colours: `positive`, `negative`, `warning`, invoicing statuses |
| Dark-theme card and canvas (a 5 to 7% primary mix) | Categorical palettes: expense categories, People Ops slots |
| `--color-chart-1..4` and their inks | `--color-chart-5` |

Status and category colours stay fixed because the colour **is** the meaning. A warning painted in Echelon's acid yellow, or an expense category that changes colour when you switch firm, would mislead.

## Adding a firm

1. Get the brand colours from the brand guidelines sheet. Colours only.
2. Add the `--firm-<key>-*` set to the portal's `apps/web/src/index.css`. Derive the `-light` and `-ink-light` tracks with the portal's `scripts/derive-chart-light-tracks.mjs` rather than picking them by hand. A dark base that vanishes on the dark canvas is lightened with `color-mix(in srgb, <hex> N%, #FFFFFF)`, keeping the true hex as the input.
3. Add `{ key, name, displayName }` to `FIRM_THEMES` in the portal's `firm-themes.ts`.
4. Copy both files here and add the firm to the table above.

Do not add a logo, typeface, component or page for the firm.
