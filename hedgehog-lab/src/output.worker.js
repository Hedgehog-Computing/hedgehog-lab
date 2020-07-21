import * as Comlink from 'comlink'
import { executeOutput } from './core'

const outputWorker = {
  output: async (e) => executeOutput(e)
}

Comlink.expose(outputWorker)

