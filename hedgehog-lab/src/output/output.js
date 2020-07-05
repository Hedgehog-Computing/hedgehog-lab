import Plot from 'react-plotly.js';

import  React, {Component, Label}  from 'react';

import OutputItem from './output_item';

class Output extends React.Component {

    render() {
      const list_items = this.props.outputItemList.map(
           (element) =>{
               if (element.isDraw()){
                  return <Plot data={element.data} layout={element.layout}/>;
              }
          }
      );
      return (
        <div>
          {list_items} 
        </div>
      );
    }
  }

  export default Output;