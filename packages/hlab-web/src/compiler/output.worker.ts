import * as Comlink from 'comlink';
import { executeOutput } from '@hedgehog/core';

const outputWorker = {
  output: async (e: any) => executeOutput(e)
};

Comlink.expose(outputWorker);

export default null as any;
