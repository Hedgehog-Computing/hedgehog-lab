import {useRecoilState, useResetRecoilState} from "recoil";
import {editorCodeState, editorMetaState} from "../states/RYourCodeStates";
import {useMatch, useNavigate} from "react-router-dom";
import useSWR from "swr";
import {fetcher} from "../network/fetcher";
import {useEffect} from "react";
import {useAuth} from "./useAuth";

export const useEditorMeta = () => {
    const [editorMeta, setEditorMeta] = useRecoilState(editorMetaState);
    const resetEditorMeta = useResetRecoilState(editorMetaState);
    const resetEditorCode = useResetRecoilState(editorCodeState)
    const {auth} = useAuth()
    const isUserSnippetPage = useMatch(`/s/:userID/:snippetID`)

    let URL
    let currentFilePath: string

    if (isUserSnippetPage) {
        const {userID, snippetID} = isUserSnippetPage?.params
        URL = `/snippets?user=${userID}&title=${snippetID}`
        currentFilePath = `/s/${userID}/${snippetID}`
    }


    const navigate = useNavigate()
    // eslint-disable-next-line prefer-const
    let {data, error} = useSWR([URL], fetcher, {revalidateOnFocus: false})
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
        if (data?.response?.result) {
            const res = data.response.result
            setEditorMeta({title: res.title, id: res.id, currentFile: currentFilePath})
        }
    }, [data, resetEditorMeta, setEditorMeta])

    return {isUserSnippetPage, data, error, editorMeta, setEditorMeta}
};
