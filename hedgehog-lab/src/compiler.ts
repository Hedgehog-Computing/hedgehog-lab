import CompilerWorker from './compiler.worker.js'
import OutputWorker from './output.worker.js'
import { OutputItem } from './core'
import type { OutputItemType } from './core'
import * as Comlink from 'comlink'

const compile = Comlink.wrap<{
  compile: (data: string) => Promise<string>
}>(new CompilerWorker()).compile

const output = Comlink.wrap<{
  output: (data: string) => Promise<any[]>
}>(new OutputWorker()).output

export const compiler = async (input: string) => {
  const code = await compile(input)
  const result = await output(code)
  const outPutItemPrototype = Object.create(new OutputItem())
  const outputItem = result.map((item: { __proto__: any }) => {
    item.__proto__ = outPutItemPrototype
    return item
  }) as any
  let outputString = ''
  outputItem.forEach((element: OutputItemType) => {
    if (element.isPrint()) {
      // todo 这里text对象的toString被覆写了，我找不到覆写方法的位置，导致text.value为array时最终输出为[object object] there text object's toString function be overwritten, please fix the bug
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
