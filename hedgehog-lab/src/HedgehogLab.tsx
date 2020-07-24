import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Grid, CssBaseline, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Header from './components/Header/Header'
import YourCode from './components/YourCode/YourCode'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'
import { tutorials } from './tutorials'
import OutputItemType from './core/output/output-item'
import { useMutation } from 'react-query'
import { compiler, releaseWorker, restartWorker } from './compiler'
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
    onSuccess: (
      result: React.SetStateAction<{
        outputItem: OutputItemType[]
        outputString: string
      }>
    ) => {
      setResult(result)
    },
    onError: (lastError) => {
      // It's necessary to output all exception messages to user at output textbox,
      // including execution runtime exception and compiling exception -Lidang
      lastError ? console.log('Hedgehog Lab: Failed: ' + lastError.toString()) : console.log('Hedgehog Lab: Failed: web worker terminate')
      setResult({
        outputItem: [],
        outputString: lastError ? lastError.toString() : '',
      })
    },
  })

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
    if (isLoading) restartWorker()
    setResult({
      outputItem: [],
      outputString: '',
    })
    complie(tutorials[index].source as string)
  }

  const handleCompileAndRun = () => {
    setResult({
      outputItem: [],
      outputString: '',
    })
    complie(source)
  }

  const handleStop = () => {
    setResult({
      outputItem: [],
      outputString: '',
    })
    restartWorker()
  }

  const getUrlData = async () => {
    try {
      const { auto_run: autoRun, your_url: yourUrl } = window.location.search.slice(1).split('&').map(item => ({[item.split('=')[0]]: item.split('=')[1]})).reduce((prev, item) => ({...prev, ...item}), {})
      const result = await Axios.get(decodeURIComponent(yourUrl))
      setSource(result.data)
      if (autoRun) {
        setResult({
          outputItem: [],
          outputString: '',
        })
        complie(result.data)
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (window.location.search.length > 1) {
      getUrlData()
    }
    return () => {
      releaseWorker()
    }
  }, [])

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
      },
    }),
  );

  const classes = useStyles();

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />

        <Header handleLoadTutorial={handleLoadTutorial} />

        <main className={classes.content}>
          <Toolbar />

          <Grid container>
            <Grid
              item
              xs={12}
            >
              <Grid
                container
                style={{
                  height: "calc(100vh - 174px)"
                }}
              >
                <Grid item xs={12} md={6}>
                  <YourCode
                    handleCompileAndRun={handleCompileAndRun}
                    setSource={setSource}
                    source={source}
                    loading={isLoading}
                    handleStop={handleStop}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{
                    height: "calc(100vh - 64px)",
                    overflowY: "auto"
                  }}
                >
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
