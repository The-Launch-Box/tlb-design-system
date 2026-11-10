import { createHashRouter, RouterProvider } from "react-router";
import { Home } from "@/pages/home";
import { ComponentsBoard } from "@/pages/components-board";
import { FirmThemesPage } from "@/pages/firm-themes";
import { RunwayPage } from "@/pages/runway";
import { NotFound } from "@/pages/not-found";
import { AppShell } from "@/components/composites/app-shell";
import { ThemeToggle } from "@/components/composites/theme-toggle";

function FirmThemesRoute() {
  return (
    <AppShell sectionLabel="Firm themes" actions={<ThemeToggle />}>
      <FirmThemesPage />
    </AppShell>
  );
}

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/components", element: <ComponentsBoard /> },
  { path: "/firm-themes", element: <FirmThemesRoute /> },
  { path: "/runway", element: <RunwayPage /> },
  { path: "*", element: <NotFound /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
