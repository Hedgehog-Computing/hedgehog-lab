import React, { Dispatch, SetStateAction } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
  Typography,
} from '@material-ui/core';
import {
  ControlledEditor,
  ControlledEditorOnChange,
} from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

// @ts-ignore
import { tutorials } from '../../tutorials';

const COMPILE_AND_RUN_BUTTON_ID = "compile-and-run-button-id";

interface YourCodeProps {
  handleCompileAndRun: (event: React.MouseEvent) => void;
  source: string
  loading: boolean;
  setSource: Dispatch<SetStateAction<string>>
}

const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {

  const {
    handleCompileAndRun,
    loading,
    setSource,
    source,
  } = props;

  const handleLoadTutorial = (event: React.MouseEvent, index: number) => {
    setSource(tutorials[index].source as string)
  }

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string)
  }

  const options = {
    wordWrap: 'on' as 'on',
    scrollBeyondLastLine: false,
  };

  const handleEditorDidMount = (_: () => string, editor: monacoEditor.editor.IStandaloneCodeEditor) => {
    editor.addAction({
      id: COMPILE_AND_RUN_BUTTON_ID,
      label: "compile-and-run-butt-label",
      keybindings: [2051], // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter == 2051
      run: () => {
        document.getElementById(COMPILE_AND_RUN_BUTTON_ID)?.click();
      }
    });
  };

  return (
    <Grid item xs={12} md={6}>
      <Card variant="outlined" className={'your-code-card'}>
        <CardHeader
          action={
            <div className="run-button">
              <Button
                id={COMPILE_AND_RUN_BUTTON_ID}
                variant="contained"
                color="primary"
                onClick={(e) => handleCompileAndRun(e)}
                style={{ textTransform: 'none' }}
                disabled={loading}
              >
                Compile and run
              </Button>
              {loading && (
                <CircularProgress size={24} className={'run-button-loading'} />
              )}
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

        {tutorials.map(
          (tutorial: { description: React.ReactNode }, i: number) => {
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
          }
        )}
      </Box>
    </Grid>
  );
};

export default YourCode;
