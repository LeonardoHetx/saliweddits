import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

const rootDir = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode, isSsrBuild }) => {
  // LEADS_URL (sem prefixo VITE_: nunca vai para o bundle) só serve ao dev e
  // ao preview, para o /api/lead local fazer o papel do nginx de produção.
  const leadsUrl = loadEnv(mode, process.cwd(), "").LEADS_URL ?? "";
  const leadsProxy = leadsUrl
    ? {
        "/api/lead": {
          target: leadsUrl,
          changeOrigin: true,
          ignorePath: true,
          // O Apps Script responde 302 com o resultado; o nginx segue esse
          // redirect no servidor, e o proxy do dev faz o mesmo.
          followRedirects: true,
        },
      }
    : undefined;

  return {
    resolve: {
      alias: {
        "@": path.resolve(rootDir, "./src"),
      },
    },
    plugins: [react()],
    define: {
      __LEADS_DEV_PROXY__: JSON.stringify(Boolean(leadsUrl)),
    },
    server: {
      port: process.env.PORT ? Number(process.env.PORT) : 5180,
      strictPort: true,
      proxy: leadsProxy,
    },
    preview: {
      proxy: leadsProxy,
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
  };
});
