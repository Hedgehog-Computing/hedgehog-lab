import {Favorite, FavoriteBorderOutlined,} from "@mui/icons-material";
import {Box, CardActionArea, Chip, Divider, Link, Paper, Typography,} from "@mui/material";
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

dayjs.extend(relativeTime)

export const formatDate = (date: string) => {
    return dayjs(date).fromNow()
}

export interface ISnippetsProps {
    id: string
    title: string;
    description: string;
    content: string;
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
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box alignItems={"center"} display={"flex"}>
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
                                    sx={{fontWeight: "bold"}}
                                >
                                    {item.title}
                                </Link>
                            </Box>

                            <Box display={'flex'} alignItems={'center'}>
                                <Chip variant={"outlined"} label={item.visibility} sx={{
                                    height: 24,
                                    fontSize: "0.8125rem",
                                    ml: 1,
                                }}/>

                                {!(isExplorePage && search.text) && (<LoadingButton
                                    disabled={!auth.user.username}
                                    loading={likeLoading}
                                    onClick={() => {
                                        handleLikeSnippet(item.id, item._count?.snippetLike)
                                    }}
                                    fullWidth
                                    size="small"
                                    sx={{color: "inherit"}}
                                    startIcon={isCurrentUserLike(item?.snippetLike)
                                        ? <Favorite/>
                                        : <FavoriteBorderOutlined/>}
                                >
                                    {item._count?.snippetLike} liked
                                </LoadingButton>)}

                                {/*{isMe && <UpdatedSnippet id={item.id} content={item.content}/>}*/}

                                <SharePopup size="small"
                                            script={`import ${item.user?.username}/${item.title}`}
                                            embed={`https://hlab.app/s/${item.user?.username}/${item.title}`}
                                            url={`https://hlab.app/s/${item.user?.username}/${item.title}`}/>

                                {isMe && <DeletePopup size="small"
                                                      snippet={{name: item.title, id: item.id}}/>}
                            </Box>
                        </Box>

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
