import React, { useState, useEffect } from 'react'
import { Grid, Container, Box } from '@material-ui/core'
import Header from './components/Header/Header'
import YourCode from './components/YourCode/YourCode'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'
import { tutorials } from './tutorials'
import OutputItemType from './core/output/output-item'
import { useMutation } from 'react-query'
import { ControlledEditorOnChange } from '@monaco-editor/react'
import { compiler, releaseWorker } from './core'


const DEFAULT_SOURCE = `//write your code here
print("hello world")
`

const HedgehogLab: React.FC<{}> = () => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE)
  const [result, setResult] = useState<{
    outputItem: OutputItemType[]
    outputString: string
  }>({
    outputItem: [],
    outputString: '',
  })
  const [complie, { isLoading }] = useMutation(compiler, {
    onSuccess: (result: React.SetStateAction<{ outputItem: OutputItemType[]; outputString: string }>) => {
      setResult(result)
    },
    onError: () => {
      console.log('Hedgehog Lab: Failed')
    },
  })

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
    complie(tutorials[index].source as string)
  }

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string)
  }

  const handleCompileAndRun = () => {
    setResult({
      outputItem: [],
      outputString: '',
    })
    complie(source)
  }

  useEffect(() => {
    return () => {
      releaseWorker()
    }
  }, [])
  return (
    <div>
      <div>
        <Header />
        <Container maxWidth="xl">
          <Box my={4}>
            <Grid container spacing={3}>
              <YourCode
                handleCompileAndRun={handleCompileAndRun}
                setSource={setSource}
                source={source}
                loading={isLoading}
              />
              <Results
                executionOutputList={result.outputItem}
                executionOutputString={result.outputString}
                loading={isLoading}
              />
            </Grid>
            <Footer />
          </Box>
        </Container>
      </div>
    </div>
  )
}

export default HedgehogLab
