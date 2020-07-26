import React, { useState } from 'react'
import { Grid, CssBaseline, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

import Header from './components/Header/Header'
import YourCode from './components/YourCode/YourCode'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'
import { tutorials } from './tutorials'
import { useQuery } from 'react-query'
import { compiler } from './compiler'
import type { OutputResult } from './compiler'

const DEFAULT_SOURCE = `//write your code here
print("hello world")
`

const HedgehogLab: React.FC<{}> = () => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE)
  const [input, setInput] = useState<string>(DEFAULT_SOURCE)
  const [result, setResult] = useState<OutputResult>({
    outputItem: [],
    outputString: '',
  })
  const { isFetching: isLoading, refetch } = useQuery<
    OutputResult,
    readonly [string, string],
    Error
  >(['compiler', input], compiler, {
    retry: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    onSuccess: (result: OutputResult) => {
      setResult(result)
    },
    onError: (lastError) => {
      // It's necessary to output all exception messages to user at output textbox,
      // including execution runtime exception and compiling exception -Lidang
      console.log('Hedgehog Lab: Failed: ' + lastError.toString())
      setResult({
        outputItem: [],
        outputString: lastError.toString(),
      })
    },
  })

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
    setResult({
      outputItem: [],
      outputString: '',
    })
    setInput(tutorials[index].source as string)
  }

  const handleCompileAndRun = () => {
    setResult({
      outputItem: [],
      outputString: '',
    })
    if (source === input) {
      refetch({ force: true } as any)
    } else {
      setInput(source)
    }
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
      },
    })
  )

  const classes = useStyles()

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        <Header handleLoadTutorial={handleLoadTutorial} />

        <main className={classes.content}>
          <Toolbar />

          <Grid container>
            <Grid item xs={12}>
              <Grid
                container
                style={{
                  height: 'calc(100vh - 174px)',
                }}>
                <Grid item xs={12} md={6}>
                  <YourCode
                    handleCompileAndRun={handleCompileAndRun}
                    setSource={setSource}
                    source={source}
                    loading={isLoading}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    height: 'calc(100vh - 64px)',
                    overflowY: 'auto',
                  }}>
                  <Results
                    executionOutputList={result.outputItem}
                    executionOutputString={result.outputString}
                    loading={isLoading}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Footer />
        </main>
      </div>
    </div>
  )
}

export default HedgehogLab
