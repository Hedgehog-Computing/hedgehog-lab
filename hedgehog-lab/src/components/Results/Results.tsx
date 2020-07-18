import React from 'react'
import {Grid, TextareaAutosize, Typography} from "@material-ui/core";
import Output from "../Output";
import OutputItem from "../../core/output/";

interface ResultsProps {
  executionOutputList: OutputItem[],
  executionOutputString: string
}

const Results: React.FC<ResultsProps> = (props: ResultsProps) => {

  const { executionOutputList, executionOutputString } = props

  return (
    <Grid item xs={12} md={6}>
      <Typography variant="h5" gutterBottom className={'result-title'}>
        Results:
      </Typography>
      <div>
        <Output outputItemList={executionOutputList} />
      </div>
      <TextareaAutosize
        value={executionOutputString}
        style={{
          //fontSize: 16,
          fontFamily:
            "'Fira code', 'Fira Mono', Consolas, Menlo, Courier, monospace",
        }}
        disabled
      />
    </Grid>
  )
}

export default Results
