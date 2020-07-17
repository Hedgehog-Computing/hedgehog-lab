// each OutputItem represents one output item information
// which will be used to render a react component at output class
// which can be a string (into a react label)
// or a tuple of data and layout (into a figure of plotlyjs)
// and type is a string of "print" or "draw" or "tex" or "formulaTex"
class OutputItem {
  outputType: string;
  text: string;
  data: [];
  layout: {};

  isPrint = () => this.outputType === 'print';
  isDraw = () => this.outputType === 'draw';
  isTex = () => this.outputType === 'tex';
  isFormulaTex = () => this.outputType === 'formulaTex';
  isMarkdown = () => this.outputType === 'markdown';
}

export default OutputItem;
