import React, { useState, useEffect }  from 'react';

import {
  Grid,
  Container,
  Box,
} from '@material-ui/core';

import Header from "./components/Header/Header";
import YourCode from "./components/YourCode/YourCode";
import Results from "./components/Results/Results";
import Footer from "./components/Footer/Footer";

// @ts-ignore
import { tutorials } from './tutorials';

import CompiledWorker from './core/webWorkers/compiled.worker.js'
import OutputWorker from './core/webWorkers/output.worker.js'
import OutputItemType from "./core/output/";
// @ts-ignore
import OutputItem from "./core/output/output-item.js";
import {ControlledEditorOnChange} from "@monaco-editor/react";

const myCompiledWorker = new CompiledWorker()
const myOutputWorker = new OutputWorker()

// the default source for user's input
const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const HedgehogLab: React.FC<{}> = () => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE)
  const [compiledCode, setCompiledCode] = useState<string>('')
  const [executionOutputString, setExecutionOutputString] = useState<string>('')
  const [executionOutputList, setExecutionOutputList] = useState<OutputItemType[]>([])
  const [autoMode, setAutoMode] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCompileAndRun = (event: React.MouseEvent) => {
    console.log('Hedgehog Lab: Start Compiling...');
    setLoading(true)
    myCompiledWorker.postMessage(source)

    //compile
    // let compiled_result = '';
    // try {
    //   compiled_result = transpile(this.state.source);
    // } catch (compileError) {
    //   this.setState({
    //     execution_output_string:
    //       'Exception caught by Babel compiler:\n\n' + compileError.toString(),
    //   });
    //   return;
    // }
    // console.log('The compiled code to be executed:\n' + compiled_result);
    // this.setState({ compiled_code: compiled_result });
    //
    // //run and get the result
    // let output_list = '';
    // try {
    //   output_list = executeOutput(compiled_result);
    // } catch (executionError) {
    //   this.setState({
    //     execution_output_string:
    //       'Exception caught while executing the script:\n\n' +
    //       executionError.toString(),
    //   });
    //   return;
    // }
    // this.setState({ execution_output_list: output_list });
    //
    // //get all OutputItem with type === "print" and save to "execution_result"
    // //to update the textbox
    // let output_string = '';
    // output_list.map((element) => {
    //   if (element.isPrint()) {
    //     console.log(element);
    //     output_string += element.text + '\n';
    //   }
    // });
    //
    // this.setState({ execution_output_string: output_string });

    event.preventDefault();
  }

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
  }

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string)
  }


  useEffect(() => {
    myCompiledWorker.onmessage = (m: MessageEvent) => {
      if (m.data.status === 'success') {
        setCompiledCode(m.data.result)
        myOutputWorker.postMessage(m.data.result)
      } else if (m.data.status === 'error') {
        setExecutionOutputString("Exception caught by Babel compiler:\n\n" + m.data.errorMsg)
        setLoading(false)
      }
    };
    myOutputWorker.onmessage = (m: MessageEvent) => {
      // todo 虽然开启了webworker，但是在收到数据的瞬间会卡顿，原因未知，待优化 something make web worker stuck when message comeback, I don't know why, please fix
      if (m.data.status === 'success') {
        // webworker传递过来的对象是纯对象，并不是OutputItem的实例，改变原型链，让其继承OutputItem的属性
        const outPutItemPrototype = Object.create(new OutputItem())
        const outputList = m.data.result.map((item: {
          __proto__: any;
        }) => {
          item.__proto__ = outPutItemPrototype
          return item
        })
        setExecutionOutputList(outputList)
        let outputString = "";
        outputList.map(
          (element: OutputItemType) => {
            if (element.isPrint()) {
              // todo 这里text对象的toString被覆写了，我找不到覆写方法的位置，导致text.value为array时最终输出为[object object] there text object's toString function be overwritten, please fix the bug
              outputString += element.text + '\n';
            }
          });
        setExecutionOutputString(outputString)
        setLoading(false)
      } else if (m.data.status === 'error') {
        setExecutionOutputString("Exception caught while executing the script:\n\n" + m.data.errorMsg)
        setLoading(false)
      }
    };
    return () => {
      myCompiledWorker.terminate()
      myOutputWorker.terminate()
    }
  }, [])

  return (
    <div>
      <div>
        <Container maxWidth="xl">
          <Header/>
          <Box my={4}>
            <Grid container spacing={3}>
              <YourCode
                handleCompileAndRun={handleCompileAndRun}
                handleLoadTutorial={handleLoadTutorial}
                handleUploadSource={handleUploadSource}
                source={source}
                loading={loading}
              />
              <Results
                executionOutputList={executionOutputList}
                executionOutputString={executionOutputString}
              />
            </Grid>
            <Footer/>
          </Box>
        </Container>
      </div>
    </div>
  )

}

export default HedgehogLab;
