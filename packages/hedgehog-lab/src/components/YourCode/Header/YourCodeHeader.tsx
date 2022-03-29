import { Box, Button } from "@mui/material";
import { PlayCircleOutline, StopCircleOutlined } from "@mui/icons-material";
import { queryCache } from "react-query";
import React, { useCallback } from "react";
import { compiler } from "../../../compiler";
import SaveDialog from "../../Snippet/Save/SaveDialog";
import { useParams } from "react-router-dom";
import SaveState from "../../Snippet/Save/SaveState";
import { useCompiler } from "../../../hooks/useCompilier";
import { COMPILE_AND_RUN_BUTTON_ID, useEditor } from "../../../hooks/useEditor";

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
          <Button
            endIcon={<StopCircleOutlined />}
            variant="contained"
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
            Stop
          </Button>
        ) : (
          <Button
            endIcon={<PlayCircleOutline />}
            id={COMPILE_AND_RUN_BUTTON_ID}
            variant={"contained"}
            color="primary"
            onClick={handleRunCode}
          >
            Run
          </Button>
        )}
      </div>
    </Box>
  );
};

export default YourCodeHeader;
