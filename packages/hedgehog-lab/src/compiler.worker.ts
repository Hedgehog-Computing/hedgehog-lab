import * as Comlink from 'comlink';
import { transpile } from '@hedgehogcomputing/core';

const compilerWorker = {
  compile: (e: any) => transpile(e)
};

Comlink.expose(compilerWorker);

export default null as any;
