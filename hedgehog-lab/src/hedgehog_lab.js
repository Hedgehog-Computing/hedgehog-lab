import React, { Component } from 'react';
import {
  Form,
  TextArea,
  Label,
} from 'semantic-ui-react'

import transpiler_core from './transpiler_core';

import { executeOutput } from './hedgehog_runtime';

import { ControlledEditor } from '@monaco-editor/react';


import {
  TextareaAutosize,
  Grid,
  Container,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Card,
  CardHeader,
  CardContent
} from '@material-ui/core';

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

class Mat extends _Mat.Mat { };

// below is a wrapper of constructing a Mat object
function mat(input?: number[][] | number[] | number): Mat { return new Mat(input); }

function transpile(your_code: string): string {
  var output_vanilla_js_string = transpiler_core(your_code);
  return output_vanilla_js_string;
}

const tutorialText = ['Matrix', 'Operators', 'GPU Acceleration', 'Built-in functions', 'TeX in Hedgehog Lab', 'Figures and plotting', 'Symbolic computing', 'Markdown']

class HedgehogLab extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_input_code: default_string,
      compiled_code: '',
      execution_output_string: '',
      execution_output_list: [],
      auto_mode: true

    };
    this.handleCompileAndRun = this.handleCompileAndRun.bind(this);
  }

  handleCompileAndRun(event) {

    console.log("Hedgehog Lab: Start Compiling...");

    //compile
    let compiled_result = "";
    try {
      compiled_result = transpile(this.state.user_input_code);
    }
    catch (compileError) {
      this.setState({ execution_output_string: "Exception caught by Babel compiler:\n\n" + compileError.toString() });
      return;
    }
    console.log("The compiled code to be executed:\n" + compiled_result);
    this.setState({ compiled_code: compiled_result });

    //run and get the result
    let output_list = "";
    try {
      output_list = executeOutput(compiled_result);
    }
    catch (executionError) {
      this.setState({ execution_output_string: "Exception caught while executing the script:\n\n" + executionError.toString() });
      return;
    }
    this.setState({ execution_output_list: output_list });

    //get all OutputItem with type === "print" and save to "execution_result"
    //to update the textbox
    let output_string = "";
    output_list.map(
      (element) => {
        if (element.isPrint()) {
          console.log(element)
          output_string += element.text + '\n';
        }
      });

    this.setState({ execution_output_string: output_string })
    event.preventDefault();
  }

  handleLoadingTutorialCode(tutorialID, event) {
    let tutorialObject = new demoCode();
    if (tutorialID === 1) {
      this.setState({
        user_input_code: tutorialObject.demo_1_Matrix
      })
    }
    else if (tutorialID === 2) {
      this.setState({
        user_input_code: tutorialObject.demo_2_Operators
      })
    }
    else if (tutorialID === 3) {
      this.setState({
        user_input_code: tutorialObject.demo_3_GPU_Acceleration
      })
    }
    else if (tutorialID === 4) {
      this.setState({
        user_input_code: tutorialObject.demo_4_build_in_functions
      })
    }
    else if (tutorialID === 5) {
      this.setState({
        user_input_code: tutorialObject.demo_5_insert_tex
      })
    }
    else if (tutorialID === 6) {
      this.setState({ user_input_code: tutorialObject.demo_6_graphics })
    }
    else if (tutorialID === 7) {
      this.setState({ user_input_code: tutorialObject.demo_7_symbolic })
    }
    else if (tutorialID === 8) {
      this.setState({ user_input_code: tutorialObject.demo_8_markdown })
    }
  }

  //handleChange = (e, { value }) => this.setState({ value })

  render() {

    const options = {
      wordWrap: "on",
      scrollBeyondLastLine: false
    };
    return (
      <div>
        <div>
          <Container maxWidth="xl">
            <div style={{ flexGrow: 1 }}>
              <AppBar position="static" elevation={0} color="default">
                <Toolbar>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Hedgehog Lab
                  </Typography>

                  <Button color="inherit" style={{ textTransform: "none" }} target="_black" href="https://twitter.com/lidangzzz">Twitter</Button>
                  <Button color="inherit" style={{ textTransform: "none" }} target="_black" href="https://github.com/lidangzzz/hedgehog-lab">Github</Button>
                </Toolbar>
              </AppBar>
            </div>

            <Box my={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" className={'your-code-card'}>
                    <CardHeader
                      action={
                        <Button variant="contained" color="primary" onClick={this.handleCompileAndRun} style={{ textTransform: "none" }}>
                          Compile and run
                        </Button>
                      }
                      title="Your code:"
                    />

                    <CardContent>
                      <ControlledEditor
                        height="90vh"
                        language="javascript"
                        value={this.state.user_input_code}
                        onChange={(e, v) => { this.setState({ user_input_code: v }) }}
                        options={options}
                      />
                    </CardContent>
                  </Card>

                  <Box my={2}>
                    <Typography variant="h6" gutterBottom>
                      Hedgehog Lab Tutorials:
                    </Typography>

                    {
                      [...tutorialText].map((item, i) => {
                        return (
                          <Box my={1}>
                            <Button size="small" style={{ textTransform: "none" }} variant="contained" disableElevation onClick={
                              (event) => this.handleLoadingTutorialCode(i + 1, event)
                            }>
                              Tutorial {i + 1}: {item}
                            </Button>
                          </Box>
                        )
                      })
                    }
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom className={'result-title'}>
                    Results:
                  </Typography>



                  <div>
                    <Output outputItemList={this.state.execution_output_list} />
                  </div>
                  <TextareaAutosize
                  value={this.state.execution_output_string}
                  style={{
                    //fontSize: 16,
                    fontFamily: "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
                  }}
                  disabled
                />
                </Grid>
              </Grid>

              <Label color='green' basic>
                <a href="https://github.com/lidangzzz/hedgehog-lab" target="_blank">Fork this repository at Github: https://github.com/lidangzzz/hedgehog-lab</a>
                <br />
                <a href="https://twitter.com/lidangzzz" target="_blank">Follow my Twitter: @lidangzzz</a>
              </Label>
            </Box>
          </Container>
        </div>
      </div>
    )
  }
}


export default HedgehogLab;
