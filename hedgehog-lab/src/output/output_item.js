
// each OutputItem represents one output item information 
// which will be used to render a react component at output class
// which can be a string (into a react label)
// or a tuple of data and layout (into a figure of plotlyjs)
// and type is a string of "print" or "draw" 
class OutputItem{
    outputType:string;
    text:String;
    data:[];
    layout:{};
    isPrint() {return this.outputType === "print";}
    isDraw() {return this.outputType==="draw"}
}

export default OutputItem;