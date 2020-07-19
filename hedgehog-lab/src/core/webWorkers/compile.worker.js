import * as Comlink from 'comlink'
import transpile from '../transpiler/transpiler-core'

const complier = {
  compile: (e) => {
    try {
      const workerResult = transpile(e)
      return workerResult
    } catch (e) {
      throw new Error(e.toString())
    }
  },
}

Comlink.expose(complier)
