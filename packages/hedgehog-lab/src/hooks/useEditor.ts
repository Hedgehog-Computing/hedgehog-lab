import {useTheme} from "@mui/material";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {codeSavingFlagState, editorCodeState, editorMetaState,} from "../states/RYourCodeStates";
import {useCallback, useEffect, useState} from "react";
import * as monacoEditor from "monaco-editor";
import {ControlledEditorOnChange, monaco} from "@monaco-editor/react";
import {monacoTheme} from "../themes/monacoTheme";
import useKeyboardJs from "react-use/lib/useKeyboardJs";
import {useDebounce} from "react-use";
import {useCompiler} from "./useCompilier";
import {compilerLiveModeState} from "../states/RCompilerStates";
import {useMatch} from "react-router-dom";
import {useSnippet} from "./useSnippet";
import {useAuth} from "./useAuth";

export const COMPILE_AND_RUN_BUTTON_ID = "compile-and-run-button-id";

monaco
    .init()
    .then((monaco) => {
        monaco.editor.defineTheme("monacoDarkTheme", monacoTheme);

        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSyntaxValidation: true,
            noSemanticValidation: true,
        });
    })
    .catch((error) =>
        console.error("An error occurred during initialization of Monaco: ", error)
    );

export const useEditor = (): any => {
    const theme = useTheme();

    const [editorCode, setEditorCode] = useRecoilState(editorCodeState);

    const [
        editor,
        setEditor,
    ] = useState<monacoEditor.editor.IStandaloneCodeEditor | null>(null);

    const [editorTheme, setEditorTheme] = useState<"monacoDarkTheme" | "vs">(
        "vs"
    );

    const setCodeSavingFlag = useSetRecoilState(codeSavingFlagState);

    const [setCompilerReFetch] = useCompiler();

    const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
        compilerLiveModeState
    );

    const editorMeta = useRecoilValue(editorMetaState);
    const isAuthSnippetPage = useMatch(`/s/:userID/:snippetID`)?.params
    const {updateSnippet} = useSnippet()
    const {auth} = useAuth()

    // save code to local storage
    const autoSaveCode = useCallback(() => {
        localStorage.setItem("lastRunningCode", editorCode as string);
        setCodeSavingFlag(false);

        // live mode
        compilerLiveMode === "on" ? setCompilerReFetch(true) : null;
    }, [compilerLiveMode, editorCode, setCodeSavingFlag, setCompilerReFetch]);

    // auto save when page close
    window.addEventListener("beforeunload", () => {
        autoSaveCode();
    });

    // auto save code each 1s
    const [] = useDebounce(
        () => {
            autoSaveCode();
        },
        1000,
        [editorCode]
    );

    // override ctrl+S to save code
    document.addEventListener(
        "keydown",
        function (e) {
            if (
                e.keyCode == 83 &&
                (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)
            ) {
                e.preventDefault();
            }
        },
        false
    );

    const [isPressed] = useKeyboardJs("ctrl + s");

    useEffect(() => {
        if (isPressed) {
            autoSaveCode();
        }
    }, [isPressed]);

    // set code to store when editor change
    const handleUploadSource: ControlledEditorOnChange = (e, v) => {
        if (v) {
            setEditorCode(v);
        } else {
            setEditorCode(" ");
        }

        setCodeSavingFlag(true);
    };

    const options = {
        wordWrap: "on" as const,
        scrollBeyondLastLine: false,
    };

    const handleEditorDidMount = (
        _: () => string,
        editor: monacoEditor.editor.IStandaloneCodeEditor
    ) => {
        editor.addAction({
            id: COMPILE_AND_RUN_BUTTON_ID,
            label: "compile-and-run-butt-label",
            keybindings: [2051], // Monaco.KeyMod.CtrlCmd | Monaco.KeyCode.Enter == 2051
            run: () => {
                document.getElementById(COMPILE_AND_RUN_BUTTON_ID)?.click();
            },
        });
        setEditor(editor);
    };

    useEffect(() => {
        theme.palette.mode === "dark"
            ? setEditorTheme("monacoDarkTheme")
            : setEditorTheme("vs");
    }, [theme.palette.mode]);

    return {
        editorCode,
        setEditorCode,
        handleUploadSource,
        handleEditorDidMount,
        editor,
        editorTheme,
        options,
        autoSaveCode,
    };
};

