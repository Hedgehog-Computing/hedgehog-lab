import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Card, CardContent, ClickAwayListener, Paper, useTheme } from '@mui/material';
import { ControlledEditor, ControlledEditorOnChange, monaco } from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { queryCache } from 'react-query';
import ResizeObserver from 'react-resize-detector';
import SaveButton from "./SaveButton";
import UploadButton from "./UploadButton";
import { FiberManualRecord, PlayCircleOutline, StopCircleOutlined } from "@mui/icons-material";
import { usePageLeave } from "react-use";

const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';

const monacoTheme: any = {
    "base": "vs-dark",
    "inherit": true,
    "rules": [
        {
            "background": "0C1021",
            "token": ""
        },
        {
            "foreground": "aeaeae",
            "token": "comment"
        },
        {
            "foreground": "d8fa3c",
            "token": "constant"
        },
        {
            "foreground": "ff6400",
            "token": "entity"
        },
        {
            "foreground": "fbde2d",
            "token": "keyword"
        },
        {
            "foreground": "fbde2d",
            "token": "storage"
        },
        {
            "foreground": "61ce3c",
            "token": "string"
        },
        {
            "foreground": "61ce3c",
            "token": "meta.verbatim"
        },
        {
            "foreground": "8da6ce",
            "token": "support"
        },
        {
            "foreground": "ab2a1d",
            "fontStyle": "italic",
            "token": "invalid.deprecated"
        },
        {
            "foreground": "f8f8f8",
            "background": "9d1e15",
            "token": "invalid.illegal"
        },
        {
            "foreground": "ff6400",
            "fontStyle": "italic",
            "token": "entity.other.inherited-class"
        },
        {
            "foreground": "ff6400",
            "token": "string constant.other.placeholder"
        },
        {
            "foreground": "becde6",
            "token": "meta.function-call.py"
        },
        {
            "foreground": "7f90aa",
            "token": "meta.tag"
        },
        {
            "foreground": "7f90aa",
            "token": "meta.tag entity"
        },
        {
            "foreground": "ffffff",
            "token": "entity.name.section"
        },
        {
            "foreground": "d5e0f3",
            "token": "keyword.type.variant"
        },
        {
            "foreground": "f8f8f8",
            "token": "source.ocaml keyword.operator.symbol"
        },
        {
            "foreground": "8da6ce",
            "token": "source.ocaml keyword.operator.symbol.infix"
        },
        {
            "foreground": "8da6ce",
            "token": "source.ocaml keyword.operator.symbol.prefix"
        },
        {
            "fontStyle": "underline",
            "token": "source.ocaml keyword.operator.symbol.infix.floating-point"
        },
        {
            "fontStyle": "underline",
            "token": "source.ocaml keyword.operator.symbol.prefix.floating-point"
        },
        {
            "fontStyle": "underline",
            "token": "source.ocaml constant.numeric.floating-point"
        },
        {
            "background": "ffffff08",
            "token": "text.tex.latex meta.function.environment"
        },
        {
            "background": "7a96fa08",
            "token": "text.tex.latex meta.function.environment meta.function.environment"
        },
        {
            "foreground": "fbde2d",
            "token": "text.tex.latex support.function"
        },
        {
            "foreground": "ffffff",
            "token": "source.plist string.unquoted"
        },
        {
            "foreground": "ffffff",
            "token": "source.plist keyword.operator"
        }
    ],
    "colors": {
        "editor.foreground": "#F8F8F8",
        "editor.background": "#0C1021",
        "editor.selectionBackground": "#253B76",
        "editor.lineHighlightBackground": "#FFFFFF0F",
        "editorCursor.foreground": "#FFFFFFA6",
        "editorWhitespace.foreground": "#FFFFFF40"
    }
}

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
    getLocalCodeList: () => void;
    handleLoadFile: (str: string) => void;
}


const YourCode: React.FC<YourCodeProps> = (props: YourCodeProps) => {
    const theme = useTheme()

    const { handleCompileAndRun, loading, setSource, source, getLocalCodeList, handleLoadFile } = props;

    const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<typeof monacoEditor | null>(null);

    const [editorTheme, setEditorTheme] = useState<'monacoDarkTheme' | 'vs'>('vs')

    const [codeSavingFlag, setCodeSavingFlag] = useState(false)

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    // save code to local storage
    usePageLeave(() => autoSaveCode());
    const autoSaveCode = () => {
        sleep(100).then(() => {
            localStorage.setItem('lastRunningCode', source as string)
            setCodeSavingFlag(false)
        })
    }

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
        <div style={{ height: '100%' }}>
            <Paper sx={{ height: '100%', borderRadius: 0 }}>
                <CardContent sx={{ display: 'flex', alignContent: 'center', justifyContent: 'space-between' }}>
                    <Button size={'small'} variant={'outlined'} endIcon={
                        codeSavingFlag && (<FiberManualRecord />)
                    }>
                        Your Code
                    </Button>

                    <div>
                        <UploadButton handleLoadFile={handleLoadFile} />
                        <SaveButton getLocalCodeList={getLocalCodeList} source={source} />
                        {loading ? (
                            <Button
                                endIcon={<StopCircleOutlined />}
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
                                endIcon={<PlayCircleOutline />}
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
            </Paper>
        </div>
    );
};

export default YourCode;
