import React, {useEffect, useState} from 'react';
import {Box, CardContent, ClickAwayListener, useTheme} from '@mui/material';
import {ControlledEditor, ControlledEditorOnChange, monaco} from '@monaco-editor/react';
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import ResizeObserver from 'react-resize-detector';
import {monacoTheme} from '../../config/themes/monacoTheme';
import YourCodeHeader from "./Header/YourCodeHeader";
import {useRecoilState} from "recoil";
import {codeSavingFlagState, editorCodeState} from "./RYourCodeStates";

export const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';


monaco.init().then(monaco => {
        monaco.editor.defineTheme('monacoDarkTheme', monacoTheme)

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSyntaxValidation: true,
            noSemanticValidation: true
        })
    }
).catch(error => console.error('An error occurred during initialization of Monaco: ', error));


const YourCode = (): React.ReactElement => {
    const theme = useTheme()

    const [editorCode, setEditorCode] = useRecoilState<string>(editorCodeState)

    const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);
    const [monaco, setMonaco] = useState<typeof monacoEditor | null>(null);

    const [editorTheme, setEditorTheme] = useState<'monacoDarkTheme' | 'vs'>('vs')

    const [codeSavingFlag, setCodeSavingFlag] = useRecoilState(codeSavingFlagState)

    // save code to local storage
    const autoSaveCode = () => {
        localStorage.setItem('lastRunningCode', editorCode as string)
        setCodeSavingFlag(false)
    }

    window.addEventListener("beforeunload", () => {
        autoSaveCode()
    });

    const handleUploadSource: ControlledEditorOnChange = (e, v) => {
        setEditorCode(v as string);
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
        setEditor(editor)
    };

    useEffect(() => {
        theme.palette.mode === 'dark' ? setEditorTheme('monacoDarkTheme') : setEditorTheme('vs')
    }, [theme.palette.mode])

    return (
        <div style={{height: '100%'}}>
            <Box sx={{height: '100%', borderRadius: 0}}>
                <CardContent>
                    <YourCodeHeader/>
                </CardContent>


                <CardContent>
                    <ClickAwayListener onClickAway={autoSaveCode}>
                        <ResizeObserver
                            onResize={(width, height) => {
                                if (editor) {
                                    editor.layout();
                                    editorCode
                                }
                            }}>
                            <div
                                style={{
                                    height: 'calc(100vh - 160px)'

                                }}>

                                <ControlledEditor
                                    language="javascript"
                                    value={editorCode}
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
    )

};

export default YourCode;
