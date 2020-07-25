import CompilerWorker from './compiler.worker.ts';
import OutputWorker from './output.worker.ts';
import { OutputItem, isTextItem } from '@hedgehog/core';
import * as Comlink from 'comlink';
import AbortError from "./type/AbortError";

let compilerWorker = new CompilerWorker()

let outputWorker = new OutputWorker()

let compile = Comlink.wrap<{
  compile: (data: string) => Promise<string>
}>(compilerWorker).compile

let output = Comlink.wrap<{
  output: (data: string) => Promise<any[]>
}>(outputWorker).output

let compileCancel: { (): void; (reason?: any): void } | null

let outputCancel: { (): void; (reason?: any): void } | null

export const compiler = async (input: string) => {
  const code: string = await new Promise(async (resolve, reject) => {
    compileCancel = reject
    resolve(await compile(input))
  })
  compileCancel = null
  const result: any[] = await new Promise(async (resolve, reject) => {
    outputCancel = reject
    resolve(await output(code))
  })
  outputCancel = null

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
}

export const releaseWorker = () => {
  compile[Comlink.releaseProxy]();
  output[Comlink.releaseProxy]();
};

export const restartWorker = () => {
  if (compileCancel) {
    compileCancel(new AbortError('web worker terminate'))
  }

  if (outputCancel) {
    outputCancel(new AbortError('web worker terminate'))
  }

  compilerWorker.terminate()
  outputWorker.terminate()

  compilerWorker = new CompilerWorker()
  outputWorker = new OutputWorker()

  compile = Comlink.wrap<{
    compile: (data: string) => Promise<string>
  }>(compilerWorker).compile

  output = Comlink.wrap<{
    output: (data: string) => Promise<any[]>
  }>(outputWorker).output
}
