
import template from "@babel/template";


import  React, {Component}  from 'react';
import {
  Button,
  Form,
  TextArea,
} from 'semantic-ui-react'

//the default string for user's input

var babel = require( "@babel/standalone" );
const default_string = 
`

var A = new Mat([[1,2], [3,4]]);
var B = new Mat([[1,2], [3,4]]);
var C = A + B*A + A.T() * 4.2 + new Mat().random(2,2);
print("Matrix C is \\n" + C);

`;


function invokedTemplate(op) {
    return template(`
        (function (LEFT_ARG, RIGHT_ARG) { 
          if (LEFT_ARG !== null && LEFT_ARG !== undefined
               && LEFT_ARG[Symbol.for("${op}")])
              return LEFT_ARG[Symbol.for("${op}")](RIGHT_ARG)
          else return LEFT_ARG ${op} RIGHT_ARG
        })
    `)
}

function babel_operator_overload ({ types: t }) {
    return {
      visitor: {
        BinaryExpression (path) {
          if (path.node.hasOwnProperty('_fromTemplate')) return
  
          const func = invokedTemplate(path.node.operator)({
            LEFT_ARG: path.scope.generateUidIdentifier("left"),
            RIGHT_ARG: path.scope.generateUidIdentifier("right"),
          }).expression
  
          path.replaceWith(
            t.callExpression(
              func,
              [path.node.left, path.node.right]
            )
          )
        }
      }
    }
}


function preprocess(your_code:string): string{
    return your_code;
}


function transpile(your_code:string):string{
    babel.registerPlugin(
        "overload", babel_operator_overload
    )

    babel.registerPreset(
        '@babel/preset-env', require('@babel/preset-env')
    )

    babel.registerPreset(
        '@babel/preset-typescript', require('@babel/preset-typescript')
    )
    var output_vanilla_js_string = babel.transform(
        preprocess(your_code),   // the code
        {
            plugins:['overload'],
            presets: ["@babel/preset-env", '@babel/preset-typescript'],
            filename: "temp.js",
            sourceType: "script"
        }
    )

    console.log(output_vanilla_js_string.code)
    return output_vanilla_js_string.code;
}


class HedgehogTranspiler extends Component {

  constructor(props){
      super(props);
      this.state = {
          user_input_code:'',
          compiled_code:'',
          execution_result:''
        };
      this.handleCompileAndRun = this.handleCompileAndRun.bind(this);
      this.handleUserInputCodeChange = this.handleUserInputCodeChange.bind(this);
  }

  handleCompileAndRun(event){
      console.log("start compiling");
      var result = transpile(this.state.user_input_code);
      this.setState({compiled_code: result.code});

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


export default HedgehogTranspiler;