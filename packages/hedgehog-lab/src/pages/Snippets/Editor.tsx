import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import Editor from "../../components/Base/Editor/Editor";
import EditorLoading from "../../components/Base/Editor/Loading";

const SnippetEditor = (): React.ReactElement => {
    const {data} = useEditorMeta()
    const {setEditorCode} = useEditor();

    useEffect(() => {
        if (data?.response?.result?.content) {
            setEditorCode(data?.response?.result?.content ?? '')
        }
    }, [data])

    return (
        <>
            {data ? <Editor/> : <EditorLoading/>}
        </>
    );
};

export default SnippetEditor;
