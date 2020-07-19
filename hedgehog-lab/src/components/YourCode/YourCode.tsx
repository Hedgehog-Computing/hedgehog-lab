import React from "react";
import { Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Typography } from "@material-ui/core";
import { ControlledEditor, ControlledEditorOnChange } from "@monaco-editor/react";
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
// @ts-ignore
import { tutorials } from '../../tutorials';

interface YourCodeProps {
  handleCompileAndRun: (event: React.MouseEvent) => void;
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  handleUploadSource: ControlledEditorOnChange
  source: string
  loading: boolean;
}

const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {

  const { handleCompileAndRun, handleLoadTutorial, handleUploadSource, loading, source } = props

  function handleEditorDidMount(_: any, editor: monacoEditor.editor.IStandaloneCodeEditor) {
    editor.addAction({
      id: "ctrlcmd-enter-run-id", //TODO get unique id
      label: "ctrlcmd-enter-run-label",
      keybindings: [2051],
      run: function (editor) {
        console.log("invoke Compile and run");
        document.getElementById('compile-and-run-button')?.click();
      }
    }
    );
  }

  const options = {
    wordWrap: "on" as "on",
    scrollBeyondLastLine: false,
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" className={'your-code-card'}>

        <CardHeader
          action={
            <div className="run-button">
              <Button
                id="compile-and-run-button"
                variant="contained"
                color="primary"
                onClick={(e) => handleCompileAndRun(e)}
                style={{ textTransform: 'none' }}
                disabled={loading}
              >
                Compile and run
              </Button>
              {loading && <CircularProgress size={24} className={'run-button-loading'} />}
            </div>
          }
          title="Your code:"
        />

        <CardContent>
          <ControlledEditor
            height="90vh"
            language="javascript"
            value={source}
            onChange={handleUploadSource}
            options={options}
            editorDidMount={handleEditorDidMount}
          />
        </CardContent>
      </Card>

      <Box my={2}>
        <Typography variant="h6" gutterBottom>
          Hedgehog Lab Tutorials:
        </Typography>

        {tutorials.map((tutorial: { description: React.ReactNode; }, i: number) => {
          return (
            <Box my={1}>
              <Button
                key={`${i}-${Date.now()}`}
                size="small"
                style={{ textTransform: 'none' }}
                variant="contained"
                disableElevation
                onClick={(e) => handleLoadTutorial(e, i)}
              >
                Tutorial {i + 1}: {tutorial.description}
              </Button>
            </Box>
          );
        })}
      </Box>
    </Grid>
  )
}

export default YourCode
