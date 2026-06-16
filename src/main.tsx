import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Echelon portco display font (condensed grotesk). Self-hosted so the
// brand mark never falls back to the squished Arial Narrow substitute.
import "@fontsource/barlow-condensed/400.css";
import "@fontsource/barlow-condensed/500.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "@/styles/tailwind.css";
import { App } from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
