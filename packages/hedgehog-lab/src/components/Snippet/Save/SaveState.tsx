import {
  Box,
  Checkbox,
  Chip,
  IconButton,
  OutlinedInput,
  Tooltip,
} from "@mui/material";
import {
  CheckOutlined,
  CircleOutlined,
  FiberManualRecord,
  MotionPhotosAuto,
  NotificationImportantOutlined,
} from "@mui/icons-material";
import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { codeSavingFlagState } from "../../../states/RYourCodeStates";
import { compilerLiveModeState } from "../../../states/RCompilerStates";
import BasePopupText from "../../Base/Popup/BasePopupText";
import { useTheme } from "@emotion/react";
import { deepOrange } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { authDialogState } from "../../../states/RAuthStates";

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

  const [authDialog, setAuthDialog] = useRecoilState(authDialogState);

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
      <Box
        sx={{
          cursor: "pointer",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        <BasePopupText text="File Name">
          <Box>
            <OutlinedInput
              autoFocus
              size="small"
              placeholder="File Name"
              endAdornment={
                <IconButton size="small">
                  <CheckOutlined />
                </IconButton>
              }
            />
          </Box>
        </BasePopupText>

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

      <Chip
        label="Not synchronized"
        size="small"
        color="warning"
        sx={{ cursor: "pointer" }}
        onClick={() => setAuthDialog(true)}
      />
    </Box>
  );
};

export default SaveState;
