import {useRecoilValue} from "recoil";
import {resultFullScreenState, sideBarOpenState} from "../../../states/RLayoutStates";
import React, {useState} from "react";
import YourCode from "../../YourCode/YourCode";
import Results from "../../Results/Results";
import {ResizableColumn} from "../../Layout/ResizableColumn/ResizableColumn";
import {useWindowSize} from "react-use";
import {Box, Button, Stack, useMediaQuery, useTheme} from "@mui/material";
import {CodeOutlined} from "@mui/icons-material";
import {sideBarWidth} from "../../YourCode/Config/SideBar";
import CompilerButton from "../../Layout/TopBar/_compilerButton";

const Editor = () => {
    const resultFullScreen = useRecoilValue<boolean>(
        resultFullScreenState
    );
    const sideBarOpen = useRecoilValue(sideBarOpenState);
    const theme = useTheme();
    const {width} = useWindowSize();
    const isPhoneMedia = useMediaQuery(theme.breakpoints.down("md"));
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const editorWidth = sideBarOpen ? (width - sideBarWidth) / 2 : width / 2;

    return (
        <>
            {!isPhoneMedia ? (
                <Box display={'flex'}>
                    {!resultFullScreen &&
                        (<ResizableColumn maxWidth={1000} minWidth={200} width={editorWidth}>
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

                    <Stack sx={{position: 'absolute', bottom: 10, right: 10}} spacing={1}>
                        <CompilerButton/>

                        <Button endIcon={<CodeOutlined/>} color={showEditor ? "primary" : 'inherit'}
                                variant={'contained'}
                                onClick={() => setShowEditor(!showEditor)}>
                            Code
                        </Button>
                    </Stack>
                </>
            )}
        </>
    )
}

export default Editor;
