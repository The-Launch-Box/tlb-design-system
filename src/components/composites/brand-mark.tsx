/**
 * BrandMark
 *
 * The official TLB wordmark inside a black lozenge. Used in the sidebar
 * brand slot, brand chips on light surfaces, and any place the brand needs
 * a deliberate container (the bare PNG has its own black field so it must
 * sit on black to read correctly).
 *
 * The lozenge enforces clear space and stays on a black background even
 * when the surrounding surface is lighter. Two pre-sized variants cover
 * the common needs (sidebar tile and inline header chip).
 *
 * The asset itself is `/tlb-logo.png` in the consumer app's `public/`
 * directory. Copy it over when installing this composite.
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

function BrandMark({
  size = "md",
  src = "/tlb-logo.png",
  alt = "The Launch Box",
  className,
}: BrandMarkProps) {
  return (
    <span
      data-slot="brand-mark"
      className={cn(
        "inline-grid place-items-center overflow-hidden bg-black",
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
