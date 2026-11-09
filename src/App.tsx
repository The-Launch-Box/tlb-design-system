import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "@/router";

/**
 * Same providers as the tlb-financial-tools portal: next-themes owns the
 * `dark` class (dark by default, storageKey "theme"), and one sonner Toaster
 * sits at the top right.
 */
export function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme">
      <TooltipProvider>
        <AppRoutes />
        <Toaster richColors closeButton position="top-right" />
      </TooltipProvider>
    </ThemeProvider>
  );
}
