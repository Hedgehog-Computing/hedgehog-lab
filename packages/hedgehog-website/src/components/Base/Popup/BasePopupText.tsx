import {
  bindPopover,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import { IconButton, Popover } from "@mui/material";
import React from "react";

interface IBasePopupProps {
  children: React.ReactNode;
  text: string;
}

const BasePopupText: React.FC<IBasePopupProps> = (props) => {
  const popupState = usePopupState({
    variant: "popover",
    popupId: "textPopup",
  });

  return (
    <>
      <span {...bindTrigger(popupState)}>{props.text}</span>

      <Popover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {props.children}
      </Popover>
    </>
  );
};

export default BasePopupText;
