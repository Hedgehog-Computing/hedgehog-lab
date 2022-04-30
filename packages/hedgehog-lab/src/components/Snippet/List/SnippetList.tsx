import {Favorite, FavoriteBorderOutlined,} from "@mui/icons-material";
import {Box, CardActionArea, Chip, Divider, Link, MenuItem, Paper, Select, Typography,} from "@mui/material";
import React, {useCallback, useState} from "react";
import {atomOneLight, CopyBlock} from "react-code-blocks";
import {Link as RouterLink} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {useAuth} from "../../../hooks/useAuth";
import {showCodeBlockState} from "../../../states/RSnippetStates";
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

interface ISnippetsProps {
    _id: string;
    _source: {
        id: string
        title: string;
        description: string;
        content: string;
        author: {
            firstname: string;
        };
        visibility: string[];
        createdAt: string;
        updatedAt: string;
        _count: {
            snippetLike: number
        }
        snippetLike: ISnippetLikeProps[]
    };
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

    const handleLikeSnippet = useCallback((snippetId: string) => {
        setLikeLoading(true)
        http.post('/snippets/like', {snippetId: snippetId, token: auth.accessToken})
            .then(() => {
                console.log('action success')
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

    return (
        <>
            {props.snippets.map((item, index) => {
                return (
                    <Box key={index}>
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Box alignItems={"center"} display={"flex"}>
                                <Link
                                    component={RouterLink}
                                    variant={"body1"}
                                    to={"/u/" + item._source.author.firstname}
                                    sx={{fontWeight: "bold"}}
                                >
                                    {item._source.author.firstname}
                                </Link>

                                <span style={{margin: " 0 2px"}}>/</span>

                                <Link
                                    component={RouterLink}
                                    variant={"body1"}
                                    to={`/s/${item._source.author.firstname}/${item._source.title}`}
                                    sx={{fontWeight: "bold"}}
                                >
                                    {item._source.title}
                                </Link>
                            </Box>

                            <Box display={'flex'} alignItems={'center'}>
                                {isMe ? (
                                    <Select
                                        fullWidth
                                        value={item._source.visibility}
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
                                    <Chip variant={"outlined"} label={item._source.visibility} sx={{
                                        height: 24,
                                        fontSize: "0.8125rem",
                                        ml: 1,
                                    }}/>
                                )}

                                <LoadingButton
                                    loading={likeLoading}
                                    onClick={() => handleLikeSnippet(item._source.id)}
                                    fullWidth
                                    size="small"
                                    sx={{color: "inherit"}}
                                    startIcon={isCurrentUserLike(item._source.snippetLike)
                                        ? <Favorite/>
                                        : <FavoriteBorderOutlined/>}
                                    disabled={isMe || !auth.isAuthenticated || item._source.author.firstname === auth.user.firstname}
                                >
                                    {item._source._count.snippetLike} liked
                                </LoadingButton>

                                {isMe && <RenameDialog/>}

                                <SharePopup size="small"
                                            script={`import ${item._source.author.firstname}/${item._source.title}`}
                                            embed={`https://hlab.app/s/${item._source.author.firstname}/${item._source.title}`}
                                            url={`https://hlab.app/s/${item._source.author.firstname}/${item._source.title}`}/>

                                {isMe && <DeletePopup size="small"/>}
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant={"body2"}>
                                {formatDate(item._source.updatedAt)} <br/>

                                {item._source.description}
                            </Typography>

                            {showCodeBlock && (
                                <Paper elevation={0} sx={{mt: 1}} variant={"outlined"}>
                                    <CardActionArea component={RouterLink}
                                                    to={`/s/${item._source.author.firstname}/${item._source.title}`}>
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
                                                text={item._source.content.slice(0, 200)}
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
