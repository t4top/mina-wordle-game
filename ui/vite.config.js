import { sveltekit } from "@sveltejs/kit/vite";

/** @type {import('vite').UserConfig} */
const config = {
  define: {
    "process.env.BUILDTIME": JSON.stringify(new Date().toISOString())
  },
  plugins: [sveltekit()]
};

export default config;
