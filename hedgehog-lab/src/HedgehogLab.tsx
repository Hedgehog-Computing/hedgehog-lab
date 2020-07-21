import React, { useState, useEffect } from 'react'
import { Grid, CssBaseline, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Header from './components/Header/Header'
import YourCode from './components/YourCode/YourCode'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'
import { tutorials } from './tutorials'
import OutputItemType from './core/output/output-item'
import { useMutation } from 'react-query'
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

  useEffect(() => {
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
