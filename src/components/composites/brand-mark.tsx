/**
 * BrandMark
 *
 * The official TLB wordmark inside a light lozenge. Used in the sidebar
 * brand slot, brand chips, and any place the brand needs a deliberate
 * container. The official mark is black-on-light, so the lozenge is a
 * white field with a hairline border that reads on any surface.
 *
 * The lozenge enforces clear space via inner padding. Two pre-sized
 * variants cover the common needs (sidebar tile and inline header chip).
 *
 * The asset itself is `tlb-logo.png` in the consumer app's `public/`
 * directory. Copy it over when installing this composite. The default
 * `src` is resolved against the app's base URL so it works both at the
 * domain root and when the app is served from a subpath (e.g. a GitHub
 * Pages project site). Pass an explicit `src` to override.
 *
 * @example
 *   <BrandMark />              // 64px sidebar tile
 *   <BrandMark size="sm" />    // 32px inline chip
 */
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  size?: "sm" | "md" | "lg";
  src?: string;
  alt?: string;
  className?: string;
}

const SIZE_CLASSES = {
  sm: "size-8 rounded-sm",
  md: "size-16 rounded-md",
  lg: "size-24 rounded-md",
} as const;

/**
 * Default brand asset, resolved against the app base URL (Vite's
 * `BASE_URL`, which always ends in a slash). Serves correctly from the
 * domain root (`/tlb-logo.png`) and from a subpath project site
 * (`/tlb-design-system/tlb-logo.png`).
 */
const DEFAULT_LOGO_SRC = `${import.meta.env.BASE_URL}tlb-logo.png`;

function BrandMark({
  size = "md",
  src = DEFAULT_LOGO_SRC,
  alt = "The Launch Box",
  className,
}: BrandMarkProps) {
  return (
    <span
      data-slot="brand-mark"
      className={cn(
        "inline-grid place-items-center overflow-hidden border border-border bg-white p-1.5",
        SIZE_CLASSES[size],
        className
      )}
    >
      <img src={src} alt={alt} className="size-full object-contain" />
    </span>
  );
}

export { BrandMark };
export type { BrandMarkProps };
