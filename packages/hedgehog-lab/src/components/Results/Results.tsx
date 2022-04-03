import React, { useCallback } from "react";
import {
  Box,
  Card,
  CardActions,
  IconButton,
  LinearProgress,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";
import Output from "./Output";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  compilerLoadingState,
  compilerResultState,
} from "../../states/RCompilerStates";
import { FullscreenOutlined } from "@mui/icons-material";
import { resultFullScreenState } from "../../states/RLayoutStates";
import ShareDialog from "../Share/ShareDialog";
import SharePopup from "../Share/SharePopup";

const Results = (): React.ReactElement => {
  const compilerLoading = useRecoilValue<boolean>(compilerLoadingState);
  const compilerResult = useRecoilValue<any>(compilerResultState);
  const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
    resultFullScreenState
  );

  const { outputString, outputItem } = compilerResult;

  const handleResultFullScreen = useCallback(() => {
    setResultFullScreen(!resultFullScreen);
  }, [resultFullScreen, setResultFullScreen]);

  return (
    <div style={{ height: "100%" }}>
      <Card
        sx={{
          height: "calc(100vh - 160px)",
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: 0,
          px: 2,
        }}
      >
        {outputItem.length === 0 && outputString === "" ? (
          <Box>{compilerLoading && <LinearProgress />}</Box>
        ) : (
          <Paper elevation={0} sx={{ minHeight: "100%", borderRadius: 0 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "end",
                position: "sticky",
                top: 0,
                right: 0,
              }}
            >
              <SharePopup url="https://hhlab.dev/" />

              <IconButton onClick={handleResultFullScreen}>
                <FullscreenOutlined />
              </IconButton>
            </Box>

            {outputItem.length > 0 && (
              <div>
                <Output outputItemList={outputItem} />
              </div>
            )}
            {outputString && (
              <pre
                style={{
                  fontFamily: "inherit",
                  fontWeight: 500,
                  fontSize: "1rem",
                  lineHeight: "1.5",
                }}
              >
                {outputString}
              </pre>
            )}
          </Paper>
        )}
      </Card>
    </div>
  );
};

export default Results;
