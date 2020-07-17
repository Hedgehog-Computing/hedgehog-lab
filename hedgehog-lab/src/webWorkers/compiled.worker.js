import transpiler_core from "../transpiler_core"

const transpile = (your_code) => transpiler_core(your_code)

self.addEventListener('message', (e) => {
  try {
    const workerResult = transpile(e.data);
    self.postMessage({ status: 'success', result: workerResult });
  } catch (compileError) {
    self.postMessage({ status: 'error', errorMsg: compileError.toString() });
  }
})

