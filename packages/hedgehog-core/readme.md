# Hedgehog Core  package

This package provides a simple way to run Hedgehog compiler in your application.

> We recommend to use hedgehog-canvas, the canvas package provides a one component to render the core result.
> 
## Installation

```bash
yarn install @hedgehogcomputing/core
# or
npm install @hedgehogcomputing/core
```

## Full example

```tsx
import React from 'react';
import ReactECharts from 'echarts-for-react';
import Plot from 'react-plotly.js';
import MathJax from 'react-mathjax';
import Markdown from 'react-markdown';
import {
    isDrawingItem,
    isEChartItem,
    isFormulaItem,
    isMarkdownItem,
    isTableItem,
    isTeXItem,
    isTextItem,
    OutputItem
} from '@hedgehogcomputing/core';
import type {CodeComponent} from 'react-markdown/src/ast-to-react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import TableComponent from "@hedgehogcomputing/website/src/components/Results/OutputItemCompoments/TableComponent";

type CodeProps = Parameters<CodeComponent>[0]

const Output = ({outputItemList}: { outputItemList: OutputItem[] }): React.ReactElement => {

    const items = outputItemList.map((item) => {
        if (isDrawingItem(item)) {
            const actualLayout = item.layout === undefined ? {} : item.layout;
            //@ts-ignore
            return <Plot
                data={JSON.parse(JSON.stringify(item.data))}
                layout={JSON.parse(JSON.stringify(actualLayout))}
            />
        } else if (isTeXItem(item)) {
            return (
                //@ts-ignore
                <MathJax.Provider>
                    <div>
                        <MathJax.Node inline formula={item.text}/>
                    </div>
                </MathJax.Provider>
            );
        } else if (isFormulaItem(item)) {
            return (
                //@ts-ignore
                <MathJax.Provider>
                    <div>
                        <MathJax.Node formula={item.text}/>
                    </div>
                </MathJax.Provider>
            );
        } else if (isMarkdownItem(item)) {
            return <Markdown components={{
                code({node, inline, className, children, ...props}: CodeProps): React.ReactElement {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                        //@ts-ignore
                        <SyntaxHighlighter
                            language={match[1]}
                            customStyle={{backgroundColor: 'transparent'}}
                            PreTag="div" {...props as any} >
                            {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                    ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                    )
                }
            }}>{item.text}</Markdown>;
        } else if (isTableItem(item)) {
            return <TableComponent tableItem={item}/>;
        } else if (isEChartItem(item)) {
            //@ts-ignore
            return <ReactECharts option={item.option}/>
        } else if (isTextItem(item)) {
            return <div>{item.text}</div>;
        } else {
            return <React.Fragment/>;
        }
    });

    return (
        <>
            {items.map((item, index) => (
                <React.Fragment key={index}>{item}</React.Fragment>
            ))}
        </>
    );
};

export default Output;
```