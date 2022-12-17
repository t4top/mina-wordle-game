import { sveltekit } from "@sveltejs/kit/vite";

// Fix for
// Uncaught (in promise) DOMException: Failed to execute 'postMessage' on 'Worker': SharedArrayBuffer transfer requires self.crossOriginIsolated.
// during localhost development
/** @type {import('vite').Plugin} */
const viteServerConfig = {
  name: "log-request-middleware",
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "GET");
      res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
      res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
      next();
    });
  }
};

/** @type {import('vite').UserConfig} */
const config = {
  define: {
    "process.env.BUILDTIME": JSON.stringify(new Date().toISOString())
  },
  plugins: [viteServerConfig, sveltekit()],
  build: {
    target: "es2020"
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2020"
    }
  }
};

export default config;
