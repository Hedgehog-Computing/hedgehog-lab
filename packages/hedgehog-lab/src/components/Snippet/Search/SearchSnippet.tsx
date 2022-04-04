import {
  CodeOffOutlined,
  CodeOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import {
  Box,
  OutlinedInput,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { useCallback, useState } from "react";
import { useRecoilState } from "recoil";
import { useAuth } from "../../../hooks/useAuth";
import { showCodeBlockState } from "../../../states/RSnippetStates";

const SearchSnippet = (): React.ReactElement => {
  const [showCodeBlock, setShowCodeBlock] = useRecoilState(showCodeBlockState);
  const { isMe } = useAuth();

  const handleShowCodeBlock = useCallback(() => {
    setShowCodeBlock(!showCodeBlock);
  }, [setShowCodeBlock, showCodeBlock]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <OutlinedInput
          size="small"
          placeholder={`Search ${isMe ? "your" : "all"} snippets`}
        />
        <Select
          value={"5"}
          sx={{
            height: 40,
            fontSize: "0.8125rem",
            ml: 1,
          }}
        >
          <MenuItem dense value={"5"}>
            5
          </MenuItem>
          <MenuItem dense value={"10"}>
            10
          </MenuItem>
        </Select>
      </Box>

      <Box>
        <Tooltip title={showCodeBlock ? "Hide code" : "Show code"} arrow>
          <IconButton onClick={handleShowCodeBlock}>
            {showCodeBlock ? <CodeOutlined /> : <CodeOffOutlined />}
          </IconButton>
        </Tooltip>

        {isMe && (
          <Tooltip title={"Favorite"} arrow>
            <IconButton>
              <FavoriteBorderOutlined />
            </IconButton>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};

export default SearchSnippet;
