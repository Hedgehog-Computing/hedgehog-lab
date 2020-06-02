import  React, {Component}  from 'react';
import {
  Form,
  TextArea,
} from 'semantic-ui-react'

import transpiler_core from './transpiler_core';

import execute from './hedgehog_runtime';

//the default string for user's input
const default_string = 
`var A = new Mat([[1,2], [3,4]]);
var B = new Mat([[1,2], [3,4]]);
var C = A + B*A + A.T() * 4.2 + new Mat().random(2,2);
print("Matrix C is \\n" + C);

var d = new Mat([[1],[2]]);
var e = new Mat([[1,2]]);
print("Matrix d * e is " + "\\n" + d*e);

if (e*d == 5){
  print( "d*e is 5");
}
else
{
  print("d*e is not 5");
}
`;




//todo: preprocess the code
function preprocess(your_code:string): string{
    return your_code;
}


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
    const { value } = this.state
    return (
      <Form>
        <Form.Field
          control={TextArea}
          label='Input your code here'
          placeholder='...'
          value = {this.state.user_input_code}
          onChange = {this.handleUserInputCodeChange}
        />
        <Form.Field
          control={TextArea}
          label='Compiled code'
          placeholder='...'
          value = {this.state.compiled_code}
        />
        <Form.Field
          control={TextArea}
          label='Execution results'
          placeholder='...'
          value = {this.state.execution_result}
        />
        <Form.Button onClick={this.handleCompileAndRun}>Compile and run</Form.Button>
      </Form>
    )
  }
}


export default HedgehogLab;