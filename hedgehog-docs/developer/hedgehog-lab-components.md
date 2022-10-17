# hedgehog Lab Components

We are developing a set of components for the hedgehog Lab. These components are designed to be used in the hedgehog Lab and can be used in other projects as well.

## Installation

```bash
yarn install @hedgehogcomputing/lab
# or
npm install @hedgehogcomputing/lab
```

## Usage

```jsx
import HedgehogLab from "@hedgehogcomputing/lab/src/HedgehogLab";

const Draft = () => {
    const yourSource = "any string"
    return (
        <>
            <HedgehogLab source={yourSource} defaultFullScreen={false} defaultLiveMode={true}/>
            <HedgehogLab userSnippet={"@username/snippet"} defaultFullScreen={false} defaultLiveMode={true}/>
        </>
    )
}
```

## API
`<HedgehogLab />` accepts the following props:

-- alternative
* source: `string` - the source code to be displayed in the editor
* userSnippet : `string`- the user snippet to be displayed in the editor, example: "@username/snippet"

-- common
* defaultFullScreen: `boolean` - whether the editor should be displayed in full screen mode by default
* defaultLiveMode: `boolean` - whether the compiler should be auto-reload in live mode by default