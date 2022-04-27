import {useRecoilState, useResetRecoilState} from "recoil";
import {editorCodeState, editorMetaState} from "../states/RYourCodeStates";
import {useMatch, useNavigate} from "react-router-dom";
import useSWR from "swr";
import {fetcher} from "../network/fetcher";
import {useEffect} from "react";

export const useEditorMeta = () => {
    const [editorMeta, setEditorMeta] = useRecoilState(editorMetaState);
    const resetEditorMeta = useResetRecoilState(editorMetaState);
    const resetEditorCode = useResetRecoilState(editorCodeState)

    const isUserSnippetPage = useMatch(`/s/:userID/:snippetID`)

    let URL
    let currentFilePath: string

    if (isUserSnippetPage) {
        const {userID, snippetID} = isUserSnippetPage?.params
        URL = `/snippets?author=${userID}&title=${snippetID}`
        currentFilePath = `/s/${userID}/${snippetID}`
    }


    const navigate = useNavigate()
    const {data, error} = useSWR([URL], fetcher)

    const matchPage = useMatch('/:userID/:snippetID')
    useEffect(() => {
        if (error && matchPage) {
            resetEditorCode()
            resetEditorMeta()
            navigate('/')
        }
    }, [error, matchPage, navigate, resetEditorCode, resetEditorMeta])


    useEffect(() => {
        !data && resetEditorMeta()
        if (data) {
            setEditorMeta({title: data.title, id: data.id, currentFile: currentFilePath})
        }
    }, [data, resetEditorMeta, setEditorMeta])

    return {isUserSnippetPage, data, error, editorMeta}
};
