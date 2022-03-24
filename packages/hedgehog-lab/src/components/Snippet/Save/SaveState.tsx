import { Box } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import React from "react";
import { useRecoilValue } from "recoil";
import { codeSavingFlagState } from "../../../states/RYourCodeStates";

const SaveState = (): React.ReactElement => {
  const codeSavingFlag = useRecoilValue(codeSavingFlagState);

  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      File Name
      {codeSavingFlag ? "*" : ""}
    </Box>
  );
};

export default SaveState;
