// each OutputItem represents one output item information
// which will be used to render a react component at output class
// which can be a string (into a react label)
// or a tuple of data and layout (into a figure of plotlyjs)
// and type is a string of "print" or "draw" or "tex" or "formulaTex"
class OutputItem {
  outputType?: string;
  text?: string;
  data?: any[];
  layout?: {};

  // use arrow function will make web worker error
  // isPrint = () => this.outputType === 'print';
  // isDraw = () => this.outputType === 'draw';
  // isTex = () => this.outputType === 'tex';
  // isFormulaTex = () => this.outputType === 'formulaTex';
  // isMarkdown = () => this.outputType === 'markdown';

  isPrint() {
    return this.outputType === 'print';
  }
  isDraw() {
    return this.outputType === 'draw';
  }
  isTex() {
    return this.outputType === 'tex';
  }
  isFormulaTex() {
    return this.outputType === 'formulaTex';
  }
  isMarkdown() {
    return this.outputType === 'markdown';
  }
}

export default OutputItem;
