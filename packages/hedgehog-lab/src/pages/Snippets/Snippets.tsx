import {Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import React from "react";
import Snippet from "../../components/Snippet/Snippet";
import {Link as RouterLink, useMatch} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useRecoilValue} from "recoil";
import {userMetaState} from "../../states/RSnippetStates";

const Snippets = (): React.ReactElement => {
    const {auth} = useAuth()
    const currentUser = useMatch('/u/:userId')
    const currentUserLikes = useMatch('/u/:userId/likes')
    const name = currentUser?.params.userId ?? currentUserLikes?.params.userId
    const userMeta = useRecoilValue(userMetaState)

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} variant="outlined">
                        <CardContent>
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
                                    x Liked Snippets
                                </Link>
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
