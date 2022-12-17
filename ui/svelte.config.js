import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess({
    stylus: {
      imports: ["/src/lib/styles/index.styl"]
    }
  }),

  kit: {
    adapter: adapter()
  }
};

export default config;
