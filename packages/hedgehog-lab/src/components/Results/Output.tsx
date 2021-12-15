import React from 'react';

import Plot from 'react-plotly.js';
import MathJax from 'react-mathjax';
import Markdown from 'react-markdown';
import TableComponent from './OutputItemCompoments/TableComponent';
import {isDrawingItem, isFormulaItem, isMarkdownItem, isTableItem, isTeXItem, OutputItem} from '@hedgehog/core';
import type {CodeComponent} from 'react-markdown/src/ast-to-react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeProps = Parameters<CodeComponent>[0]

const syntaxComponents = {
    code({node, inline, className, children, ...props}: CodeProps) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
            <SyntaxHighlighter style={dracula} language={match[1]} PreTag="div" {...props as any} >
                {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
        ) : (
            <code className={className} {...props}>
                {children}
            </code>
        )
    }
}

const Output = ({outputItemList}: { outputItemList: OutputItem[] }): React.ReactElement => {
    const items = outputItemList.map((item) => {
        if (isDrawingItem(item)) {
            return <Plot data={item.data} layout={item.layout}/>;
        } else if (isTeXItem(item)) {
            return (
                <MathJax.Provider>
                    <div>
                        <MathJax.Node inline formula={item.text}/>
                    </div>
                </MathJax.Provider>
            );
        } else if (isFormulaItem(item)) {
            return (
                <MathJax.Provider>
                    <div>
                        <MathJax.Node formula={item.text}/>
                    </div>
                </MathJax.Provider>
            );
        } else if (isMarkdownItem(item)) {
            return <Markdown components={syntaxComponents}>{item.text}</Markdown>;
        } else if (isTableItem(item)) {
            return <TableComponent tableItem={item}/>;
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
