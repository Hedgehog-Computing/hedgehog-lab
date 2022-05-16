import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import React, {useCallback, useEffect} from "react";
import * as yup from "yup";
import {useSnippet} from "../../hooks/useSnippet";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import {useMatch, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {Alert, Box, IconButton} from "@mui/material";
import SnippetNameInput from "../Base/Input/Snippet/Name/SnippetNameInput";
import SnippetDescriptionInput from "../Base/Input/Snippet/Description/SnippetDescriptionInput";
import {LoadingButton} from "@mui/lab";
import BasePopupText from "../Base/Popup/BasePopupText";
import {yupResolver} from "@hookform/resolvers/yup";
import {DriveFileRenameOutline} from "@mui/icons-material";
import {useSWRConfig} from "swr";
import {useRecoilState} from "recoil";
import {snippetsState} from "../../states/RSnippetStates";
import {ISnippetsProps} from "./List/SnippetList";

interface IUpdateSnippetInput {
    title: string,
    description?: string,
}

const updateSnippetRule = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
}).required();

interface IUpdateSnippetProps {
    id?: string,
    content?: string,
}

const UpdatedSnippet: React.FC<IUpdateSnippetProps> = (props) => {
    const [updateError, setUpdateError] = React.useState<string | null>(null);
    const {editorMeta, setEditorMeta} = useEditorMeta()
    const {editorCode} = useEditor()
    const {updateSnippet, updateLoading} = useSnippet()
    const navigate = useNavigate()
    const {auth} = useAuth();
    const {mutate} = useSWRConfig()
    const [snippets, setSnippets] = useRecoilState(snippetsState)

    const useFormMethods = useForm<IUpdateSnippetInput>({
        resolver: yupResolver(updateSnippetRule)
    })

    useEffect(() => {
        if (props.id) {
            setEditorMeta({id: props.id, title: "", description: ""})
        }
    }, [props.id])
    const isSnippetDetail = useMatch('/s/:userID/:snippetID')
    const onSubmit: SubmitHandler<IUpdateSnippetInput> = useCallback(async (data) => {
        updateSnippet({
            id: editorMeta?.id,
            title: data.title,
            description: data.description,
            content: props?.content ?? editorCode
        }).then(r => {
            setUpdateError(null)
            isSnippetDetail && setEditorMeta({...editorMeta, title: data.title})

            if (!isSnippetDetail) {
                const newSnippets = JSON.parse(JSON.stringify(snippets));
                const res = newSnippets.map((item: ISnippetsProps) => {
                    if (item.id === props.id) {
                        item.title = data.title;
                    }
                    return item
                })

                setSnippets(snippets => res)
            } else {
                navigate(`/s/${auth.user.username}/${data.title}`)
            }
        }).catch(e => setUpdateError(e.response.data.message))
    }, [auth.accessToken, auth.user.username, editorCode, editorMeta, navigate, setEditorMeta, updateSnippet])


    const text = isSnippetDetail ? (editorMeta.title ?? 'File Name') :
        (
            <IconButton size="small">
                <DriveFileRenameOutline/>
            </IconButton>
        )

    return (
        <BasePopupText text={text}>
            <Box sx={{display: "grid", p: 1}}>
                {updateError && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {updateError}
                    </Alert>
                )}

                <FormProvider {...useFormMethods} >
                    <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                        <SnippetNameInput size={'small'} value={editorMeta.title}/>

                        <Box mt={1}>
                            <SnippetDescriptionInput size={'small'} value={editorMeta.description}/>
                        </Box>

                        <Box textAlign={'right'} mt={1}>
                            <LoadingButton loading={updateLoading} type={'submit'}
                                           variant={'contained'}
                                           size={'small'}>Submit</LoadingButton>
                        </Box>
                    </form>
                </FormProvider>
            </Box>
        </BasePopupText>
    )
}

export default UpdatedSnippet
