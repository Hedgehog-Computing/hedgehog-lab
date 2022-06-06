import {Box, Button} from "@mui/material";
import {FullscreenOutlined} from "@mui/icons-material";
import React from "react";
import SaveState from "../../Snippet/Save/SaveState";
import RightButton from "../../Layout/TopBar/RightButton";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";

const YourCodeHeader = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                justifyItems: "center"
            }}
        >
            <SaveState/>
            <Box sx={{
                display: "flex", alignItems: "center",
            }}>
                <Button sx={{ml: 1}} size={'small'}
                        color={resultFullScreen ? 'primary' : 'inherit'}
                        variant={'contained'}
                        onClick={() => setResultFullScreen(!resultFullScreen)}
                        endIcon={<FullscreenOutlined/>}>
                    Fullscreen
                </Button>

                <RightButton/>
            </Box>
        </Box>
    );
};

export default YourCodeHeader;
