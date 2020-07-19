import CompiledWorker from './core/webWorkers/compile.worker.js'
import ResultWorker from './core/webWorkers/result.worker.js'
import * as Comlink from 'comlink'

export const compile = Comlink.wrap<{
  compile: (data: string) => Promise<string>
}>(new CompiledWorker()).compile


export const output = Comlink.wrap<{
  output: (data: string) => Promise<any[]>
}>(new ResultWorker()).output