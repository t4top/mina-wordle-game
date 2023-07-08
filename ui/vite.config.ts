import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import type { Plugin } from "vite";

// Fix for
// Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.
// during localhost development
const crossOriginIsolation: Plugin = {
  name: "cross-origin-isolation",
  configureServer(server) {
    server.middlewares.use((_, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
      next();
    });
  }
};

export default defineConfig({
  define: {
    "process.env.BUILDTIME": JSON.stringify(new Date().toISOString())
  },
  plugins: [crossOriginIsolation, sveltekit()],
  build: {
    target: "es2022"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "esnext"
    }
  }
});
