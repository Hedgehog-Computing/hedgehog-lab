import * as Comlink from "comlink";
import { transpile } from "hedgehog-core-js";

const compilerWorker = {
  compile: (e: any) => transpile(e),
};

Comlink.expose(compilerWorker);

export default null as any;
