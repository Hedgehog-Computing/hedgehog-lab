import CompilerWorker from "./compiler.worker.ts"
import OutputWorker from "./output.worker.ts"
import {isTextItem, OutputItem} from "@hedgehog/core"
import * as Comlink from "comlink"

export interface OutputResult {
    outputItem: OutputItem[]
    outputString: string
}

type CancelablePromise<T> = Promise<T> & {
    cancel: () => any
}

class WorkerProvider {
    private compilerWorker: CompilerWorker
    private outputWorker: OutputWorker
    private compilerProxy: Comlink.Remote<{
        compile: (data: string) => Promise<string>
    }>
    private outputProxy: Comlink.Remote<{
        output: (data: string) => Promise<any[]>
    }>

    constructor() {
        this.compilerWorker = new CompilerWorker()
        this.compilerProxy = Comlink.wrap(this.compilerWorker)
        this.outputWorker = new OutputWorker()
        this.outputProxy = Comlink.wrap(this.outputWorker)
    }

    get() {
        return { compile: this.compilerProxy.compile, output: this.outputProxy.output }
    }

    terminate() {
        this.compilerWorker.terminate()
        this.outputWorker.terminate()

        // unlisten worker
        this.compilerProxy[Comlink.releaseProxy]()
        this.outputProxy[Comlink.releaseProxy]()
    }
}

let provider = new WorkerProvider()

export const compiler = (...param: readonly [string, string]): any => {
    const terminate = () => {
        provider.terminate()
        provider = new WorkerProvider()
    }

    const run = async () => {
        const { compile, output } = provider.get()
        const code = await compile(param[1])
        const result = await output(code)
        let outputString = ""
        const outputItem = result
        outputItem.forEach((element: OutputItem) => {
            if (isTextItem(element)) {
                outputString += element.text + "\n"
            }
        })
        return {
            outputString,
            outputItem,
        }
    }

    const result = run()
        // provide the cancel function for react-query
    ;(result as CancelablePromise<OutputResult>).cancel = terminate
    return result
}
