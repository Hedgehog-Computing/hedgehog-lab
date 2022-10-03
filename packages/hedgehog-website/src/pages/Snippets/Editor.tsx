import React, {useEffect} from "react";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import Editor from "../../components/Base/Editor/Editor";
import EditorLoading from "../../components/Base/Editor/Loading";
import Meta from '../../components/Meta/Meta';
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../states/RLayoutStates";
import {compilerLiveModeState} from "../../states/RCompilerStates";

interface IEditor{
    defaultLiveMode?: boolean,
    defaultFullScreen?: boolean
}

export interface ISource extends IEditor{
    source: string,
}

export interface IUserSnippet extends IEditor{
    // @username/snippet
    userSnippet: string,
}

export type ISnippetEditor = ISource | IUserSnippet


const SnippetEditor: React.FC<ISnippetEditor> = (props)=> {
    const {defaultFullScreen, defaultLiveMode} = props;
    const {source, userSnippet} = props as ISource & IUserSnippet;

    const {data} = useEditorMeta(userSnippet ?? null)
    const {setEditorCode} = useEditor();
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(resultFullScreenState);
    const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
        compilerLiveModeState
    );

    useEffect(()=>{
        if (defaultFullScreen) {
            setResultFullScreen(defaultFullScreen ? true: false);
        }

        if (defaultLiveMode) {
            setCompilerLiveMode(defaultLiveMode ? "on": "off");
        }
    }, [defaultFullScreen, defaultLiveMode, setCompilerLiveMode, setResultFullScreen])

    useEffect(() => {
        if (data?.response?.result?.content && !source) {
            setEditorCode(data?.response?.result?.content ?? '')
        }

        if (source) {
            setEditorCode(source)
        }
    }, [data])

    return (
        <>
            <Meta title='Snippets' />
            {data ? <Editor/> : <EditorLoading/>}
        </>
    );
};

export default SnippetEditor;
