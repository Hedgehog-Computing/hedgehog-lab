import { Box, Button, IconButton } from "@mui/material";
import { PlayCircleOutline, StopCircleOutlined } from "@mui/icons-material";
import { queryCache } from "react-query";
import React, { useCallback, useEffect } from "react";
import { compiler } from "../../../compiler";
import SaveDialog from "../../Snippet/Save/SaveDialog";
import { useParams } from "react-router-dom";
import SaveState from "../../Snippet/Save/SaveState";
import { useCompiler } from "../../../hooks/useCompilier";
import { COMPILE_AND_RUN_BUTTON_ID, useEditor } from "../../../hooks/useEditor";
import { useRecoilState, useRecoilValue } from "recoil";
import { compilerLiveModeState } from "../../../states/RCompilerStates";

const YourCodeHeader = (): React.ReactElement => {
  const { editorCode } = useEditor();
  const [setCompilerReFetch, isLoading] = useCompiler();

  const handleRunCode = useCallback(() => {
    setCompilerReFetch(true);
  }, [setCompilerReFetch]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        justifyItems: "center",
      }}
    >
      <SaveState />
      <div>
        {isLoading ? (
          <IconButton
            color="error"
            onClick={() => {
              // stop the web-worker
              queryCache.cancelQueries(["compiler"]);
              // set result to initial state
              queryCache.setQueryData(["compiler", editorCode], () => ({
                outputItem: [],
                outputString: "",
              }));
            }}
          >
            <StopCircleOutlined />
          </IconButton>
        ) : (
          <>
            <IconButton
              id={COMPILE_AND_RUN_BUTTON_ID}
              color="primary"
              onClick={handleRunCode}
              size="small"
            >
              <PlayCircleOutline />
            </IconButton>
          </>
        )}
      </div>
    </Box>
  );
};

export default YourCodeHeader;
