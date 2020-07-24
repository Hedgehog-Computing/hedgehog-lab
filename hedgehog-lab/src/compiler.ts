import CompilerWorker from './compiler.worker.js'
import OutputWorker from './output.worker.js'
import { OutputItem } from './core'
import type { OutputItemType } from './core'
import * as Comlink from 'comlink'
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
    const compileString = await compile(input)
    resolve(compileString)
  })
  compileCancel = null
  const result: any[] = await new Promise(async (resolve, reject) => {
    outputCancel = reject
    const outputList =await output(code)
    resolve(outputList)
  })
  outputCancel = null
  const outPutItemPrototype = Object.create(new OutputItem())
  const outputItem = result.map((item: { __proto__: any }) => {
    item.__proto__ = outPutItemPrototype
    return item
  }) as any
  let outputString = ''
  outputItem.forEach((element: OutputItemType) => {
    if (element.isPrint()) {
       outputString += element.text + '\n'
    }
  })
  return {
    outputString,
    outputItem,
  }
}

export const releaseWorker = () => {
  compile[Comlink.releaseProxy]()
  output[Comlink.releaseProxy]()
}

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
