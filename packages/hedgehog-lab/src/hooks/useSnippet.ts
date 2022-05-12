import {http} from "../network/http";
import {useRecoilState} from "recoil";
import {dialogState} from "../states/RSnippetStates";
import {useCallback, useState} from "react";

interface ICreateSnippet {
    title: string;
    content: string;
    description?: string,
}

interface IUpdateSnippet {
    id: string;
    title: string;
    content: string;
    description?: string,
}

export const useSnippet = () => {
    const [createDialog, setCreateDialog] = useRecoilState(dialogState)
    const [createLoading, setCreateLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const createSnippet = useCallback((data: ICreateSnippet) => {
        setCreateLoading(true)
        return http.post('snippets/create', data).finally(() => setCreateLoading(false))
    }, [])

    const updateSnippet = useCallback((data: IUpdateSnippet) => {
        setUpdateLoading(true)
        return http.post('snippets/update', data).finally(() => setUpdateLoading(false))
    }, [])

    return {createSnippet, createDialog, setCreateDialog, createLoading, setCreateLoading, updateSnippet, updateLoading}
};
