import { normalizePath } from "vite";
import path from "path";
import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const config = {
  root: normalizePath(path.resolve("./")),

  preprocess: preprocess(),

  kit: {
    adapter: adapter({}),

    alias: {
      $lib: "./src/lib",
      "$lib/*": "./src/lib/*",
      layercake: "./src/lib/index.js",
      "layercake/*": "./src/lib/*",
    },
  },
};

export default config;
