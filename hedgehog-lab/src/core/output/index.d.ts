interface OutputItem {
  outputType: string;
  text: string;
  data: [];
  layout: {};
  isPrint: () => boolean;
  isDraw: () => boolean;
  isTex: () => boolean;
  isFormulaTex: () => boolean;
  isMarkdown: () => boolean;
}

export default OutputItem
