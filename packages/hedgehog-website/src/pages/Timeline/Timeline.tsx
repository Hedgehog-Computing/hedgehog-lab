import {Favorite, FavoriteBorderOutlined} from "@mui/icons-material";
import {Avatar, Box, Card, CardContent, Divider, Grid, Link, Pagination, Stack, Typography,} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import {grey} from "@mui/material/colors";
import React, {useCallback} from "react";
import {Link as RouteLink} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import {formatDate} from "../../components/Snippet/List/SnippetList";
import {http} from "../../network/http";
import EditorLoading from "../../components/Base/Editor/Loading";
import Meta from '../../components/Meta/Meta';

const Timeline = () => {
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const {auth} = useAuth()
    const timeLineUrl = auth.accessToken && `/users/timeline?token=${auth.accessToken}&skip=0&take=10&currentPage=${currentPage}`
    const {data, error} = useSWR(timeLineUrl, fetcher, {refreshInterval: 1000})

    const handleLike = useCallback((snippetId: string) => {
        setLoading(true)
        http.post('/snippets/like', {snippetId: snippetId, token: auth.accessToken})
            .then(() => {
                console.log('action success')
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
            setLoading(false)
        })
    }, [auth.accessToken])

    const isCurrentUserLike = (snippetLike?: []) => {
        return snippetLike ? snippetLike?.find(like => like['userId'] === auth.user.id) : false
    }

    return (
        <>
            <Meta title='Timeline'/>
            {(data && data.response.result) ? data.response.result.data.map((item: any, index: number) => {
                return (
                    <>
                        <Box key={index}>
                            <>
                                <Stack direction="row" alignItems={"center"} spacing={1}>
                                    <Avatar/>
                                    <Box>
                                        <Link component={RouteLink} to={`/u/${item.user.username}`} color={"initial"}>
                                            <Typography component="span" fontWeight={"bold"}>
                                                {item.user.username}
                                            </Typography>
                                        </Link>

                                        <Typography component="span" sx={{mx: "5px"}}>
                                            {item.action}
                                        </Typography>

                                        {item.snippet?.user.username ? <Link component={RouteLink}
                                                                             to={`/s/${item.snippet?.user.username}/${item.snippet?.title}`}
                                                                             color={"initial"}>
                                            <Typography component="span" fontWeight={"bold"}>
                                                {item.snippet?.user.username}/{item.snippet?.title}
                                            </Typography>
                                        </Link> : <Typography component="span" fontWeight={"bold"} color={'error'}>
                                            Deleted Snippet
                                        </Typography>}

                                        <Typography
                                            component="span"
                                            sx={{ml: "5px"}}
                                            fontWeight={"light"}
                                            variant="body2"
                                        >
                                            {formatDate(item.updatedAt)}
                                        </Typography>
                                    </Box>
                                </Stack>

                                {item.snippet?.user.username &&
                                    <Card variant="outlined" sx={{mt: "5px", ml: 4, bgcolor: grey[50]}}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={12} md={10}>
                                                    <Box>
                                                        <Link
                                                            component={RouteLink}
                                                            to={`/s/${item.snippet?.user.username}/${item.snippet?.title}`}
                                                            color={"initial"}
                                                        >
                                                            <Typography
                                                                fontWeight={"bold"}>{item.snippet?.user.username}/{item.snippet?.title}</Typography>
                                                        </Link>

                                                        <Typography variant="body2">
                                                            {item.snippet?.description}
                                                        </Typography>

                                                        <Stack direction="row" alignItems={"center"} spacing={1} mt={1}>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{display: "flex", alignItems: "center"}}
                                                            >
                                                                <FavoriteBorderOutlined
                                                                    fontSize="small"
                                                                    sx={{mr: "5px", mt: '4px'}}
                                                                />{" "}
                                                                {item.snippet?._count.snippetLike}
                                                            </Typography>

                                                            <Typography
                                                                variant="body2">{formatDate(item.snippet?.updatedAt)}</Typography>
                                                        </Stack>
                                                    </Box>
                                                </Grid>

                                                <Grid item xs={12} md={2}>
                                                    <Box sx={{textAlign: "right"}}>
                                                        <LoadingButton
                                                            color="inherit"
                                                            variant="outlined"
                                                            loading={loading}
                                                            loadingPosition="start"
                                                            onClick={() => handleLike(item.snippet?.id)}
                                                            startIcon={isCurrentUserLike(item.snippet?.snippetLike)
                                                                ? <Favorite/>
                                                                : <FavoriteBorderOutlined/>}
                                                        >
                                                            Like
                                                        </LoadingButton>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>}
                            </>
                        </Box>
                        <Divider sx={{my: 2}}/>
                    </>
                );
            }) : <EditorLoading/>}

            {(data && data.response.result) && data.response.result.data.length > 0 && (
                <Box sx={{display: "flex", justifyContent: "center"}}>
                    <Pagination
                        count={data?.response?.meta?.count && Math.ceil(data?.response?.meta?.count / 10)}
                        page={currentPage} onChange={(e, value) => {
                        setCurrentPage(value)
                    }}/>
                </Box>
            )}

            {((data && data.response.result) && data.response.result.data.length === 0) && (
                <>
                    <Typography variant="h6">
                        You have not follow any user yet.
                    </Typography>
                </>
            )}
        </>
    );
};

export default Timeline;
