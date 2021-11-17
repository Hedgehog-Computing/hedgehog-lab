import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Box, Button, CardContent, ClickAwayListener, useTheme} from '@mui/material';
import {ControlledEditor, ControlledEditorOnChange, monaco} from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import {queryCache} from 'react-query';
import ResizeObserver from 'react-resize-detector';
import {FiberManualRecord, PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {monacoTheme} from '../../config/themes/monacoTheme';

const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';


monaco.init().then(monaco => {
        monaco.editor.defineTheme('monacoDarkTheme', monacoTheme)

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSyntaxValidation: true,
            noSemanticValidation: true
        })
    }
).catch(error => console.error('An error occurred during initialization of Monaco: ', error));


interface YourCodeProps {
    handleCompileAndRun: (event: React.MouseEvent) => void;
    source: string;
    loading: boolean;
    setSource: Dispatch<SetStateAction<string>>;
}


const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {
    const theme = useTheme()

    const {handleCompileAndRun, loading, setSource, source} = props;

    const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<typeof monacoEditor | null>(null);

    const [editorTheme, setEditorTheme] = useState<'monacoDarkTheme' | 'vs'>('vs')

    const [codeSavingFlag, setCodeSavingFlag] = useState(false)

    // save code to local storage
    const autoSaveCode = () => {
        localStorage.setItem('lastRunningCode', source as string)
        setCodeSavingFlag(false)
    }

    window.addEventListener("beforeunload", () => {
        autoSaveCode()
    });

    const handleUploadSource: ControlledEditorOnChange = (e, v) => {
        setSource(v as string);
        setCodeSavingFlag(true)
    };

    const options = {
        wordWrap: 'on' as const,
        scrollBeyondLastLine: false,
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

    useEffect(() => {
        theme.palette.mode === 'dark' ? setEditorTheme('monacoDarkTheme') : setEditorTheme('vs')
    })

    return (
        <div style={{height: '100%'}}>
            <Box sx={{height: '100%', borderRadius: 0}}>
                <CardContent sx={{display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}>
                    <Button size={'small'} variant={'outlined'} endIcon={
                        codeSavingFlag && (<FiberManualRecord/>)
                    }>
                        Your Code
                    </Button>

                    <div>
                        {loading ? (
                            <Button
                                endIcon={<StopCircleOutlined/>}
                                variant="contained"
                                color="error"
                                size="small"
                                style={{
                                    textTransform: 'none',
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
                                endIcon={<PlayCircleOutline/>}
                                id={COMPILE_AND_RUN_BUTTON_ID}
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={(e) => handleCompileAndRun(e)}
                                style={{
                                    textTransform: 'none'
                                }}>
                                Run
                            </Button>
                        )}
                    </div>
                </CardContent>


                <CardContent>
                    <ClickAwayListener onClickAway={autoSaveCode}>
                        <ResizeObserver
                            onResize={(width, height) => {
                                if (editor) {
                                    editor.layout();
                                    source
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
                                    theme={editorTheme}
                                />
                            </div>
                        </ResizeObserver>
                    </ClickAwayListener>

                </CardContent>
            </Box>
        </div>
    );
};

export default YourCode;
