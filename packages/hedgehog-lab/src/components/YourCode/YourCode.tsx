import React, { Dispatch, SetStateAction } from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { ControlledEditor, ControlledEditorOnChange } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { queryCache } from 'react-query';

const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';

interface YourCodeProps {
  handleCompileAndRun: (event: React.MouseEvent) => void;
  source: string;
  loading: boolean;
  setSource: Dispatch<SetStateAction<string>>;
}

const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {
  const { handleCompileAndRun, loading, setSource, source } = props;

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string);
  };

  const options = {
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false
  };

  const handleEditorDidMount = (
    _: () => string,
    editor: monacoEditor.editor.IStandaloneCodeEditor
  ) => {
    editor.addAction({
      id: COMPILE_AND_RUN_BUTTON_ID,
      label: 'compile-and-run-butt-label',
      keybindings: [2051], // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter == 2051
      run: () => {
        document.getElementById(COMPILE_AND_RUN_BUTTON_ID)?.click();
      }
    });
  };

  return (
    <div style={{ height: '100%' }}>
      <Card className={'your-code-card'} style={{ height: '100%' }}>
        <CardHeader
          action={
            <div className="run-button">
              {loading ? (
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ textTransform: 'none', width: 140 }}
                  onClick={() => {
                    // stop the web-worker
                    queryCache.cancelQueries(['compiler']);
                    // set result to initial state
                    queryCache.setQueryData(['compiler', source], (data) => ({
                      outputItem: [],
                      outputString: ''
                    }));
                  }}>
                  Stop
                </Button>
              ) : (
                <Button
                  id={COMPILE_AND_RUN_BUTTON_ID}
                  variant="contained"
                  color="primary"
                  onClick={(e) => handleCompileAndRun(e)}
                  style={{ textTransform: 'none' }}>
                  Compile and run
                </Button>
              )}
            </div>
          }
          title="Your code:"
        />

        <CardContent>
          <div
            style={{
              height: 'calc(100vh - 174px)'
            }}>
            <ControlledEditor
              language="javascript"
              value={source}
              onChange={handleUploadSource}
              options={options}
              editorDidMount={handleEditorDidMount}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourCode;
