import {Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import Snippet from "../../components/Snippet/Snippet";
import {Link as RouterLink, useMatch} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useRecoilValue} from "recoil";
import {userMetaState} from "../../states/RSnippetStates";
import useSWR, {useSWRConfig} from "swr";
import {fetcher} from "../../network/fetcher";
import {http} from "../../network/http";
import {LoadingButton} from "@mui/lab";
import {ReactJSXElement} from "@emotion/react/types/jsx-namespace";
import {EditOutlined} from "@mui/icons-material";
import BasePopupButton from "../../components/Base/Popup/BasePopupButton";
import UserDescriptionInput from "../../components/Base/Input/Description/UserDescriptionInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";

interface IUpdateUserDescription {
    description: string
}

const Snippets = (): React.ReactElement => {
    const [followLoading, setFollowLoading] = useState(false);
    const {mutate} = useSWRConfig()

    const {auth, isMe, isMeLike} = useAuth()
    const currentUser = useMatch('/u/:userId')
    const currentUserLikes = useMatch('/u/:userId/likes')
    const name = currentUser?.params.userId ?? currentUserLikes?.params.userId
    const userMeta = useRecoilValue(userMetaState)


    const currentUserName = currentUser?.params.userId ?? currentUserLikes?.params.userId
    const isFollowingUrl = auth.isAuthenticated ? `/users/isFollowing?user=${currentUserName}&token=${auth.accessToken}` : null

    const handleFollow = useCallback((): void => {
        setFollowLoading(true)
        http.post(`users/follow`, {
            token: auth.accessToken,
            followingName: currentUserName
        }).then(() => mutate(isFollowingUrl)).finally(() => setFollowLoading(false))
    }, [auth.accessToken, currentUserName])

    const handleUnFollow = useCallback((): void => {
        setFollowLoading(true)
        http.post(`users/unfollow`, {
            token: auth.accessToken,
            followingName: currentUserName
        }).then(() => mutate(isFollowingUrl)).finally(() => setFollowLoading(false))
    }, [auth.accessToken, currentUserName])


    const {data, error} = useSWR(isFollowingUrl, fetcher)

    const FollowButton = (): ReactJSXElement => {
        if (name !== auth.user.username && auth.accessToken) {
            if (data && data?.response?.result) {
                return (
                    <LoadingButton loading={followLoading} variant={"contained"} color={'error'}
                                   onClick={handleUnFollow}>UnFollow</LoadingButton>
                )
            } else return (<LoadingButton loading={followLoading} variant={"outlined"}
                                          onClick={handleFollow}>Follow</LoadingButton>)
        } else {
            return <></>
        }
    }


    const [updateUserDescLoading, setUpdateUserDescLoading] = useState(false)
    const useFormMethods = useForm<IUpdateUserDescription>()
    const isUserSnippet = useMatch('/u/:userId')
    const isUserSnippetLike = useMatch('/u/:userId/likes')
    const onSubmit: SubmitHandler<IUpdateUserDescription> = useCallback(async (data) => {
        setUpdateUserDescLoading(true)
        try {
            await http.post('users/update-description', {description: data.description})

            const currentName = isUserSnippet?.params.userId ?? isUserSnippetLike?.params.userId ?? ''
            const snippetMetaUrl = `/snippets/meta?user=${currentName}`
            await mutate(snippetMetaUrl)
        } catch (e) {
            console.log(e.response.data.message)
        } finally {
            setUpdateUserDescLoading(false)
        }
    }, [])


    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} variant="outlined">
                        <CardContent>
                            <Box display={'flex'} justifyContent={'space-between'}>
                                <Box>
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        {name}
                                    </Typography>

                                    <Typography variant="body2" fontWeight={"bold"}
                                                sx={{display: 'flex', alignItems: 'center'}}>
                                        {userMeta.userInfo.description ?? 'no introduction'}
                                        {isMe && (
                                            <BasePopupButton type={'icon'} size={'small'}
                                                             icon={<EditOutlined fontSize={'small'}/>}>
                                                <Box p={1}>
                                                    <FormProvider {...useFormMethods} >
                                                        <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                                                            <UserDescriptionInput multiline size={'small'}/>

                                                            <Box textAlign={'right'} mt={1}>
                                                                <LoadingButton loading={updateUserDescLoading}
                                                                               type={"submit"}>
                                                                    Submit
                                                                </LoadingButton>
                                                            </Box>
                                                        </form>
                                                    </FormProvider>

                                                </Box>
                                            </BasePopupButton>)}

                                    </Typography>

                                    {userMeta && (
                                        <>
                                            <Box sx={{mt: 1}}>
                                                <Link component={RouterLink} to={`/u/${name}`}>
                                                    {userMeta.snippet.count} Snippets
                                                </Link>
                                            </Box>
                                            <Box>
                                                <Link component={RouterLink} to={`/u/${name}/likes`}>
                                                    {userMeta.snippet.liked} Liked Snippets
                                                </Link>
                                            </Box>
                                        </>
                                    )}
                                </Box>

                                <Box>
                                    <FollowButton/>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={9}>
                    <Snippet/>
                </Grid>
            </Grid>
        </>
    );
};

export default Snippets;
