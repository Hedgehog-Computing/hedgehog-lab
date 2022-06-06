import {FullscreenOutlined} from "@mui/icons-material";
import {Button} from "@mui/material";
import React from "react";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";

const FullScreenButton = () => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(resultFullScreenState);

    return (
        <Button sx={{ml: 1}} size={'small'}
                color={resultFullScreen ? 'primary' : 'inherit'}
                variant={'contained'}
                onClick={() => setResultFullScreen(!resultFullScreen)}
                endIcon={<FullscreenOutlined/>}>
            Fullscreen
        </Button>
    )
}

export default FullScreenButton
