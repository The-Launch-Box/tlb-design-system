import { createHashRouter, RouterProvider } from "react-router";
import { Home } from "@/pages/home";
import { ComponentsBoard } from "@/pages/components-board";
import { NotFound } from "@/pages/not-found";
import { EchelonPage } from "@/pages/portco/echelon";
import { ImprovPage } from "@/pages/portco/improv";
import { HyperscaylePage } from "@/pages/portco/hyperscayle";
import { VEscapePage } from "@/pages/portco/vescape";
import { BlueTrailPage } from "@/pages/portco/bluetrail";
import { DXFoundationPage } from "@/pages/portco/dxfoundation";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/components", element: <ComponentsBoard /> },
  { path: "/echelon", element: <EchelonPage /> },
  { path: "/improv", element: <ImprovPage /> },
  { path: "/hyperscayle", element: <HyperscaylePage /> },
  { path: "/vescape", element: <VEscapePage /> },
  { path: "/bluetrail", element: <BlueTrailPage /> },
  { path: "/dxfoundation", element: <DXFoundationPage /> },
  { path: "*", element: <NotFound /> },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
