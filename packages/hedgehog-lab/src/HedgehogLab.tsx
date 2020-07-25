import React, { useState, useEffect } from 'react'
import { Grid, CssBaseline, Toolbar } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useMutation } from 'react-query'

import Header from './components/Header/Header'
import YourCode from './components/YourCode/YourCode'
import Results from './components/Results/Results'
import Footer from './components/Footer/Footer'
import DownloadSnackbar from "./components/DownloadSnackbar/DownloadSnackbar";
import { tutorials } from './tutorials'
import { OutputItem } from '@hedgehog/core'
import AbortError from "./type/AbortError";
import { useQuery } from "./hooks";
import { compiler, releaseWorker, restartWorker } from './compiler'
const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const HedgehogLab: React.FC<{}> = () => {
  const [source, setSource] = useState<string>(DEFAULT_SOURCE);
  const [result, setResult] = useState<{
    outputItem: OutputItem[];
    outputString: string;
  }>({
    outputItem: [],
    outputString: '',
  });
  const [complie, { isLoading }] = useMutation(compiler, {
    onSuccess: (
      result: React.SetStateAction<{
        outputItem: OutputItem[];
        outputString: string;
      }>
    ) => {
      setResult(result);
    },
    onError: (lastError) => {
      // It's necessary to output all exception messages to user at output textbox,
      // including execution runtime exception and compiling exception -Lidang
      console.log('Hedgehog Lab: Failed: ' + lastError.toString());
      setResult({
        outputItem: [],
        outputString: lastError instanceof AbortError ? '' : lastError.toString(),
      })
    },
  });
  const { auto_run: autoRun, your_url: yourUrl } = useQuery()

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
    if (isLoading) restartWorker()
    setResult({
      outputItem: [],
      outputString: '',
    });
    complie(tutorials[index].source as string);
  };

  const handleCompileAndRun = () => {
    setResult({
      outputItem: [],
      outputString: '',
    });
    complie(source);
  };

  const handleStop = () => {
    setResult({
      outputItem: [],
      outputString: '',
    })
    restartWorker()
  }



  useEffect(() => {
    return () => {
      releaseWorker();
    };
  }, [complie]);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
      },
      content: {
        flexGrow: 1,
      },
    })
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
            <Grid item xs={12}>
              <Grid
                container
                style={{
                  height: 'calc(100vh - 174px)',
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
                    height: 'calc(100vh - 64px)',
                    overflowY: 'auto',
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
      {
        yourUrl && <DownloadSnackbar
          setResult={setResult}
          setSource={setSource}
          complie={complie}
          yourUrl={yourUrl}
          autoRun={!!autoRun}
        />
      }
    </div>
  );
};

export default HedgehogLab;
