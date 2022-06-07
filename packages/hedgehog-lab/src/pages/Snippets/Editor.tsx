import React from "react";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import Editor from "../../components/Base/Editor/Editor";
import {useEffectOnce} from "react-use";

const SnippetEditor = (): React.ReactElement => {
    const {data} = useEditorMeta()
    const {setEditorCode} = useEditor();

    useEffectOnce(() => {
        if (data?.response?.result?.content) {
            setEditorCode(data?.response?.result?.content ?? '')
        }
    })

    return (
        <>
            <Editor/>
        </>
    );
};

export default SnippetEditor;
