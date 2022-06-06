import {Box, Button} from "@mui/material";
import {FullscreenOutlined, PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {queryCache} from "react-query";
import React, {useCallback} from "react";
import {compiler} from "../../../compiler";
import SaveState from "../../Snippet/Save/SaveState";
import {useCompiler} from "../../../hooks/useCompilier";
import {COMPILE_AND_RUN_BUTTON_ID, useEditor} from "../../../hooks/useEditor";
import RightButton from "../../Layout/TopBar/RightButton";
import AccountMenu from "../../Auth/Account/AccountMenu";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";

const YourCodeHeader = (): React.ReactElement => {
    const {editorCode} = useEditor();
    const [setCompilerReFetch, isLoading] = useCompiler();

    const handleRunCode = useCallback(() => {
        setCompilerReFetch(true);
    }, [setCompilerReFetch]);

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
                display: "flex", alignItems: "center"
            }}>
                <Button sx={{ml: 1}} size={'small'}
                        color={resultFullScreen ? 'primary' : 'inherit'}
                        variant={'contained'}
                        onClick={() => setResultFullScreen(!resultFullScreen)}
                        endIcon={<FullscreenOutlined/>}>
                    Fullscreen
                </Button>

                <RightButton/>

                <Box ml={1}>
                    <AccountMenu/>
                </Box>

                {isLoading ? (
                    <Button
                        size="small"
                        color="error"
                        variant={"contained"}
                        sx={{ml: 1}}
                        onClick={() => {
                            // stop the web-worker
                            queryCache.cancelQueries(["compiler"]);
                            // set result to initial state
                            queryCache.setQueryData(["compiler", editorCode], () => ({
                                outputItem: [],
                                outputString: ""
                            }));
                        }}
                        endIcon={<StopCircleOutlined/>}
                    >
                        Stop
                    </Button>
                ) : (
                    <>
                        <Button
                            variant={"contained"}
                            id={COMPILE_AND_RUN_BUTTON_ID}
                            color="primary"
                            onClick={handleRunCode}
                            size="small"
                            endIcon={<PlayCircleOutline/>}
                            sx={{ml: 1}}
                        >
                            Run
                        </Button>
                    </>
                )}

            </Box>
        </Box>
    );
};

export default YourCodeHeader;
