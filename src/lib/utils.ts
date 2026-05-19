import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * TLB UI: className merger.
 *
 * Wrap every conditional className with cn(). Never concatenate with `+` or template strings.
 * Required by every shadcn primitive in this repo.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
