import { Plugin } from "vite";
import fs from "fs";
import path from "path";

export default (): Plugin => {
  const core_wasm_path = path.join(
    __dirname,
    "../../hedgehog-core-wasm/pkg/hedgehog-core-wasm.js"
  );
  const core_wasm_dir = path.join(__dirname, "../../hedgehog-core-wasm/pkg/");
  const map_dir = path.join(__dirname, "../src/@hedgehog-core-wasm");
  const createMapDir = () => {
    fs.access(map_dir, (err) => {
      if (err) {
        fs.mkdirSync(map_dir);
      }
      const paths = fs.readdirSync(core_wasm_dir);
      paths.forEach((p) => {
        fs.writeFileSync(
          path.join(map_dir, p),
          fs.readFileSync(path.join(core_wasm_dir, p))
        );
      });
    });
  };
  return {
    name: "hedgehog-core-plugin",
    configureServer() {
      console.log("hedgehog-core-plugin run in configureServer");
      createMapDir();
    },
    handleHotUpdate({ modules }) {
      console.log(modules);
      if (modules.some((module) => module.id === core_wasm_path)) {
        console.log("hedgehog-core-plugin run in handleHotUpdate");
        createMapDir();
      }
    },
  };
};
