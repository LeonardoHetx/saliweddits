import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// No build o HTML já vem pré-renderizado (SSG): hydrateRoot adota o DOM em vez
// de recriá-lo. No `vite dev` não há prerender, então o root chega vazio.
if (root.firstElementChild) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
