import {FavoriteBorderOutlined, PublishOutlined,} from "@mui/icons-material";
import {
    Box,
    Button,
    CardActionArea,
    Chip,
    Divider,
    IconButton,
    Link,
    MenuItem,
    Paper,
    Select,
    Tooltip,
    Typography,
} from "@mui/material";
import React from "react";
import {atomOneLight, CopyBlock} from "react-code-blocks";
import {Link as RouterLink} from "react-router-dom";
import {useRecoilValue} from "recoil";
import {useAuth} from "../../../hooks/useAuth";
import {showCodeBlockState} from "../../../states/RSnippetStates";
import SharePopup from "../../Share/SharePopup";
import DeletePopup from "../Delete/DeletePopup";
import RenameDialog from "../Rename/RenameDialog";


interface ISnippetsProps {
    _id: string;
    _source: {
        title: string;
        description: string;
        content: string;
        author: string;
        visibility: string[];
        createdAt: string;
        updatedAt: string;
    };
}

interface ISnippetListProps {
    snippets: ISnippetsProps[];
}

const SnippetList: React.FC<ISnippetListProps> = (props) => {
    const showCodeBlock = useRecoilValue(showCodeBlockState);
    const {isMe} = useAuth();

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
                                    to={"/u/" + item._source.author}
                                    sx={{fontWeight: "bold"}}
                                >
                                    {item._source.author}
                                </Link>

                                <span style={{margin: " 0 2px"}}>/</span>

                                <Link
                                    component={RouterLink}
                                    variant={"body1"}
                                    to={`/s/${item._source.author}/${item._source.title}`}
                                    sx={{fontWeight: "bold"}}
                                >
                                    {item._source.title}
                                </Link>

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
                                        <MenuItem dense value={"Public"}>
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

                                {isMe && (
                                    <Tooltip title="release" arrow>
                                        <IconButton size="small" sx={{ml: 1}}>
                                            <PublishOutlined/>
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Box>

                            <Box>
                                <Button
                                    size="small"
                                    color={"inherit"}
                                    startIcon={<FavoriteBorderOutlined/>}
                                    disabled={isMe}
                                >
                                    1 liked
                                </Button>

                                {isMe && <RenameDialog/>}

                                <SharePopup size="small" url={"https://exampleSnippet.com"}/>

                                {isMe && <DeletePopup size="small"/>}
                            </Box>
                        </Box>

                        <Box>
                            <Typography variant={"body2"}>
                                {item._source.updatedAt} <br/>
                                {item._source.description}
                            </Typography>

                            {showCodeBlock && (
                                <Paper elevation={0} sx={{mt: 1}} variant={"outlined"}>
                                    <CardActionArea component={RouterLink}
                                                    to={`/s/${item._source.author}/${item._source.title}`}>
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
