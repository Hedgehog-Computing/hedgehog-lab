import React, { useCallback } from "react";
import { IconButton, Tooltip } from "@mui/material";
import {
  FullscreenOutlined,
  GitHub as GitHubIcon,
  MenuBookOutlined,
} from "@mui/icons-material";
import SharePopup from "../../Share/SharePopup";
import { useRecoilState } from "recoil";
import { resultFullScreenState } from "../../../states/RLayoutStates";

interface IRightButtonProps {
  href: string;
  render: React.ReactNode;
  tooltip: string;
}

const RightButton = (): React.ReactElement => {
  const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
    resultFullScreenState
  );

  const handleResultFullScreen = useCallback(() => {
    setResultFullScreen(!resultFullScreen);
  }, [resultFullScreen, setResultFullScreen]);

  return (
    <>
      <SharePopup url="https://hhlab.dev/" />

      <IconButton onClick={handleResultFullScreen}>
        <FullscreenOutlined />
      </IconButton>
    </>
  );
};

export default RightButton;
