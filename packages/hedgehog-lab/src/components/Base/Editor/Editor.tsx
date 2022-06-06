import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";
import React, {useState} from "react";
import YourCode from "../../YourCode/YourCode";
import Results from "../../Results/Results";
import {ResizableColumn} from "../../Layout/ResizableColumn/ResizableColumn";
import {useWindowSize} from "react-use";
import {Box, Fab, useMediaQuery, useTheme} from "@mui/material";
import {CodeOutlined} from "@mui/icons-material";

const Editor = () => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );
    const theme = useTheme();
    const {width} = useWindowSize();
    const isPhoneMedia = useMediaQuery(theme.breakpoints.up("sm"));
    const [showEditor, setShowEditor] = useState<boolean>(false);

    return (
        <>
            {isPhoneMedia ? (
                <Box display={'flex'}>
                    {!resultFullScreen &&
                        (<ResizableColumn maxWidth={1000} minWidth={200} width={width / 2}>
                            <YourCode/>
                        </ResizableColumn>)}

                    <Box width={'100%'}>
                        <Results/>
                    </Box>
                </Box>
            ) : (
                <>
                    {showEditor ? (
                        <YourCode/>
                    ) : (
                        <Box height={'100%'}>
                            <Results/>
                        </Box>
                    )}

                    <Fab variant="extended" sx={{position: 'absolute', bottom: 10, right: 2}}
                         onClick={() => setShowEditor(!showEditor)}>
                        <CodeOutlined sx={{mr: 1}}/>
                        Code
                    </Fab>
                </>
            )}
        </>
    )
}

export default Editor;
