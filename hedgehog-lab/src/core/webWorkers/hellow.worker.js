import * as Comlink from 'comlink'

const outputWork = {
  output: () => {
    throw new Error('wtf')
  },
}

Comlink.expose(outputWork)