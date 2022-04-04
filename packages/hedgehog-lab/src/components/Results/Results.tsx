import React, { useCallback } from "react";
import {
  Box,
  Card,
  CardActions,
  IconButton,
  LinearProgress,
  Paper,
  Skeleton,
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

  const { outputString, outputItem } = compilerResult;

  return (
    <div style={{ height: "100%" }}>
      <Card
        sx={{
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          overflowX: "auto",
          borderRadius: 0,
          px: 2,
        }}
      >
        {outputItem.length === 0 && outputString === "" ? (
          <Box>
            {compilerLoading && (
              <>
                {Array.from({ length: 10 }).map((_, index) => {
                  return (
                    <Box key={index} sx={{ mb: 3 }}>
                      <Skeleton variant="rectangular" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </Box>
                  );
                })}
              </>
            )}
          </Box>
        ) : (
          <Paper elevation={0} sx={{ minHeight: "100%", borderRadius: 0 }}>
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
