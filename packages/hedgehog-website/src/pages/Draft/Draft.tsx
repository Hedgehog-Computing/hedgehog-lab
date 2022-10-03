import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import Editor from "../../components/Base/Editor/Editor";
import Meta from '../../components/Meta/Meta';
import HedgehogLab from "@hedgehogcomputing/LAB/src/HedgehogLab";

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
            <HedgehogLab source={editorCode ?? lastRunningCode} defaultFullScreen={false} defaultLiveMode={true}/>
        </>
        
    )
}

export default Draft;
