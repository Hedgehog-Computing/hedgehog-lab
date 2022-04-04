import {
  FavoriteBorderOutlined,
  PublishOutlined,
  StarBorderOutlined,
} from "@mui/icons-material";
import {
  Link,
  Box,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  Button,
  Typography,
  Paper,
  CardActionArea,
  Divider,
} from "@mui/material";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAuth } from "../../../hooks/useAuth";
import { showCodeBlockState } from "../../../states/RSnippetStates";
import SharePopup from "../../Share/SharePopup";
import DeletePopup from "../Delete/DeletePopup";
import RenameDialog from "../Rename/RenameDialog";

const printCode = `
{
    "version": 2,
    "name": "now-laravel-core",
    "scope": "your scope",
    "regions": [
    "all"
    ],
    "public": true,
    "builds": [
    
    
`;

const CodeBlcok = (): React.ReactElement => {
  return (
    <Paper elevation={0} sx={{ mt: "10px" }}>
      <CardActionArea component={RouterLink} to={"/hhlab/simple"}>
        <Box
          sx={{
            "& button": {
              display: "none",
            },
          }}
        >
          <CopyBlock
            showLineNumbers
            text={printCode}
            language={"javascript"}
            theme={dracula}
          />
        </Box>
      </CardActionArea>
    </Paper>
  );
};

const SnippetList = () => {
  const showCodeBlock = useRecoilValue(showCodeBlockState);
  const { isMe } = useAuth();

  return (
    <>
      {Array.from(Array(5).keys()).map((item, index) => {
        return (
          <Box key={index}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box alignItems={"center"} display={"flex"}>
                <Link
                  component={RouterLink}
                  variant={"body1"}
                  to={"/u/hhlab"}
                  sx={{ fontWeight: "bold" }}
                >
                  hhlab
                </Link>

                <span style={{ margin: " 0 2px" }}>/</span>

                <Link
                  component={RouterLink}
                  variant={"body1"}
                  to={"/s/hhlab/simple"}
                  sx={{ fontWeight: "bold" }}
                >
                  simple
                </Link>

                <Select
                  disabled={!isMe}
                  fullWidth
                  value={"Public"}
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

                <Select
                  disabled={!isMe}
                  fullWidth
                  value={"V2"}
                  size="small"
                  sx={{
                    height: 24,
                    fontSize: "0.8125rem",
                    ml: 1,
                  }}
                >
                  <MenuItem dense value={"V2"}>
                    V2
                  </MenuItem>
                  <MenuItem dense value={"V1"}>
                    V1
                  </MenuItem>
                </Select>

                {isMe && (
                  <Tooltip title="release" arrow>
                    <IconButton size="small" sx={{ ml: 1 }}>
                      <PublishOutlined />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>

              <Box>
                <Button
                  size="small"
                  color={"inherit"}
                  startIcon={<FavoriteBorderOutlined />}
                  disabled={isMe}
                >
                  1 stars
                </Button>

                {isMe && <RenameDialog />}

                <SharePopup size="small" url={"https://exampleSnippet.com"} />

                {isMe && <DeletePopup size="small" />}
              </Box>
            </Box>

            <Box>
              <Typography variant={"body2"}>
                Last active 11 months ago <br />
                Visual Studio Code Settings Sync Gist
              </Typography>

              {showCodeBlock && <CodeBlcok />}
            </Box>

            <Divider sx={{ my: "20px" }} />
          </Box>
        );
      })}
    </>
  );
};

export default SnippetList;
