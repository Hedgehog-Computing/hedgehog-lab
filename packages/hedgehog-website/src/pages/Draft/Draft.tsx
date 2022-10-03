import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import Editor from "../../components/Base/Editor/Editor";
import Meta from '../../components/Meta/Meta';

const Draft = () => {
    const {editorCode, setEditorCode} = useEditor();
    const lastRunningCode = localStorage.getItem("lastRunningCode");

    useEffect(() => {
        if (editorCode === "") {
            setEditorCode(lastRunningCode);
        }
    }, [editorCode])

    return (
        <>
            <Meta title='Draft'/>
            <Editor/>
        </>
        
    )
}

export default Draft;
