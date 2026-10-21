import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";

/**
 * Renderiza a página no build (SSG). Chamado pelo prerender.mjs; usa
 * renderToString para o cliente conseguir hidratar o markup.
 */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
