import React from "react";
import {
  Box,
  Button,
  CardActionArea,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  OutlinedInput,
  Pagination,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { CopyBlock, dracula } from "react-code-blocks";
import { StarBorderOutlined } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import RenameDialog from "../../components/Snippet/Rename/RenameDialog";
import DeletePopup from "../../components/Snippet/Delete/DeletePopup";
import SharePopup from "../../components/Share/SharePopup";

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

const SearchSnippets = (): React.ReactElement => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", width: "100%" }}>
      <OutlinedInput size="small" placeholder="Search your snippets" />
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
  );
};

const Snippets = (): React.ReactElement => {
  return (
    <>
      <SearchSnippets />

      <Divider sx={{ my: 2 }} />

      {Array.from(Array(5).keys()).map((item, index) => {
        return (
          <Box key={index}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box alignItems={"center"} display={"flex"}>
                <Link
                  component={RouterLink}
                  variant={"body1"}
                  underline={"hover"}
                  to={"/hhlab"}
                >
                  hhlab
                </Link>

                <span style={{ margin: " 0 2px" }}>/</span>

                <Link
                  component={RouterLink}
                  variant={"body1"}
                  underline={"hover"}
                  to={"/hhlab/simple"}
                >
                  simple
                </Link>

                <Select
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
              </Box>

              <Box>
                <Button color={"inherit"} startIcon={<StarBorderOutlined />}>
                  1 stars
                </Button>

                <RenameDialog />

                <SharePopup url={"https://exampleSnippet.com"} />

                <DeletePopup />
              </Box>
            </Box>

            <Box>
              <Typography variant={"body2"}>
                Last active 11 months ago <br />
                Visual Studio Code Settings Sync Gist
              </Typography>

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
            </Box>

            <Divider sx={{ my: "20px" }} />
          </Box>
        );
      })}

      <Pagination count={10} />
    </>
  );
};

export default Snippets;
