import { expose } from "comlink";
import init, { greet as _greet, fib as _fib } from "@hedgehog-core-wasm";
import { fib } from "hedgehog-core-js";

export class TestWorker {
  greet: typeof _greet | null;
  fib: typeof _fib | null;

  constructor() {
    this.init();
    this.greet = null;
    this.fib = null;
  }

  async init() {
    await init();
    this.greet = _greet;
    this.fib = _fib; //
  }

  wasmFib(i: number) {
    return this.fib && this.fib(i);
  }

  jsFib(i: number) {
    return fib(i);
  }
}

expose(new TestWorker());
