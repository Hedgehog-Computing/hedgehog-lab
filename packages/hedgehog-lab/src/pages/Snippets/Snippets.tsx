import {Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import React, {useCallback, useState} from "react";
import Snippet from "../../components/Snippet/Snippet";
import {Link as RouterLink, useMatch} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useRecoilValue} from "recoil";
import {userMetaState} from "../../states/RSnippetStates";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import {http} from "../../network/http";
import {LoadingButton} from "@mui/lab";

const Snippets = (): React.ReactElement => {
    const [followLoading, setFollowLoading] = useState(false);

    const {auth, isMe, isMeLike} = useAuth()
    const currentUser = useMatch('/u/:userId')
    const currentUserLikes = useMatch('/u/:userId/likes')
    const name = currentUser?.params.userId ?? currentUserLikes?.params.userId
    const userMeta = useRecoilValue(userMetaState)


    const currentUserName = currentUser?.params.userId ?? currentUserLikes?.params.userId

    const handleFollow = useCallback((): void => {
        setFollowLoading(true)
        http.post(`users/follow`, {
            token: auth.accessToken,
            followingName: currentUserName
        }).finally(() => setFollowLoading(false))
    }, [auth.accessToken, currentUserName])

    const handleUnFollow = useCallback((): void => {
        setFollowLoading(true)
        http.post(`users/unfollow`, {
            token: auth.accessToken,
            followingName: currentUserName
        }).finally(() => setFollowLoading(false))
    }, [auth.accessToken, currentUserName])

    const isFollowingUrl = `/users/isFollowing?token=${auth.accessToken}&userName=${currentUserName}`

    const {data, error} = useSWR(isFollowingUrl, fetcher, {refreshInterval: 1000})

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
                                </Box>

                                <Box>
                                    {(!isMe && !isMeLike && auth.accessToken) &&
                                    data
                                        ? <LoadingButton loading={followLoading} variant={"contained"} color={'error'}
                                                         onClick={handleUnFollow}>UnFollow</LoadingButton>
                                        : <LoadingButton loading={followLoading} variant={"outlined"}
                                                         onClick={handleFollow}>Follow</LoadingButton>
                                    }
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
