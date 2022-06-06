import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import Editor from "../../components/Base/Editor/Editor";

const Draft = () => {
    const {editorCode, setEditorCode} = useEditor();
    const lastRunningCode = localStorage.getItem("lastRunningCode");

    useEffect(() => {
        if (editorCode === "") {
            setEditorCode(lastRunningCode);
        }
    }, [editorCode])

    return (
        <Editor/>
    )
}

export default Draft;
