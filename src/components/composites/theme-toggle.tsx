/**
 * ThemeToggle
 *
 * The portal's light/dark switch. next-themes owns the `dark` class on
 * <html> and its persistence (storageKey "theme"). `resolvedTheme` is
 * undefined on the first render, before next-themes reads storage; that
 * counts as dark, the portal default, so the icon never flashes the wrong
 * state. Pair it with the pre-paint script in starter-kit/index.html.
 *
 * Source: tlb-financial-tools `apps/web/src/shared/components/AppShell.tsx`
 * (ThemeToggle).
 */
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "flex size-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-bg-raised hover:text-foreground",
        className,
      )}
    >
      {isDark ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
    </button>
  );
}

export { ThemeToggle };
