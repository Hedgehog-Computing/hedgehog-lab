import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import ViteRsw from "vite-plugin-rsw";
import hedgehogCorePlugin from "./plugins/hedgehog-core-plugin";
import path from "path";
console.log(process.env.NODE_ENV === "production");
export default defineConfig({
  plugins: [
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
    alias: {
      "@hedgehog-core-js": path.join(__dirname, "../hedgehog-core-js/"),
      "@hedgehog-core-wasm":
        process.env.NODE_ENV === "production"
          ? path.join(__dirname, "../hedgehog-core-wasm/pkg/")
          : path.join(__dirname, "./src/@hedgehog-core-wasm/"),
      // "hedgehog-core-wasm": path.join(__dirname, "../hedgehog-core-wasm/pkg/"),
    },
  },
});
