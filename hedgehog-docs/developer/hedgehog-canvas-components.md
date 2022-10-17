# hedgehog Canvas  Components

This package can be used to render the output of the hedgehog compiler result easily.

## Installation

```bash
yarn install @hedgehogcomputing/canvas
# or
npm install @hedgehogcomputing/canvas
```

## Usage

> `outputItem` is the output of the hedgehog compiler(hedgehog-core)

```jsx
import Output from "@hedgehogcomputing/canvas/src/Output";

const Results = () => {
    return (
        <>
            <Output outputItemList={outputItem}/>
        </>
    )
}
```