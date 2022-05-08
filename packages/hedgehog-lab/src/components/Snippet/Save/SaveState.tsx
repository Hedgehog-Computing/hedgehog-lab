import {Alert, Box, Checkbox, Chip, Tooltip,} from "@mui/material";
import {CircleOutlined, MotionPhotosAuto,} from "@mui/icons-material";
import React, {useCallback, useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {codeSavingFlagState} from "../../../states/RYourCodeStates";
import {compilerLiveModeState} from "../../../states/RCompilerStates";
import BasePopupText from "../../Base/Popup/BasePopupText";
import {authDialogState} from "../../../states/RUserStates";
import {useAuth} from "../../../hooks/useAuth";
import {useMatch, useNavigate} from "react-router-dom";
import {useSnippet} from "../../../hooks/useSnippet";
import CreateSnippetDialog from "../CreateSnippetDialog";
import {useEditor} from "../../../hooks/useEditor";
import {useDebounce} from "react-use";
import SnippetNameInput from "../../Base/Input/Snippet/Name/SnippetNameInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEditorMeta} from "../../../hooks/useEditorMeta";
import * as yup from "yup";
import {LoadingButton} from "@mui/lab";

interface IUpdateSnippetInput {
    title: string,
    description?: string,
}

const updateSnippetRule = yup.object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
}).required();

const SaveState = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue(codeSavingFlagState);
    const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
        compilerLiveModeState
    );

    const [updateError, setUpdateError] = React.useState<string | null>(null);

    const liveMode = localStorage.getItem("liveMode") ?? "off";

    useEffect(() => {
        if (liveMode === "on") {
            setCompilerLiveMode("on");
        } else {
            setCompilerLiveMode("off");
        }
    }, [liveMode, setCompilerLiveMode]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const liveMode = event.target.checked ? "on" : "off";
        setCompilerLiveMode(liveMode);
        localStorage.setItem("liveMode", liveMode);
    };

    const [authDialog, setAuthDialog] = useRecoilState(authDialogState);

    const {auth} = useAuth();

    const navigate = useNavigate()
    const {editorMeta, setEditorMeta} = useEditorMeta()

    const isAuthSnippetPage = useMatch(`/s/:userID/:snippetID`)?.params
    const {setCreateDialog, updateSnippet, updateLoading} = useSnippet()
    const {editorCode} = useEditor()

    const useFormMethods = useForm<IUpdateSnippetInput>({
        resolver: yupResolver(updateSnippetRule)
    })


    const update = useCallback(() => {
        if ((auth.isAuthenticated && isAuthSnippetPage?.userID === auth.user.username) && editorMeta.id) {
            updateSnippet({
                id: editorMeta?.id,
                title: editorMeta.title,
                description: editorMeta.description,
                content: editorCode
            }).then(r => console.log(r))
        }
    }, [, auth.isAuthenticated, auth.user.username, editorCode, editorMeta.description, editorMeta?.id, editorMeta.title, isAuthSnippetPage?.userID, updateSnippet])

    const onSubmit: SubmitHandler<IUpdateSnippetInput> = useCallback(async (data) => {
        updateSnippet({
            id: editorMeta?.id,
            title: data.title,
            content: editorCode
        }).then(r => {
            setUpdateError(null)
            setEditorMeta({...editorMeta, title: data.title})
            navigate(`/s/${auth.user.username}/${data.title}`)
        }).catch(e => setUpdateError(e.response.data.message))
    }, [auth.accessToken, auth.user.username, editorCode, editorMeta, navigate, setEditorMeta, updateSnippet])


    const [] = useDebounce(
        () => {
            if (editorMeta.id) {
                update();
            }

        },
        1000,
        [editorCode]
    );

    return (
        <Box
            sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {editorMeta.title ? (
                <Box
                    sx={{
                        cursor: "pointer",
                        "&:hover": {
                            textDecoration: "underline",
                        },
                    }}
                >
                    <BasePopupText text={editorMeta.title ? `${editorMeta.title}` : 'File Name'}>
                        <Box sx={{display: "grid", p: 1}}>
                            {updateError && (
                                <Alert severity="error" sx={{mb: 2}}>
                                    {updateError}
                                </Alert>
                            )}

                            <FormProvider {...useFormMethods} >
                                <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                                    <SnippetNameInput size={'small'} value={editorMeta.title}/>

                                    <Box textAlign={'right'} mt={1}>
                                        <LoadingButton loading={updateLoading} type={'submit'} variant={'contained'}
                                                       size={'small'}>Submit</LoadingButton>
                                    </Box>
                                </form>
                            </FormProvider>
                        </Box>
                    </BasePopupText>


                </Box>
            ) : (<Box sx={{cursor: 'pointer'}} onClick={() => setCreateDialog({open: true})}>New File</Box>)}

            {codeSavingFlag ? "*" : ""}

            <Tooltip title="Live Mode" arrow>
                <Checkbox
                    checked={compilerLiveMode === "on"}
                    onChange={handleChange}
                    size="small"
                    icon={<CircleOutlined/>}
                    checkedIcon={<MotionPhotosAuto/>}
                />
            </Tooltip>

            {(!auth.isAuthenticated || isAuthSnippetPage?.userID !== auth.user.username) && (
                <Chip
                    label={!auth.isAuthenticated ? `Login to get sync` : `Save to your cloud`}
                    size="small"
                    color="warning"
                    sx={{cursor: "pointer"}}
                    onClick={() => !auth.isAuthenticated ? setAuthDialog(true) : setCreateDialog({open: true})}
                />
            )}

            <CreateSnippetDialog/>
        </Box>
    );
};

export default SaveState;

