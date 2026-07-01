import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppRoutes } from "@/router";

export function App() {
  return (
    <TooltipProvider>
      <AppRoutes />
      <Toaster richColors closeButton />
    </TooltipProvider>
  );
}
