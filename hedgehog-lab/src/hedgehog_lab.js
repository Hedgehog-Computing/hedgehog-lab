import React, { Component } from 'react'
import {
  Form,
  TextArea,
  Label
} from 'semantic-ui-react'

import transpiler_core from './transpiler_core'

import { executeOutput } from './hedgehog_runtime'

import Editor from 'react-simple-code-editor'

import TextareaAutosize from '@material-ui/core/TextareaAutosize'

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import './utilities/demo_code'
import demoCode from './utilities/demo_code'

import _Mat from './lib/matrix'

import Output from './output/output'

//the default string for user's input
const default_string =
  `//write your code here
print("hello world")
`

class Mat extends _Mat.Mat {}

// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[]| number): Mat {return new Mat(input);}





function transpile(your_code:string):string{
    var output_vanilla_js_string = transpiler_core(your_code);
    return output_vanilla_js_string;
}

const tutorials = [
  { name: 'Tutorial 1: Matrix', id: 'demo_1_Matrix' },
  { name: 'Tutorial 2: Operators', id: 'demo_2_Operators' },
  { name: 'Tutorial 3: GPU Acceleration', id: 'demo_3_GPU_Acceleration' },
  { name: 'Tutorial 4: Built-in functions', id: 'demo_4_build_in_functions' }
]

class HedgehogLab extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user_input_code: default_string,
      compiled_code: '',
      execution_output_string: '',
      execution_output_list: []
    }
    this.handleCompileAndRun = this.handleCompileAndRun.bind(this)
    this.handleUserInputCodeChange = this.handleUserInputCodeChange.bind(this)
  }

  handleCompileAndRun = (event) => {

    console.log('start compiling')

    //compile
    const compiled_result = transpile(this.state.user_input_code)
    console.log('The compiled code to be executed:\n' + compiled_result)
    this.setState({ compiled_code: compiled_result })
    //var result = execute(compiled_result);
    //this.setState({execution_result: result});

    //run and get the result
    const output_list = executeOutput(compiled_result)
    this.setState({ execution_output_list: output_list })

    //get all OutputItem with type === "print" and save to "execution_result"
    //to update the textbox
    let output_string = ''
    output_list.map(
      (element) => {
        if (element.isPrint()) {
          console.log(element)
          output_string += element.text + '\n'
        }
      })

    this.setState({ execution_output_string: output_string })
    event.preventDefault()
  }

  handleUserInputCodeChange = (event) => {
    this.setState({ user_input_code: event.target.value })
  }

  handleLoadingTutorialCode = (tutorialID) => {
    this.setState({
      user_input_code: demoCode[tutorialID]
    })
  }

  //handleChange = (e, { value }) => this.setState({ value })

  render () {
    return (

      <div>
        <Form>

          <Form.Button size="lg" onClick={this.handleCompileAndRun}>Compile and
            run</Form.Button>
          <Label>Your code:</Label>

          <Editor
            value={this.state.user_input_code}
            aria-label="code editor"
            onValueChange={code => this.setState({ user_input_code: code })}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12
            }}
          />

          <Label>Results:</Label>

          <TextareaAutosize
            value={this.state.execution_output_string}
          />
        </Form>

        <div>
          <Output outputItemList={this.state.execution_output_list}/>
        </div>

        <Form>
          <br/>
          <br/>
          <Label>Hedgehog Lab Tutorials:</Label>
          {tutorials.map(({ name, id }) => (
            <Form.Button onClick={() => this.handleLoadingTutorialCode(id)}>
              {name}
            </Form.Button>
          ))}
        </Form>
      </div>
    )
  }
}

export default HedgehogLab

