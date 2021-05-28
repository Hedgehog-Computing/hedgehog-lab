import React, { useState, Dispatch, SetStateAction } from 'react';
import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import ResizeObserver from 'react-resize-detector';
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
  const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
  const [monaco, setMonaco] = useState<typeof monacoEditor | null>(null);

  const handleUploadSource = (v: string) => {
    setSource(v as string);
  };

  const options = {
    wordWrap: 'on' as const,
    scrollBeyondLastLine: false
  };

  const EditorDidMountHandle = (
    editor: monacoEditor.editor.IStandaloneCodeEditor,
    monaco: typeof monacoEditor
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
    setMonaco(monaco);
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
                    width: 140
                  }}
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
                  style={{
                    textTransform: 'none'
                  }}>
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
              height: 'calc(100vh - 160px)'
            }}>
            <div
              style={{
                height: 'calc(100vh - 174px)'
              }}>
              <MonacoEditor
                language="javascript"
                value={source}
                onChange={handleUploadSource}
                options={options}
                editorDidMount={EditorDidMountHandle}
              />
            </div>
          </ResizeObserver>
        </CardContent>
      </Card>
    </div>
  );
};

export default YourCode;
