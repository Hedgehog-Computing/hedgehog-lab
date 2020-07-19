import { executeOutput } from "../runtime";

self.addEventListener('message', (e) => {
  try {
    const workerResult = executeOutput(e.data)
    self.postMessage({ status: 'success', result: workerResult });
  } catch (executionError) {
    self.postMessage({ status: 'error', errorMsg: executionError.toString() });
  }
})
