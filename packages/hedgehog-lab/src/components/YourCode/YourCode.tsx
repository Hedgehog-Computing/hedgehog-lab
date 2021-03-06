import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import { ControlledEditor, ControlledEditorOnChange } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { queryCache } from 'react-query';
import ResizeObserver from 'react-resize-detector';

const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';

interface YourCodeProps {
  handleCompileAndRun: (event: React.MouseEvent) => void;
  source: string;
  loading: boolean;
  setSource: Dispatch<SetStateAction<string>>;
}

const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {
  const { handleCompileAndRun, loading, setSource, source } = props;

  const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<typeof monacoEditor | null>(null);

  const handleUploadSource: ControlledEditorOnChange = (e, v) => {
    setSource(v as string);
  };

  const options = {
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false
  };

  const handleEditorDidMount = (
    _: () => string,
    editor: monacoEditor.editor.IStandaloneCodeEditor,
  ) => {
    editor.addAction({
      id: COMPILE_AND_RUN_BUTTON_ID,
      label: 'compile-and-run-butt-label',
      keybindings: [2051], // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter == 2051
      run: () => {
        document.getElementById(COMPILE_AND_RUN_BUTTON_ID)?.click();
      }
    });
    setEditor(editor);
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
                  style={{
                    textTransform: 'none',
                  }}
                  size = "small"
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
                  size = "small"
                  onClick={(e) => handleCompileAndRun(e)}
                  style={{
                    textTransform: 'none'
                  }}>
                  Run
                </Button>
              )}
            </div>
          }
        />

        <CardContent>
          <ResizeObserver
              onResize={(width, height) => {
                if (editor) {
                  editor.layout();
                }
              }}>
            <div
              style={{
                height: 'calc(100vh - 160px)'
                
              }}>
              <ControlledEditor
                language="javascript"
                value={source}
                onChange={handleUploadSource}
                options={options}
                editorDidMount={handleEditorDidMount}
                
              />
            </div>
          </ResizeObserver>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourCode;
