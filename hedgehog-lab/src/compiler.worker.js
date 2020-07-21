import * as Comlink from 'comlink'
import { transpile } from './core'

const compilerWorker = {
  compile: (e) => transpile(e)
}

Comlink.expose(compilerWorker)
