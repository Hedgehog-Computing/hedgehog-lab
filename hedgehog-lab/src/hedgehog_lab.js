import  React, {Component}  from 'react';
import {
  Form,
  TextArea,
  Label,
} from 'semantic-ui-react'

import transpiler_core from './transpiler_core';

import execute from './hedgehog_runtime';

import Editor from 'react-simple-code-editor';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';



//the default string for user's input
const default_string =
`//demo 1: create matrix and operator overload

var A = new Mat([[1,2], [3,4]]);
var B = new Mat([[1,2], [3,4]]);

// C = A + B*A + A'*4.2 + random(2,2)
var C = A + B*A + A.T() * 4.2 + new Mat().random(2,2);
print("Matrix C is \\n" + C);

// demo 2: matrix inverse
var d = new Mat([[1,2],[2,1]])
print("Inverse of matrix d is \\n")
print(d^(-1))

//demo 3: GPU acceleration of matrix multiply
var x = new Mat().random(1000,1000);

// do a 1000*1000 matrix multiplication without GPU acceleration
const t0 = performance.now();
var z1 = x*x;
const t1 = performance.now();
print(\`It takes $\{t1 - t0\} milliseconds for matrix multiplication without GPU.\`);

//set mode as 'gpu', which will enable GPU acceleration
const t2 = performance.now();
x.mode = 'gpu'
var z2 = x*x;
const t3 = performance.now();

print(\`It takes $\{t3 - t2\} milliseconds for matrix multiplication with GPU.\`);
`;




function transpile(your_code:string):string{
    var output_vanilla_js_string = transpiler_core(your_code);
    console.log(output_vanilla_js_string)
    return output_vanilla_js_string;
}


class HedgehogLab extends Component {

  constructor(props){
      super(props);
      this.state = {
          user_input_code:default_string,
          compiled_code:'',
          execution_result:''
        };
      this.handleCompileAndRun = this.handleCompileAndRun.bind(this);
      this.handleUserInputCodeChange = this.handleUserInputCodeChange.bind(this);
  }

  handleCompileAndRun(event){

      console.log("start compiling");
      var compiled_result = transpile(this.state.user_input_code);
      this.setState({compiled_code: compiled_result});
     var result = execute(compiled_result);
      this.setState({execution_result: result});
      event.preventDefault();
  }

  handleUserInputCodeChange(event)
  {
      this.setState({user_input_code: event.target.value});
  }

  //handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (

      <Form>

        <Form.Button onClick={this.handleCompileAndRun}>Compile and run</Form.Button>
        <Label>Your code:</Label>

        <Editor
          value={this.state.user_input_code}
          aria-label="code editor"
          onValueChange={code => this.setState({ user_input_code:code })}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
            fontSize: 12,
          }}
        />




        <Label>Execution Result:</Label>

        <TextareaAutosize
          value =   {this.state.execution_result}
        />


      </Form>
    )
  }
}


export default HedgehogLab;
