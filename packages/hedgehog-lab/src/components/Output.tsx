import React from "react";

// import Plot from "react-plotly.js";
import MathJax from "react-mathjax";
import Markdown from "react-markdown";
import TableComponent from "./OutputItemCompoments/TableComponent";
import {
  OutputItem,
  isDrawingItem,
  isTeXItem,
  isFormulaItem,
  isMarkdownItem,
  isTableItem,
} from "hedgehog-core-js";

const Output = ({ outputItemList }: { outputItemList: OutputItem[] }) => {
  const items = outputItemList.map((item) => {
    if (isDrawingItem(item)) {
      // return <Plot data={item.data} layout={item.layout} />;
      return <>Plot</>;
    } else if (isTeXItem(item)) {
      return (
        <MathJax.Provider>
          <div>
            <MathJax.Node inline formula={item.text} />
          </div>
        </MathJax.Provider>
      );
    } else if (isFormulaItem(item)) {
      return (
        <MathJax.Provider>
          <div>
            <MathJax.Node formula={item.text} />
          </div>
        </MathJax.Provider>
      );
    } else if (isMarkdownItem(item)) {
      return <Markdown source={item.text} />;
    } else if (isTableItem(item)) {
      return <TableComponent tableItem={item} />;
    } else {
      return <React.Fragment />;
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
