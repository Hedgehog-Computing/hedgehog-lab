import {Alert, Box, Dialog, DialogContent, DialogTitle, Divider, IconButton, Paper, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import {useSnippet} from "../../hooks/useSnippet";
import {CloseOutlined} from "@mui/icons-material";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import SnippetNameInput from "../Base/Input/Snippet/Name/SnippetNameInput";
import {atomOneLight, CodeBlock} from "react-code-blocks";
import {useEditor} from "../../hooks/useEditor";
import SnippetDescriptionInput from "../Base/Input/Snippet/Description/SnippetDescriptionInput";
import * as yup from "yup";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {LoadingButton} from "@mui/lab";

export interface ICreateSnippetInput {
    title: string,
    description: string,
}

export const createSnippetRule = yup.object({
    title: yup.string().required("Name is required"),
    description: yup.string(),
}).required();

const CreateSnippetDialog = () => {
    const {createDialog, setCreateDialog, createSnippet, setCreateLoading, createLoading} = useSnippet()
    const {editorCode} = useEditor()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const {auth} = useAuth()

    const useFormMethods = useForm<ICreateSnippetInput>({
        resolver: yupResolver(createSnippetRule)
    })

    const onSubmit: SubmitHandler<ICreateSnippetInput> = useCallback(async (data) => {
        try {
            const res = await createSnippet({
                title: data.title,
                description: data.description,
                content: editorCode,
                token: auth.accessToken,
                authorId: auth.user.id,
                versions: 1,
                visibility: 'public'
            });

            setCreateDialog({open: false})
            const {title} = res.data

            navigate(`/s/${auth.user.username}/${title}`)
        } catch (e) {
            setError(e.response.data.message)
            console.log(e.response.data.message)
        }
    }, [auth.accessToken, auth.user.username, auth.user.id, createSnippet, editorCode, navigate, setCreateDialog])


    return (
        <Dialog open={createDialog.open} fullWidth onClose={(event, reason) => {
            if (reason !== "backdropClick") {
                setError('')
                setCreateDialog({open: false})
            }
        }}>
            <DialogTitle>
                <Typography variant={"h6"} component={"p"} sx={{fontWeight: "bold"}}>
                    Save a new snippet
                </Typography>

                <IconButton
                    aria-label="close"
                    onClick={() => {
                        setCreateDialog({open: false})
                    }}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseOutlined/>
                </IconButton>
            </DialogTitle>

            <DialogContent>
                {error.length > 0 && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {Array.isArray(error) ? error.map((message, index) => (
                            <Box key={index} sx={{textAlign: 'left'}}>{message}</Box>
                        )) : error}
                    </Alert>
                )}

                <FormProvider {...useFormMethods} >
                    <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                        <SnippetNameInput/>

                        <Box mt={1}>
                            <SnippetDescriptionInput/>
                        </Box>

                        <Box textAlign={"right"} mt={1}>
                            <LoadingButton disabled={!editorCode} loading={createLoading} type={"submit"} sx={{mt: 2}}
                                           variant={'contained'}>
                                Submit
                            </LoadingButton>
                        </Box>
                    </form>
                </FormProvider>

                <Divider sx={{mt: 2}}/>


                <Typography variant={"h6"} component={"p"} sx={{fontWeight: "bold", mt: 1}}>
                    Code Preview(excerpt)*
                </Typography>

                {!editorCode && (
                    <Alert severity={'error'} sx={{my: 1}}>Content should not be empty</Alert>
                )}

                <Paper variant={'outlined'}>
                    <CodeBlock text={editorCode.slice(0, 200)}
                               language={"javascript"}
                               theme={atomOneLight}/>
                </Paper>
            </DialogContent>
        </Dialog>
    )
}

export default CreateSnippetDialog
