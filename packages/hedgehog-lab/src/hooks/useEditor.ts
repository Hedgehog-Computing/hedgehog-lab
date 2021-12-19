import {useTheme} from "@mui/material";
import {useRecoilState, useSetRecoilState} from "recoil";
import {codeSavingFlagState, editorCodeState} from "../states/RYourCodeStates";
import {useCallback, useEffect, useState} from "react";
import * as monacoEditor from "monaco-editor";
import {ControlledEditorOnChange, monaco} from "@monaco-editor/react";
import {monacoTheme} from "../themes/monacoTheme";
import useKeyboardJs from "react-use/lib/useKeyboardJs";

export const COMPILE_AND_RUN_BUTTON_ID = 'compile-and-run-button-id';

monaco.init().then(monaco => {
        monaco.editor.defineTheme('monacoDarkTheme', monacoTheme)

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSyntaxValidation: true,
            noSemanticValidation: true
        })
    }
).catch(error => console.error('An error occurred during initialization of Monaco: ', error));


export const useEditor = ():
    readonly[
        string,
        ((ev: monacoEditor.editor.IModelContentChangedEvent, value: (string | undefined)) => (string | void)),
        ((_: () => string, editor: monacoEditor.editor.IStandaloneCodeEditor) => void),
        (monacoEditor.editor.IEditor | null),
        ("monacoDarkTheme" | "vs"),
        (monacoEditor.editor.IEditorConstructionOptions),
        (() => void)] => {

    const theme = useTheme()

    const [editorCode, setEditorCode] = useRecoilState<string>(editorCodeState)

    const [editor, setEditor] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

    const [editorTheme, setEditorTheme] = useState<'monacoDarkTheme' | 'vs'>('vs')

    const setCodeSavingFlag = useSetRecoilState(codeSavingFlagState)


    // save code to local storage
    const autoSaveCode = useCallback(() => {
        localStorage.setItem('lastRunningCode', editorCode as string)
        setCodeSavingFlag(false)
    }, [editorCode, setCodeSavingFlag])

    window.addEventListener("beforeunload", () => {
        autoSaveCode()
    });

    const handleUploadSource: ControlledEditorOnChange = (e, v) => {
        setEditorCode(v as string);
        setCodeSavingFlag(true)
    };

    // override ctrl+S
    document.addEventListener("keydown", function (e) {
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
        }
    }, false);

    const [isPressed] = useKeyboardJs('ctrl + s')

    useEffect(() => {
        if (isPressed) {
            autoSaveCode()
        }
    }, [autoSaveCode, isPressed])

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

    return [
        editorCode,
        handleUploadSource,
        handleEditorDidMount,
        editor,
        editorTheme,
        options,
        autoSaveCode
    ] as const
}
