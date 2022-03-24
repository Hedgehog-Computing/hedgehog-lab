import { Box, Checkbox, Tooltip } from "@mui/material";
import {
  CircleOutlined,
  FiberManualRecord,
  MotionPhotosAuto,
} from "@mui/icons-material";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeSavingFlagState } from "../../../states/RYourCodeStates";
import { compilerLiveModeState } from "../../../states/RCompilerStates";

const SaveState = (): React.ReactElement => {
  const codeSavingFlag = useRecoilValue(codeSavingFlagState);
  const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
    compilerLiveModeState
  );
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const liveMode = event.target.checked ? "on" : "off";
    setChecked(event.target.checked);
    setCompilerLiveMode(liveMode);
    localStorage.setItem("liveMode", liveMode);
  };

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        File Name
        {codeSavingFlag ? "*" : ""}
      </Box>
      <Tooltip title="Live Mode" arrow>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          size="small"
          icon={<CircleOutlined />}
          checkedIcon={<MotionPhotosAuto />}
        />
      </Tooltip>
    </Box>
  );
};

export default SaveState;
