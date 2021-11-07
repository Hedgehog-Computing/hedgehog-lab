import resolve from "@rollup/plugin-node-resolve";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import ViteRsw from "vite-plugin-rsw";
import hedgehogCorePlugin from "./plugins/hedgehog-core-plugin";
import commonjs from "@rollup/plugin-commonjs";
import path from "path";

export default defineConfig({
  plugins: [
    resolve(),
    commonjs(),
    reactRefresh(),
    ViteRsw({
      root: "../",
      crates: [
        {
          name: "hedgehog-core-wasm",
        },
      ],
      unwatch: ["**/@hedgehog-core-wasm/**"],
    }),
    hedgehogCorePlugin(),
  ],
  resolve: {
    alias: [
      {
        find: "@hedgehog-core-wasm",
        replacement:
          process.env.NODE_ENV === "production"
            ? path.join(__dirname, "../hedgehog-core-wasm/pkg/")
            : path.join(__dirname, "./src/@hedgehog-core-wasm/"),
      },
    ],
  },
  define: {
    "process.env": {},
  },
});
