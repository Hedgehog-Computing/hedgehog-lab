import  React, {Component}  from 'react';
import {
  Form,
  TextArea,
  Label,
} from 'semantic-ui-react'

import transpiler_core from './transpiler_core';

import {executeOutput} from './hedgehog_runtime';

import Editor from 'react-simple-code-editor';

import TextareaAutosize from '@material-ui/core/TextareaAutosize';

import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

import './utilities/demo_code';
import demoCode from './utilities/demo_code';

import _Mat from './lib/matrix'

import Output from './output/output'

//the default string for user's input
const default_string = 
`//write your code here
print("hello world")
`;


class Mat extends _Mat.Mat {};

// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[]| number): Mat {return new Mat(input);}





function transpile(your_code:string):string{
    var output_vanilla_js_string = transpiler_core(your_code);
    return output_vanilla_js_string;
}


class HedgehogLab extends Component {

  constructor(props){
      super(props);
      this.state = {
          user_input_code:default_string,
          compiled_code:'',
          execution_output_string:'',
          execution_output_list:[],
          auto_mode: true

        };
      this.handleCompileAndRun = this.handleCompileAndRun.bind(this);
      this.handleUserInputCodeChange = this.handleUserInputCodeChange.bind(this);
  }

  handleCompileAndRun(event){

      console.log("Hedgehog Lab: Start Compiling...");

      //compile
      let compiled_result = "";
      try{
        compiled_result = transpile(this.state.user_input_code);
      }
      catch (compileError){
        this.setState({execution_output_string: "Exception caught by Babel compiler:\n\n" + compileError.toString()});
        return;
      }
      console.log("The compiled code to be executed:\n" + compiled_result);
      this.setState({compiled_code: compiled_result});

      //run and get the result
      let output_list = "";
      try{
        output_list =  executeOutput(compiled_result);
      } 
      catch (executionError){
        this.setState({execution_output_string: "Exception caught while executing the script:\n\n" + executionError.toString()});
        return;
      }
      this.setState({execution_output_list: output_list});

      //get all OutputItem with type === "print" and save to "execution_result"
      //to update the textbox
      let  output_string = "";
      output_list.map( 
        (element)=> {if (element.isPrint()) {
          console.log(element)
          output_string += element.text + '\n';
        }
      });

      this.setState({execution_output_string: output_string})
      event.preventDefault();
  }

  handleUserInputCodeChange(event)
  {
      this.setState({user_input_code: event.target.value});
  }

  handleLoadingTutorialCode(tutorialID, event){
    let tutorialObject = new demoCode();
    if (tutorialID===1) {
      this.setState({
        user_input_code: tutorialObject.demo_1_Matrix
      })
    }
    else if (tutorialID === 2){
      this.setState({
        user_input_code: tutorialObject.demo_2_Operators
      })
    }
    else if (tutorialID === 3){
      this.setState({
        user_input_code: tutorialObject.demo_3_GPU_Acceleration
      })
    }
    else if (tutorialID === 4){
      this.setState({
        user_input_code: tutorialObject.demo_4_build_in_functions
      })
    }
    else if (tutorialID === 5){
      this.setState({
        user_input_code: tutorialObject.demo_5_insert_tex
      })
    }
    else if (tutorialID === 6){
      this.setState({user_input_code: tutorialObject.demo_6_graphics})
    }
  }

  //handleChange = (e, { value }) => this.setState({ value })

  render() {
    return (

      <div>
      <Form>

        <Form.Button size="lg" onClick={this.handleCompileAndRun}>Compile and run</Form.Button>

        <Label>Your code:</Label>

        <Editor
          value={this.state.user_input_code}
          aria-label="code editor"
          onValueChange={code => this.setState({ user_input_code:code })}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />

        <Label>Results:</Label>

        <TextareaAutosize
          value =   {this.state.execution_output_string}
        />


      </Form>
      <div>

        <Output outputItemList = { this.state.execution_output_list}/>
      </div>

      <Form>
        <br/><br/>

        <Label>Hedgehog Lab Tutorials:</Label>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(1, event)
        }>Tutorial 1: Matrix</Form.Button>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(2, event)
        }>Tutorial 2: Operators</Form.Button>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(3, event)
        }>Tutorial 3: GPU Acceleration</Form.Button>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(4, event)
        }>Tutorial 4: Built-in functions</Form.Button>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(5, event)
        }>Tutorial 5: TeX in Hedgehog Lab</Form.Button>
        <Form.Button onClick={
          (event)=>this.handleLoadingTutorialCode(6, event)
        }>Tutorial 6: Figures and plotting</Form.Button>


      </Form>

      <Label color='green' basic>
          <a href="https://github.com/lidangzzz/hedgehog-lab" target="_blank">Fork this repository at Github: https://github.com/lidangzzz/hedgehog-lab</a>
          <br/>
          <a href="https://twitter.com/lidangzzz" target="_blank">Follow my Twitter: @lidangzzz</a>
      </Label>
      </div>
    )
  }
}


export default HedgehogLab;

