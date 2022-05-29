import * as Comlink from 'comlink';
import { transpile } from '@hedgehog/core';

const compilerWorker = {
  compile: (e: any) => transpile(e),
};

export const CompilerWorker = Comlink.expose(compilerWorker);

export default null as any;
