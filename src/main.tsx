import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// Fonts load from Google Fonts in index.html, exactly as the portal does.
import "@/styles/tailwind.css";
import { App } from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
