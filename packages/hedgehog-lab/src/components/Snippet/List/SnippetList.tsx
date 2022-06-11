import {Favorite, FavoriteBorderOutlined, LocalFireDepartmentOutlined,} from "@mui/icons-material";
import {
    Box,
    CardActionArea,
    Chip,
    Divider,
    Grid,
    Link,
    Paper,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, {useCallback, useState} from "react";
import {atomOneLight, CopyBlock} from "react-code-blocks";
import {Link as RouterLink, useMatch} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {useAuth} from "../../../hooks/useAuth";
import {searchState, showCodeBlockState, snippetsState} from "../../../states/RSnippetStates";
import SharePopup from "../../Share/SharePopup";
import DeletePopup from "../Delete/DeletePopup";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {http} from "../../../network/http";
import {LoadingButton} from "@mui/lab";
import UpdatedSnippet from "../UpdatedSnippet";
import {grey, red} from "@mui/material/colors";
import {kFormatter} from "../../../utils/kFormatter";

dayjs.extend(relativeTime)

export const formatDate = (date: string) => {
    return dayjs(date).fromNow()
}

export interface ISnippetsProps {
    id: string
    title: string;
    description: string;
    content: string;
    loadingTimes: number;
    user: {
        username: string;
    };
    visibility: string;
    createdAt: string;
    updatedAt: string;
    _count: {
        snippetLike: number
    }
    snippetLike: ISnippetLikeProps[],
    userId: string
}

interface ISnippetLikeProps {
    userId: string
}

interface ISnippetListProps {
    snippets: ISnippetsProps[];
}

const SnippetList: React.FC<ISnippetListProps> = (props) => {
    const showCodeBlock = useRecoilValue(showCodeBlockState);
    const {isMe, auth} = useAuth();
    const [search, setSearch] = useRecoilState(searchState);
    const [likeLoading, setLikeLoading] = useState(false)
    const [snippets, setSnippets] = useRecoilState(snippetsState)
    const isExplorePage = useMatch('/explore')
    const theme = useTheme()
    const isPhoneMedia = useMediaQuery(theme.breakpoints.down("md"));
    const handleLikeSnippet = useCallback((snippetId: string, count: number) => {
        setLikeLoading(true)
        http.post('/snippets/like', {snippetId: snippetId, token: auth.accessToken})
            .then((res) => {
                if (res.data.message === 'Snippet liked') {
                    setLikeButton(snippetId, count)
                } else {
                    setDislikeButton(snippetId, count)
                }
            })
            .catch(err => {
                console.log(err)
            }).finally(() => {
            setLikeLoading(false)
        })
    }, [auth.accessToken])

    const isCurrentUserLike = (snippetLike?: ISnippetLikeProps[]) => {
        return snippetLike ? snippetLike?.find(like => like.userId === auth.user.id) : false
    }

    const setLikeButton = (snippetId: string, count: number) => {
        const newSnippets = JSON.parse(JSON.stringify(snippets));
        const res = newSnippets.map((item: ISnippetsProps) => {
            if (item.id === snippetId) {
                item.snippetLike = [{userId: auth.user.id}]
                item._count.snippetLike = count + 1
            }
            return item
        })

        setSnippets(snippets => res)
    }

    const setDislikeButton = (snippetId: string, count: number) => {
        const newSnippets = JSON.parse(JSON.stringify(snippets));
        const res = newSnippets.map((item: ISnippetsProps) => {
            if (item.id === snippetId) {
                item.snippetLike = []
                item._count.snippetLike = count - 1

            }
            return item
        })

        setSnippets(snippets => res)
    }

    return (
        <>
            {snippets.map((item: ISnippetsProps, index: number) => {
                return (
                    <Box key={index}>
                        <Grid container display={"flex"} justifyContent={"space-between"}
                              spacing={isExplorePage ? 0 : 1}>
                            <Grid item>
                                <Box alignItems={"center"} display={"flex"} sx={{
                                    textOverflow: 'ellipsis',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <Link
                                        component={RouterLink}
                                        variant={"body1"}
                                        to={"/u/" + item.user?.username}
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {item.user?.username}
                                    </Link>

                                    <span style={{margin: " 0 2px"}}>/</span>

                                    <Link
                                        component={RouterLink}
                                        variant={"body1"}
                                        to={`/s/${item.user?.username}/${item.title}`}
                                        sx={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.title}
                                    </Link>
                                </Box>
                            </Grid>

                            <Grid item>
                                <Stack direction={(isPhoneMedia && !isExplorePage) ? 'column' : 'row'} spacing={1}>
                                    <Stack spacing={1} direction={'row'} display={'flex'} alignItems={'center'}>
                                        <Chip variant={'outlined'} label={`${kFormatter(item.loadingTimes * 14)} hot`}
                                              icon={<LocalFireDepartmentOutlined fontSize={'small'}/>}
                                              sx={{
                                                  height: 24,
                                                  '& .MuiChip-icon': {
                                                      color: red[500]
                                                  }
                                              }}/>
                                        <Chip variant={"outlined"} label={item.visibility} sx={{
                                            height: 24,
                                            fontSize: "0.8125rem",
                                        }}/>
                                        {!(isExplorePage && search.text) && (<LoadingButton
                                            disabled={!auth.user.username}
                                            loading={likeLoading}
                                            onClick={() => {
                                                handleLikeSnippet(item.id, item._count?.snippetLike)
                                            }}
                                            variant={'contained'}
                                            size="small"
                                            sx={{
                                                bgcolor: grey[300], height: 24, color: '#000',
                                                '&:hover': {
                                                    bgcolor: grey[400]
                                                }
                                            }}
                                            startIcon={isCurrentUserLike(item?.snippetLike)
                                                ? <Favorite/>
                                                : <FavoriteBorderOutlined/>}
                                        >
                                            {item._count?.snippetLike} liked
                                        </LoadingButton>)}
                                    </Stack>

                                    <Stack spacing={1} direction={'row'}>
                                        {isMe && <UpdatedSnippet id={item.id} content={item.content}/>}

                                        <SharePopup size="small"
                                                    type={'icon'}
                                                    script={`import @${item.user?.username}/${item.title}`}
                                                    embed={`https://hlab.app/s/${item.user?.username}/${item.title}`}
                                                    url={`https://hlab.app/s/${item.user?.username}/${item.title}`}/>

                                        {isMe && <DeletePopup size="small"
                                                              snippet={{name: item.title, id: item.id}}/>}
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>

                        <Box>
                            <Typography variant={"body2"}>
                                {formatDate(item.updatedAt)} <br/>

                                {item.description}
                            </Typography>

                            {showCodeBlock && (
                                <Paper elevation={0} sx={{mt: 1}} variant={"outlined"}>
                                    <CardActionArea component={RouterLink}
                                                    to={`/s/${item.user?.username}/${item.title}`}>
                                        <Box
                                            sx={{
                                                "& button": {
                                                    display: "none",
                                                },
                                                '& div': {
                                                    p: 1,
                                                },
                                            }}
                                        >
                                            <CopyBlock
                                                text={item?.content && item?.content.slice(0, 200)}
                                                language={"javascript"}
                                                theme={atomOneLight}
                                            />
                                        </Box>
                                    </CardActionArea>
                                </Paper>
                            )}
                        </Box>

                        <Divider sx={{my: "20px"}}/>
                    </Box>
                );
            })}
        </>
    );
};

export default SnippetList;
