import {bindPopover, bindTrigger, usePopupState,} from "material-ui-popup-state/hooks";
import {Button, IconButton, IconButtonProps, Popover} from "@mui/material";
import React from "react";

interface IBasePopupProps {
    children: React.ReactNode;
    icon: React.ReactNode;
    size?: IconButtonProps["size"];
    type?: "button" | "icon";
}

const BasePopupButton: React.FC<IBasePopupProps> = (props) => {
    const popupState = usePopupState({
        variant: "popover",
        popupId: "sharePopup",
    });

    return (
        <>
            {props.type === "button" ? (
                <Button variant={'contained'} color={"inherit"} size={props.size} {...bindTrigger(popupState)}
                        endIcon={props.icon}>
                    Share
                </Button>) : (<IconButton size={props.size} {...bindTrigger(popupState)}> {props.icon} </IconButton>)}

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

export default BasePopupButton;
