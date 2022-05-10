import {Favorite, FavoriteBorderOutlined,} from "@mui/icons-material";
import {Box, CardActionArea, Chip, Divider, Link, MenuItem, Paper, Select, Typography,} from "@mui/material";
import React, {useCallback, useState} from "react";
import {atomOneLight, CopyBlock} from "react-code-blocks";
import {Link as RouterLink} from "react-router-dom";
import {useRecoilState, useRecoilValue} from "recoil";
import {useAuth} from "../../../hooks/useAuth";
import {showCodeBlockState, snippetsState} from "../../../states/RSnippetStates";
import SharePopup from "../../Share/SharePopup";
import DeletePopup from "../Delete/DeletePopup";
import RenameDialog from "../Rename/RenameDialog";
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
    const [likeLoading, setLikeLoading] = useState(false)
    const [snippets, setSnippets] = useRecoilState(snippetsState)
    const handleLikeSnippet = useCallback((snippetId: string) => {
        setLikeLoading(true)
        http.post('/snippets/like', {snippetId: snippetId, token: auth.accessToken})
            .then((res) => {
                console.log(res)
                if (res.data.message === 'Snippet liked') {
                    setLikeButton(snippetId)
                } else {
                    setDislikeButton(snippetId)
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

    const setLikeButton = (snippetId: string) => {
        const newSnippets = JSON.parse(JSON.stringify(snippets));
        const res = newSnippets.map((item: ISnippetsProps) => {
            if (item.id === snippetId) {
                item.snippetLike = [{userId: auth.user.id}]
                item._count.snippetLike += 1
            }
            return item
        })

        setSnippets(res)
    }

    const setDislikeButton = (snippetId: string) => {
        const newSnippets = JSON.parse(JSON.stringify(snippets));
        const res = newSnippets.map((item: ISnippetsProps) => {
            if (item.id === snippetId) {
                item.snippetLike = []
                item._count.snippetLike -= 1
            }
            return item
        })

        setSnippets(res)
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
                                {isMe ? (
                                    <Select
                                        fullWidth
                                        value={item.visibility}
                                        size="small"
                                        sx={{
                                            height: 24,
                                            fontSize: "0.8125rem",
                                            ml: 1,
                                        }}
                                    >
                                        <MenuItem dense value={"public"}>
                                            Public
                                        </MenuItem>
                                        <MenuItem dense value={"private"}>
                                            Private
                                        </MenuItem>
                                    </Select>
                                ) : (
                                    <Chip variant={"outlined"} label={item.visibility} sx={{
                                        height: 24,
                                        fontSize: "0.8125rem",
                                        ml: 1,
                                    }}/>
                                )}

                                <LoadingButton
                                    disabled={!auth.user.username}
                                    loading={likeLoading}
                                    onClick={() => {
                                        handleLikeSnippet(item.id)

                                    }}
                                    fullWidth
                                    size="small"
                                    sx={{color: "inherit"}}
                                    startIcon={isCurrentUserLike(item?.snippetLike)
                                        ? <Favorite/>
                                        : <FavoriteBorderOutlined/>}
                                >
                                    {item._count?.snippetLike} liked
                                </LoadingButton>

                                {isMe && <RenameDialog/>}

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
