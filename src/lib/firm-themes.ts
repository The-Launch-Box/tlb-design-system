// SOURCE OF TRUTH: tlb-financial-tools apps/web/src/features/branding/firm-themes.ts.
// Copied verbatim except one line: TLB_FIRM is declared with a non-null
// assertion because this repo compiles with noUncheckedIndexedAccess.
// Change it there first, then here.

/**
 * Per-firm branding registry: the single source of truth for the portal's
 * firm-specific look (header wordmark, hero flapboard, page theme).
 *
 * Colors are NOT held here: each firm owns a token set in `index.css`
 * (`--firm-<key>-accent|accent-light|ink|ink-light|accent-foreground|primary|
 * chart-1..4|chart-1..4-light|chart-1..4-ink-light`), honoring the "colors only
 * in index.css" rule. At runtime the active firm's set is copied into generic
 * slots (`--accent`, `--accent-ink`, `--accent-foreground`, `--firm-primary`,
 * `--firm-chart-*`, `--firm-chart-*-ink`) that the semantic tokens chain off, so
 * one call retints the whole page: controls, header, surfaces, and chart series.
 *
 * The accent has two tracks so the color reads in both themes: `accent` / `ink`
 * feed the dark canvas, `accent-light` / `ink-light` feed the light canvas.
 * `accent*` is the brand fill; `ink*` is the accent used as text. The same holds
 * for the chart series. The accent, ink, and chart slots each have a light and a
 * dark track; applyFirmTheme picks the one matching the active theme, so it must
 * run again whenever the theme flips, not only on firm change. Callers that know
 * the theme pass it in rather than letting it be read back off the DOM (see
 * applyFirmTheme).
 *
 * `key` matches the entity key from `/api/me/workspace` EXACTLY (the seed's
 * keys include dashes: `vescape-labs`, `dx-foundation`).
 */
export interface FirmTheme {
  /** Entity key (lowercase, may contain dashes), or `tlb` for the parent brand. */
  key: string;
  /** Uppercase label for the split-flap hero board and header wordmark. */
  name: string;
  /** Mixed-case name for prose (eyebrow, firm cards). */
  displayName: string;
  /**
   * Keep this firm out of the flapboard hover tour. It still carries its own
   * name and brand tokens, so a session scoped to it is unaffected; only the
   * all-firms view stops cycling through it.
   */
  excludedFromTour?: boolean;
}

export const FIRM_THEMES: FirmTheme[] = [
  { key: "tlb", name: "TLB", displayName: "TLB" },
  { key: "echelon", name: "ECHELON", displayName: "Echelon" },
  { key: "improv", name: "IMPROV", displayName: "Improv" },
  { key: "hyperscayle", name: "HYPERSCAYLE", displayName: "Hyperscayle" },
  { key: "vescape-labs", name: "VESCAPE", displayName: "VEscape Labs" },
  { key: "dx-foundation", name: "DX FOUNDATION", displayName: "DX Foundation" },
  // Blue Trail Digital, shown as BTD. The key stays `bluetrail` because it has
  // to match the entity key from /api/me/workspace and the --firm-bluetrail-*
  // token set in index.css; only the labels changed.
  { key: "bluetrail", name: "BTD", displayName: "Blue Trail Digital" },
];

export const TLB_FIRM: FirmTheme = FIRM_THEMES[0]!;

/** Token parts every firm defines in index.css as --firm-<key>-<part>. */
export type FirmVarPart =
  | "accent"
  | "accent-light"
  | "ink"
  | "ink-light"
  | "accent-foreground"
  | "primary"
  | "chart-1"
  | "chart-2"
  | "chart-3"
  | "chart-4"
  | "chart-1-light"
  | "chart-2-light"
  | "chart-3-light"
  | "chart-4-light"
  | "chart-1-ink-light"
  | "chart-2-ink-light"
  | "chart-3-ink-light"
  | "chart-4-ink-light";

/**
 * Theme-independent parts copied straight into their runtime slot. The accent,
 * ink, and chart slots are set separately (below) because which track applies
 * depends on the active theme.
 */
const GENERIC_SLOTS = {
  "accent-foreground": "--accent-foreground",
  primary: "--firm-primary",
} satisfies Partial<Record<FirmVarPart, string>>;

/** The chart series, and the runtime slots each one drives. */
const CHART_SERIES = [1, 2, 3, 4] as const;

/** Every runtime slot applyFirmTheme() manages, for the reset-to-default path. */
const RESET_SLOTS = [
  ...Object.values(GENERIC_SLOTS),
  "--accent",
  "--accent-ink",
  ...CHART_SERIES.flatMap((n) => [`--firm-chart-${n}`, `--firm-chart-${n}-ink`]),
];

/** The CSS custom property holding one part of a firm's token set. */
export function firmVar(theme: FirmTheme, part: FirmVarPart): string {
  return `--firm-${theme.key}-${part}`;
}

/** The firm theme for an entity key, or undefined when unmapped. */
export function firmThemeByKey(key?: string | null): FirmTheme | undefined {
  if (!key) return undefined;
  const k = key.toLowerCase();
  return FIRM_THEMES.find((f) => f.key === k);
}

/**
 * The flapboard hover tour for the all-firms view: every firm except the
 * active one, minus any firm flagged `excludedFromTour`.
 */
export function otherFirms(active: FirmTheme): FirmTheme[] {
  return FIRM_THEMES.filter(
    (f) => f.key !== active.key && !f.excludedFromTour,
  );
}

/**
 * Apply a firm's full token set by copying its --firm-<key>-* values into the
 * runtime slots. Picks the accent/ink/chart track matching the active theme:
 * pass `isDark` when you know it, since the `dark` class fallback is stale during
 * an in-page flip. For TLB (or an unmapped firm) the overrides are removed so the
 * :root / .dark defaults apply. `html { transition: --accent }` animates the
 * accent.
 */
export function applyFirmTheme(
  theme: FirmTheme | undefined,
  isDark?: boolean,
): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (!theme || theme.key === TLB_FIRM.key) {
    for (const slot of RESET_SLOTS) {
      root.style.removeProperty(slot);
    }
    return;
  }
  const styles = getComputedStyle(root);
  const copy = (part: FirmVarPart, slot: string) => {
    const value = styles.getPropertyValue(firmVar(theme, part)).trim();
    if (value) root.style.setProperty(slot, value);
    else root.style.removeProperty(slot);
  };
  for (const part of Object.keys(GENERIC_SLOTS) as (keyof typeof GENERIC_SLOTS)[]) {
    copy(part, GENERIC_SLOTS[part]);
  }
  // Prefer the caller's theme over the DOM. next-themes owns the `dark` class and
  // sets it from the provider's effect, but React runs child effects BEFORE parent
  // ones, so a caller reacting to a theme change runs while the class is still the
  // OLD one. Reading it here would then pick the wrong track on every in-page flip
  // and leave, say, improv's dark accent on a light canvas. Callers without the
  // theme to hand (the flapboard's hover cycle, which repaints while the theme is
  // stable) can still fall back to the class.
  const dark = isDark ?? root.classList.contains("dark");
  copy(dark ? "accent" : "accent-light", "--accent");
  copy(dark ? "ink" : "ink-light", "--accent-ink");
  for (const n of CHART_SERIES) {
    copy(dark ? `chart-${n}` : `chart-${n}-light`, `--firm-chart-${n}`);
    copy(dark ? `chart-${n}` : `chart-${n}-ink-light`, `--firm-chart-${n}-ink`);
  }
}
