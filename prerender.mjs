// SSG: injeta o HTML pré-renderizado da página no template do build.
// Roda depois de `vite build` (cliente) e `vite build --ssr` (servidor).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const abs = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(abs("dist/index.html"), "utf-8");
const { render } = await import("./dist-server/entry-server.js");

fs.writeFileSync(abs("dist/index.html"), template.replace("<!--ssg-outlet-->", render()));
console.log("pre-rendered: dist/index.html");

// O bundle de SSR é só ferramenta de build — não vai para a imagem de produção.
fs.rmSync(abs("dist-server"), { recursive: true, force: true });
