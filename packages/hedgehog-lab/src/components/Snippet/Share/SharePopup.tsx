import {bindPopover, bindTrigger, usePopupState} from "material-ui-popup-state/hooks";
import {IconButton, Popover} from "@mui/material";
import {ShareOutlined} from "@mui/icons-material";
import * as React from "react";
import CopyInput from "../../Base/Input/Copy/CopyInput";

interface ISharePopupProps {
    url: string
}

const SharePopup: React.FC<ISharePopupProps> = (props) => {
    const popupState = usePopupState({variant: 'popover', popupId: 'sharePopup'})

    return (
        <>
            <IconButton color={'inherit'} {...bindTrigger(popupState)}>
                <ShareOutlined/>
            </IconButton>

            <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <CopyInput url={props.url}/>
            </Popover>
        </>
    )
}
export default SharePopup
