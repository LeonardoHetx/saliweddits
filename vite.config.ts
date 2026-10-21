import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ isSsrBuild }) => ({
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5180,
    strictPort: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      // manualChunks só no build de cliente: no build SSR o React é externo
      // e o Rollup recusa colocá-lo num chunk manual.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              react: ["react", "react-dom"],
              gsap: ["gsap"],
            },
          },
    },
  },
}));
