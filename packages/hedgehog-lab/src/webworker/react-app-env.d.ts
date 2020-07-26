/// <reference types="react-scripts" />

declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
