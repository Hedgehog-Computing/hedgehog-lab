import React, { Component } from 'react';
import { ControlledEditor } from '@monaco-editor/react';

import {
  TextareaAutosize,
  Grid,
  Button,
  Box,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Link,
  List,
  ListItem,
  ListItemText,
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
      <Box>
        <Grid container>
          <Grid item xs={12} md={12} lg={3} xl={2}>
            <Card variant="outlined" style={{
              backgroundColor: 'transparent',
              height: '100%'
            }}>
              <CardHeader
                title="Hedgehog Lab Tutorials:"
              />

              <List>
                {tutorials.map((tutorial, i) => {
                  return (
                    <ListItem button>
                      <ListItemText
                        onClick={(event) =>
                          this.handleLoadTutorial(i, event)
                        }
                      >
                        Tutorial {i + 1}: {tutorial.description}
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={5} xl={5} style={{
            height: '90vh'
          }}>
            <Card variant="outlined" style={{
              backgroundColor: 'transparent',
              height: '100%'
            }}>
              <CardHeader
                action={
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleCompileAndRun}
                    style={{
                      textTransform: 'none',
                    }}
                  >
                    Compile and run
                  </Button>
                }
                title="Your code:"
              />

              <CardContent>
                <ControlledEditor
                  height="80vh"
                  language="javascript"
                  value={this.state.source}
                  onChange={(e, v) => {
                    this.setState({ source: v });
                  }}
                  options={options}
                  theme="dark"
                  style={{
                    backgroundColor: 'transparent',
                  }}
                />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={4} xl={5} style={{
            minHeight: '90vh'
          }}>
            <Card variant="outlined" style={{
              backgroundColor: 'transparent',
              height: '100%',
              overflowX: 'auto'
            }}>
              <CardHeader
                title="Results:"
              />

              <CardContent>
                <Output outputItemList={this.state.execution_output_list} />

                {
                  this.state.execution_output_string &&
                  <TextareaAutosize
                    value={this.state.execution_output_string}
                    style={{
                      //fontSize: 16,
                      fontFamily:
                        "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
                      backgroundColor: 'transparent',
                      fontSize: '16px',
                      color: '#fff',
                      paddingTop: '5px',
                      border: '.2px solid'
                    }}
                    disabled
                  />
                }
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <div>
          <Typography>
            <Link
              href="https://github.com/lidangzzz/hedgehog-lab"
              variant="title"
              style={{
                color: 'white'
              }}
            >
              {
                'Fork this repository at Github: https://github.com/lidangzzz/hedgehog-lab'
              }
            </Link>

            <br />

            <Link href="https://twitter.com/lidangzzz"
              variant="title"
              style={{
                color: 'white'
              }}>
              {'Follow my Twitter: @lidangzzz'}
            </Link>
          </Typography>
        </div>
      </Box>
    );
  }
}

export default HedgehogLab;
