import {ShareOutlined} from "@mui/icons-material";
import * as React from "react";
import CopyInput from "../../Base/Input/Copy/CopyInput";
import BasePopupButton from "../../Base/Popup/BasePopupButton";

interface ISharePopupProps {
    url: string
}

const SharePopup: React.FC<ISharePopupProps> = (props) => {
    return (
        <>
            <BasePopupButton icon={<ShareOutlined/>}>
                <CopyInput url={props.url}/>
            </BasePopupButton>
        </>
    )
}
export default SharePopup
