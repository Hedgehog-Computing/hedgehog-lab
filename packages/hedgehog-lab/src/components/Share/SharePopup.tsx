import { ShareOutlined } from "@mui/icons-material";
import { IconButtonProps } from "@mui/material";
import * as React from "react";
import CopyInput from "../Base/Input/Copy/CopyInput";
import BasePopupButton from "../Base/Popup/BasePopupButton";

interface ISharePopupProps {
  url: string;
  size?: IconButtonProps["size"];
}

const SharePopup: React.FC<ISharePopupProps> = (props) => {
  return (
    <>
      <BasePopupButton size={props.size} icon={<ShareOutlined />}>
        <CopyInput url={props.url} />
      </BasePopupButton>
    </>
  );
};
export default SharePopup;
