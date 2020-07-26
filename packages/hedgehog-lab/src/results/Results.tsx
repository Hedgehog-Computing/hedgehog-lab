import React from 'react';
import {
  CircularProgress,
  TextareaAutosize,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from '@material-ui/core';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import ArrowUpwardOutlinedIcon from '@material-ui/icons/ArrowUpwardOutlined';
import Output from '../output/Output';
import { OutputItem } from '@hedgehog/core';

interface ResultsProps {
  executionOutputList: OutputItem[];
  executionOutputString: string;
  loading: boolean;
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {
  const { executionOutputList, executionOutputString, loading } = props;

  return (
    <div style={{ height: '100%' }}>
      <Card
        style={{
          backgroundColor: 'transparent',
          height: '100%',
          overflowY: 'auto',
          overflowX: 'auto',
        }}
      >
        {executionOutputList.length === 0 && executionOutputString === '' ? (
          <div className={'no-code'}>
            <div className="no-code-content">
              {loading ? (
                <CircularProgress size={50} style={{ color: 'black' }} />
              ) : document.body.clientWidth < 960 ? (
                <ArrowUpwardOutlinedIcon style={{ fontSize: 50 }} />
              ) : (
                <ArrowBackOutlinedIcon style={{ fontSize: 50 }} />
              )}
              <p>
                {loading
                  ? 'Loading...'
                  : `Please write your code on the ${
                      document.body.clientWidth < 960 ? 'top' : 'left'
                    } and click the 'Compile and run' button`}
              </p>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <CardHeader title="Results:" />

            <Divider />

            <CardContent>
              {executionOutputList.length > 0 && (
                <div>
                  <Output outputItemList={executionOutputList} />
                </div>
              )}
              {executionOutputString && (
                <TextareaAutosize
                  value={executionOutputString}
                  style={{
                    //fontSize: 16,
                    fontFamily:
                      "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
                  }}
                  disabled
                />
              )}
            </CardContent>
          </React.Fragment>
        )}
      </Card>
    </div>
  );
};

export default Results;
