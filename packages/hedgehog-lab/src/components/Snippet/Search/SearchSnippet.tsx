import {CodeOffOutlined, CodeOutlined, Favorite, FavoriteBorderOutlined,} from "@mui/icons-material";
import {Box, IconButton, MenuItem, OutlinedInput, Select, SelectChangeEvent, Tooltip,} from "@mui/material";
import React, {useCallback} from "react";
import {useRecoilState, useResetRecoilState} from "recoil";
import {useAuth} from "../../../hooks/useAuth";
import {searchState, showCodeBlockState} from "../../../states/RSnippetStates";
import {useMatch, useNavigate} from "react-router-dom";

const SearchSnippet = (): React.ReactElement => {
    const [showCodeBlock, setShowCodeBlock] = useRecoilState(showCodeBlockState);
    const [search, setSearch] = useRecoilState(searchState);
    const resetSearch = useResetRecoilState(searchState)
    const {isMe} = useAuth();
    const navigate = useNavigate()
    const handleShowCodeBlock = useCallback(() => {
        setShowCodeBlock(!showCodeBlock);
    }, [setShowCodeBlock, showCodeBlock]);


    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch({...search, text: event.target.value});
    }, [setSearch, search]);

    const handleChangeSize = useCallback((event: SelectChangeEvent) => {
        setSearch({...search, size: parseInt(event.target.value)});
    }, [setSearch, search])

    const isLikes = useMatch(`/u/:userID/likes`);
    const userID = useMatch(`/u/:userID`);

    const isExplore = useMatch(`/explore`);

    return (
        <Box
            sx={{
                justifyContent: "space-between",
                display: "flex",
                width: "100%",
                alignItems: "center",
            }}
        >
            <Box sx={{display: "flex", alignItems: "center"}}>
                <OutlinedInput
                    size="small"
                    placeholder={`Search ${(isMe || isLikes) ? `your ${isLikes ? 'liked' : ''}` : "all"} snippets`}
                    value={search.text}
                    onChange={handleChange}
                />
                <Select
                    onChange={handleChangeSize}
                    value={String(search.size)}
                    sx={{
                        height: 40,
                        fontSize: "0.8125rem",
                        ml: 1,
                    }}
                >
                    <MenuItem dense value={'5'}>
                        5
                    </MenuItem>
                    <MenuItem dense value={'10'}>
                        10
                    </MenuItem>
                </Select>
            </Box>

            <Box>
                <Tooltip title={showCodeBlock ? "Hide code" : "Show code"} arrow>
                    <IconButton onClick={handleShowCodeBlock}>
                        {showCodeBlock ? <CodeOutlined/> : <CodeOffOutlined/>}
                    </IconButton>
                </Tooltip>

                {
                    !isExplore && (
                        <Tooltip title={"Liked"} arrow>
                            <IconButton onClick={() => {
                                navigate(isLikes ? `/u/${isLikes.params.userID}` : `/u/${userID?.params.userID}/likes`)
                            }}>
                                {isLikes ? <Favorite/> : <FavoriteBorderOutlined/>}
                            </IconButton>
                        </Tooltip>
                    )
                }
            </Box>
        </Box>
    );
};

export default SearchSnippet;
