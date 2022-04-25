import {Box, Card, CardContent, Grid, Link, Typography} from "@mui/material";
import React from "react";
import Snippet from "../../components/Snippet/Snippet";
import {Link as RouterLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";

const Snippets = (): React.ReactElement => {
    const {auth} = useAuth()

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
                    <Card elevation={0} variant="outlined">
                        <CardContent>
                            <Typography variant="h5" fontWeight={"bold"}>
                                {auth.user.firstname}
                            </Typography>

                            <Box sx={{mt: 1}}>
                                <Link component={RouterLink} to={`/u/${auth.user.firstname}`}>
                                    394 Snippets
                                </Link>
                            </Box>
                            <Box>
                                <Link component={RouterLink} to={`/u/${auth.user.firstname}/likes`}>
                                    43 Liked Snippets
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
