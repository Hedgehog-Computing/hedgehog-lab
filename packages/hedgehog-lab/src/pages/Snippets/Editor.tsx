import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import Editor from "../../components/Base/Editor/Editor";

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
            <Editor/>
        </>
    );
};

export default SnippetEditor;
