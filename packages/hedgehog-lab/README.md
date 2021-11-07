# wasm-react

- [WebAssembly Series](https://github.com/lencx/z/discussions/22)
- [learn-wasm](https://github.com/lencx/learn-wasm)
- [vite-plugin-rsw](https://github.com/lencx/vite-plugin-rsw) - 🦀 wasm-pack plugin for Vite
- [rsw-node](https://github.com/lencx/rsw-node) - ⚪️ `wasm-pack build` executed in remote deployment

## Quick Start

### Step1

```bash
npm install
```

### Step2

edit `vite.config.ts`

```js
// ...
ViteRsw({
  crates: [
    // https://github.com/lencx/vite-plugin-rsw#plugin-options
    'wasm-test', // custom package name
  ]
}),
```

### Step3

```bash
npm run dev
```

## Remote Deployment

```bash
npm run rsw:build
```
