import transpilerCore from '../transpiler/transpiler-core';

const transpile = (your_code) => transpilerCore(your_code)

self.addEventListener('message', (e) => {
  try {
    const workerResult = transpile(e.data);
    self.postMessage({ status: 'success', result: workerResult });
  } catch (compileError) {
    self.postMessage({ status: 'error', errorMsg: compileError.toString() });
  }
})

