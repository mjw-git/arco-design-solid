import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
// import dts from "vite-plugin-dts";
export default defineConfig({
  build: {
    outDir: "es",
    rollupOptions: {
      external: ["solid-js/web", "solid-js"],
      input: ["index.ts"],
      output: [
        {
          format: "es",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "./es",
        },
        {
          format: "cjs",
          entryFileNames: "[name].js",
          preserveModules: true,
          exports: "named",
          dir: "./lib",
        },
        // {
        //   format: "umd",
        //   entryFileNames: "soldier.min.js",
        //   name: "soldier",
        //   dir: "./dist",
        // },
      ],
    },
    lib: {
      entry: "./index.ts",
    },
  },
  plugins: [solid()],
});
