import React from 'react';

import Plot from 'react-plotly.js';
import MathJax from 'react-mathjax';
import Markdown from 'react-markdown';

const Output = ({ outputItemList }) => {
  const items = outputItemList.map((item) => {
    if (item.isDraw()) {
      return <Plot data={item.data} layout={item.layout} />;
    } else if (item.isTex()) {
      return (
        <MathJax.Provider>
          <div>
            <MathJax.Node inline formula={item.text} />
          </div>
        </MathJax.Provider>
      );
    } else if (item.isFormulaTex()) {
      return (
        <MathJax.Provider>
          <div>
            <MathJax.Node formula={item.text} />
          </div>
        </MathJax.Provider>
      );
    } else if (item.isMarkdown()) {
      return <Markdown source={item.text} />;
    } else {
      return <React.Fragment />;
    }
  });

  return items.map((item, index) => (
    <React.Fragment key={index}>{item}</React.Fragment>
  ));
};

export default Output;
