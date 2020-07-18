import React, { Component } from 'react';
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
  CardContent,
  Link,
} from '@material-ui/core';

import Output from './components/Output';

import { tutorials } from './tutorials';
import transpilerCore from './core/transpiler/transpiler-core';
import { executeOutput } from './core/runtime';

// the default source for user's input
const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

function transpile(source) {
  const transpiled = transpilerCore(source);
  return transpiled;
}

class HedgehogLab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      source: DEFAULT_SOURCE,
      compiled_code: '',
      execution_output_string: '',
      execution_output_list: [],
      auto_mode: true,
    };
    this.handleCompileAndRun = this.handleCompileAndRun.bind(this);
  }

  handleCompileAndRun(event) {
    console.log('Hedgehog Lab: Start Compiling...');

    //compile
    let compiled_result = '';
    try {
      compiled_result = transpile(this.state.source);
    } catch (compileError) {
      this.setState({
        execution_output_string:
          'Exception caught by Babel compiler:\n\n' + compileError.toString(),
      });
      return;
    }
    console.log('The compiled code to be executed:\n' + compiled_result);
    this.setState({ compiled_code: compiled_result });

    //run and get the result
    let output_list = '';
    try {
      output_list = executeOutput(compiled_result);
    } catch (executionError) {
      this.setState({
        execution_output_string:
          'Exception caught while executing the script:\n\n' +
          executionError.toString(),
      });
      return;
    }
    this.setState({ execution_output_list: output_list });

    //get all OutputItem with type === "print" and save to "execution_result"
    //to update the textbox
    let output_string = '';
    output_list.map((element) => {
      if (element.isPrint()) {
        console.log(element);
        output_string += element.text + '\n';
      }
    });

    this.setState({ execution_output_string: output_string });
    event.preventDefault();
  }

  handleLoadTutorial(index, event) {
    this.setState({
      source: tutorials[index].source,
    });
  }

  render() {
    const options = {
      wordWrap: 'on',
      scrollBeyondLastLine: false,
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

                  <Button
                    color="inherit"
                    style={{ textTransform: 'none' }}
                    target="_black"
                    href="https://twitter.com/lidangzzz"
                  >
                    Twitter
                  </Button>
                  <Button
                    color="inherit"
                    style={{ textTransform: 'none' }}
                    target="_black"
                    href="https://github.com/lidangzzz/hedgehog-lab"
                  >
                    Github
                  </Button>
                </Toolbar>
              </AppBar>
            </div>

            <Box my={4}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined">
                    <CardHeader
                      action={
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleCompileAndRun}
                          style={{ textTransform: 'none' }}
                        >
                          Compile and run
                        </Button>
                      }
                      title="Your code:"
                    />

                    <CardContent>
                      <ControlledEditor
                        height="90vh"
                        language="javascript"
                        value={this.state.source}
                        onChange={(e, v) => {
                          this.setState({ source: v });
                        }}
                        options={options}
                      />
                    </CardContent>
                  </Card>

                  <Box my={2}>
                    <Typography variant="h6" gutterBottom>
                      Hedgehog Lab Tutorials:
                    </Typography>

                    {tutorials.map((tutorial, i) => {
                      return (
                        <Box my={1}>
                          <Button
                            size="small"
                            style={{ textTransform: 'none' }}
                            variant="contained"
                            disableElevation
                            onClick={(event) =>
                              this.handleLoadTutorial(i, event)
                            }
                          >
                            Tutorial {i + 1}: {tutorial.description}
                          </Button>
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Results:
                  </Typography>

                  <div>
                    <Output outputItemList={this.state.execution_output_list} />
                  </div>
                  <TextareaAutosize
                    value={this.state.execution_output_string}
                    style={{
                      //fontSize: 16,
                      fontFamily:
                        "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
                    }}
                    disabled
                  />
                </Grid>
              </Grid>

              <div>
                <Typography>
                  <Link
                    href="https://github.com/lidangzzz/hedgehog-lab"
                    variant="title"
                  >
                    {
                      'Fork this repository at Github: https://github.com/lidangzzz/hedgehog-lab"'
                    }
                  </Link>

                  <br />

                  <Link href="https://twitter.com/lidangzzz" variant="title">
                    {'Follow my Twitter: @lidangzzz'}
                  </Link>
                </Typography>
              </div>
            </Box>
          </Container>
        </div>
      </div>
    );
  }
}

export default HedgehogLab;
