import CompilerWorker from "./compiler.worker?worker";
import OutputWorker from "./output.worker?worker";
import {isTextItem, OutputItem} from "hedgehog-core-js";
import * as Comlink from "comlink";

console.log(
    import("hedgehog-core-js").then((e) => {
        console.log(e.isDrawingItem);
    })
);

export interface OutputResult {
    outputItem: OutputItem[];
    outputString: string;
}

type CancelablePromise<T> = Promise<T> & {
    cancel: () => any;
};

export const compiler = (...param: readonly [string, string]) => {
    const compilerWorker = new CompilerWorker()
    const outputWorker = new OutputWorker()

    const compile = Comlink.wrap<{
        compile: (data: string) => Promise<string>
    }>(compilerWorker).compile

    const output = Comlink.wrap<{
        output: (data: string) => Promise<any[]>
    }>(outputWorker).output

    const cleanup = () => {
        compilerWorker.terminate()
        outputWorker.terminate()

        // unlisten worker
        compile[Comlink.releaseProxy]()
        output[Comlink.releaseProxy]()
    }

    const run = async () => {
        const code = await compile(param[1])
        const result = await output(code)
        let outputString = ""
        const outputItem = result
        outputItem.forEach((element: OutputItem) => {
            if (isTextItem(element)) {
                outputString += element.text + "\n"
            }
        })
        cleanup()
        return {
            outputString,
            outputItem,
        }
    }

    const result = run()
        // provide the cancel function for react-query
    ;(result as CancelablePromise<OutputResult>).cancel = cleanup
    return result
}
