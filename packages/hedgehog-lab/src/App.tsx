import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import init, { greet, fib as wasmFib } from "hedgehog-core-wasm";
import { fib as jsFib } from "hedgehog-core-js";
import type { TestWorker } from "./hello.worker";
import HelloWorker from "./hello.worker?worker";
import { wrap, Remote } from "comlink";

const worker = wrap<TestWorker>(new HelloWorker());

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    import.meta.env.MODE === "development" && init(); // hack vite-plugin-rsw hmr bug
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello WebAssembly!</p>
        <p>Vite + Rust + React</p>
        <p>
          <button onClick={() => greet()}>hello wasm</button>{" "}
          <button
            onClick={async () => {
              let time = Date.now();
              const res = jsFib(40);
              alert(`result: ${res}, time: ${Date.now() - time}`);
            }}
          >
            test js fib
          </button>{" "}
          <button
            onClick={async () => {
              let time = Date.now();
              const res = wasmFib(40);
              alert(`result: ${res}, time: ${Date.now() - time}`);
            }}
          >
            test wasm fib
          </button>{" "}
          <button
            onClick={async () => {
              let time = Date.now();
              const res = await worker.jsFib(40);
              alert(`result: ${res}, time: ${Date.now() - time}`);
            }}
          >
            test worker js fib
          </button>{" "}
          <button
            onClick={async () => {
              let time = Date.now();
              const res = await worker.wasmFib(40);
              alert(`result: ${res}, time: ${Date.now() - time}`);
            }}
          >
            test worker wasm fib
          </button>{" "}
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://github.com/lencx/vite-plugin-rsw"
            target="_blank"
            rel="noopener noreferrer"
          >
            Rsw Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
