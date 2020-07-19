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
// @ts-expect-error
import { tutorials } from './tutorials';
import OutputItemType from "./core/output/";

import {ControlledEditorOnChange} from "@monaco-editor/react";
import { compiler } from './core'
 

// the default source for user's input
const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const HedgehogLab: React.FC<{}> = () => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE)
  const [result, setResult] = useState<{outputItem: OutputItemType[], outputString: string}>({
    outputItem: [],
    outputString: ''
  })
  const [autoMode, setAutoMode] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)

  const handleCompileAndRun = async () => {
    console.log('Hedgehog Lab: Start Compiling...')
    try {
      const output = await compiler(source)
      setResult(output)
    } catch(e) {
      console.log('Hedgehog Lab: Failed')
    }
  }

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
    handleCompileAndRun()
  }

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string)
  }


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
                executionOutputList={result.outputItem}
                executionOutputString={result.outputString}
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
