import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import dts from "vite-plugin-dts";
import { UserConfigExport } from "vite";
import wasm from "vite-plugin-wasm";
// import topLevelAwait from 'vite-plugin-top-level-await'
// import { codecoveVitePlugin } from '@codecov/vite-plugin'
// import { renameSync } from 'fs'
import path from "path";

const viteConfig = async (): Promise<UserConfigExport> => {
  return defineConfig({
    plugins: [
      react(),
      dts({
        outDir: "dist",
        insertTypesEntry: true,
      }),
      wasm(),
      // topLevelAwait(),
      // codecoveVitePlugin({
      //     ...
      // })
      //,
    ],
    css: {
      modules: {
        exportGlobals: true,
      },
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react/jsx-runtime", "jszip", "adm-zip"],
      esbuildOptions: {
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        format: "esm",
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "index",
        fileName: (format) => `index.${format}.js`,
      },
      sourcemap: true,
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "jszip",
          "adm-zip",
        ],
        output: [
          {
            globals: {
              react: "React",
              "react/jsx-runtime": "react/jsx-runtime",
              "react-dom": "ReactDOM",
            },
            entryFileNames: `index.d.ts`,
            format: "module",
          },
          {
            entryFileNames: `index.es.js`,
            format: "es",
            preserveModules: false,
          },
          {
            entryFileNames: `index.cjs`,
            format: "cjs",
          },
        ],
        input: "src/index.ts",
        plugins: [
          {
            name: "replace",
            transform(code, id) {
              if (id.endsWith(".node")) {
                return code.replace(/\.node/g, ".wasm");
              }
            },
          },
        ],
      },
      outDir: "dist",
      cssCodeSplit: true,
      reportCompressedSize: true,
      emptyOutDir: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        reportsDirectory: "./coverage",
        reporter: ["text", "json", "html"],
        reportOnFailure: true,
      },
    },
  });
};

export default viteConfig;
