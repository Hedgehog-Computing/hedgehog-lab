import {Box, Card, TextField, Typography} from "@mui/material";
import React, {useCallback, useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {http} from "../../../network/http";
import {useAuth} from "../../../hooks/useAuth";
import {usePopupState} from "material-ui-popup-state/hooks";
import {useRecoilState} from "recoil";
import {snippetsState} from "../../../states/RSnippetStates";
import {ISnippetsProps} from "../List/SnippetList";

export interface IDeleteAlertProps {
    snippet: {
        name: string;
        id: string
    }
}

const DeleteAlert: React.FC<IDeleteAlertProps> = (props): React.ReactElement => {
    const [typedName, setTypedName] = React.useState<string>('');
    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const {auth} = useAuth()
    const [snippets, setSnippets] = useRecoilState(snippetsState)

    const popupState = usePopupState({
        variant: "popover",
        popupId: "deletePopup",
    });

    const handleOnchange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setTypedName(event.target.value);
    }, [typedName])

    const handleDelete = useCallback(() => {
        !typedName && setError('Please type the name of the snippet')
        typedName !== props.snippet.name ? setError('The name is not correct') : deleteSnippet()
    }, [typedName])

    const deleteSnippet = useCallback(() => {
        setLoading(true)

        http.post('/snippets/delete', {
            id: props.snippet.id,
            token: auth.accessToken
        }).then(() => popupState.close).finally(() => {
            setLoading(false)

            const newSnippets = JSON.parse(JSON.stringify(snippets));
            const res = newSnippets.filter((item: ISnippetsProps) => {
                return item.id !== props.snippet.id
            })
            setSnippets(snippets => res)
        })

    }, [typedName])

    useEffect(() => {
        setError('')
    }, [typedName])

    return (
        <Card>
            <Box m={1}>
                <Typography variant={'body2'}>
                    Are you positive you want to delete the
                    <Typography component={"span"} fontWeight={'bold'} sx={{mx: 1}}>*{props.snippet.name}*</Typography>
                    Snippet?
                </Typography>

                <TextField
                    placeholder={"Enter the name of the snippet"}
                    fullWidth
                    size={'small'}
                    sx={{my: 1}}
                    value={typedName}
                    onChange={handleOnchange}
                    error={!!error}
                    helperText={error}
                />

                <Box sx={{textAlign: 'right'}}>
                    <LoadingButton loading={loading} size="small" variant={'contained'} color={"error"}
                                   onClick={handleDelete}>
                        Delete
                    </LoadingButton>
                </Box>
            </Box>
        </Card>
    );
};

export default DeleteAlert;
