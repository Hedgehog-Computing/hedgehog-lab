import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import path from "path";
// import RollupBabel from "@rollup/plugin-babel";
import alias from "@rollup/plugin-alias";
import { visualizer } from "rollup-plugin-visualizer";

export default [
  {
    input: "./src/index.ts",
    // external: ["babel-template"],
    plugins: [
      alias({
        entries: [
          {
            find: "util",
            replacement: path.join(__dirname, "../../node_modules/util/"),
          },
        ],
      }),
      resolve({
        customResolveOptions: {
          moduleDirectory: "node_modules",
        },
        rootDir: path.join(__dirname, "../../"),
        browser: true,
      }),
      resolve(),
      commonjs(),
      // RollupBabel(),
      typescript(),
      json(),
      visualizer(),
    ],
    output: {
      file: "dist/index.mjs",
      format: "esm",
      name: "HedgehogCoreJs",
      // plugins: [terser()],
    },
  },
];
