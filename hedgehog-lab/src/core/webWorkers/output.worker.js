import * as Comlink from 'comlink'
import { executeOutput } from '../runtime'

const outputWorker = {
  output: (e) => {
    try {
      const workerResult = executeOutput(e)
      return workerResult
    } catch (e) {
      throw new Error(e.toString())
    }
  },
}

Comlink.expose(outputWorker)

