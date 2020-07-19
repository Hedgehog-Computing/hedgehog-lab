import React from 'react';
import { CircularProgress, Grid, TextareaAutosize, Typography } from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import Output from '../Output';
import OutputItem from '../../core/output/output-item';

interface ResultsProps {
  executionOutputList: OutputItem[],
  executionOutputString: string,
  loading: boolean
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { executionOutputList, executionOutputString, loading } = props;

  return (
    <Grid item xs={12} md={6}>
      {
        executionOutputList.length === 0 && executionOutputString === '' ?
          (
            <div className={'no-code'}>
              <div className="no-code-content">
                {
                  loading ?
                    <CircularProgress size={50} style={{color: "black"}}/>
                    :
                    document.body.clientWidth < 960 ?
                      <ArrowUpwardOutlinedIcon
                        style={{fontSize: 50}}
                      />
                      :
                      <ArrowBackOutlinedIcon
                        style={{fontSize: 50}}
                      />
                }
                <p>{ loading ? 'Loading...' : `Please write your code on the ${document.body.clientWidth < 960 ? 'top' : 'left'} and click the 'Compile and run' button`}</p>
              </div>
            </div>
          ) : (
            <React.Fragment>
              <Typography variant="h5" gutterBottom className={'result-title'}>
                Results:
              </Typography>
              {executionOutputList.length > 0 && <div>
                <Output outputItemList={executionOutputList}/>
              </div>}
              {executionOutputString && <TextareaAutosize
                value={executionOutputString}
                style={{
                  //fontSize: 16,
                  fontFamily:
                    "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
                }}
                disabled
              />}
            </React.Fragment>
          )
      }
    </Grid>
  );
};

export default Results;
