import CompilerWorker from './compiler.worker.ts';
import OutputWorker from './output.worker.ts';
import { OutputItem, isTextItem } from '@hedgehog/core';
import * as Comlink from 'comlink';

const compile = Comlink.wrap<{
  compile: (data: string) => Promise<string>;
}>(new CompilerWorker()).compile;

const output = Comlink.wrap<{
  output: (data: string) => Promise<any[]>;
}>(new OutputWorker()).output;

export const compiler = async (input: string) => {
  const code = await compile(input);
  const result = await output(code);

  let outputString = '';
  let outputItem = result;
  outputItem.forEach((element: OutputItem) => {
    if (isTextItem(element)) {
      outputString += element.text + '\n';
    }
  });
  return {
    outputString,
    outputItem,
  };
};

export const releaseWorker = () => {
  compile[Comlink.releaseProxy]();
  output[Comlink.releaseProxy]();
};
