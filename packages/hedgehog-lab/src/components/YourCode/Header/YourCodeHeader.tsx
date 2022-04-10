import {Box, IconButton} from "@mui/material";
import {PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {queryCache} from "react-query";
import React, {useCallback} from "react";
import {compiler} from "../../../compiler";
import SaveState from "../../Snippet/Save/SaveState";
import {useCompiler} from "../../../hooks/useCompilier";
import {COMPILE_AND_RUN_BUTTON_ID, useEditor} from "../../../hooks/useEditor";
import RightButton from "../../Layout/TopBar/RightButton";
import AccountMenu from "../../Auth/Account/AccountMenu";

const YourCodeHeader = (): React.ReactElement => {
    const {editorCode} = useEditor();
    const [setCompilerReFetch, isLoading] = useCompiler();


    const handleRunCode = useCallback(() => {
        setCompilerReFetch(true);
    }, [setCompilerReFetch]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                justifyItems: "center",
            }}
        >
            <SaveState/>
            <Box sx={{display: "flex", alignItems: 'center'}}>
                <RightButton/>

                {isLoading ? (
                    <IconButton
                        size="small"
                        color="error"
                        onClick={() => {
                            // stop the web-worker
                            queryCache.cancelQueries(["compiler"]);
                            // set result to initial state
                            queryCache.setQueryData(["compiler", editorCode], () => ({
                                outputItem: [],
                                outputString: "",
                            }));
                        }}
                    >
                        <StopCircleOutlined/>
                    </IconButton>
                ) : (
                    <>
                        <IconButton
                            id={COMPILE_AND_RUN_BUTTON_ID}
                            color="primary"
                            onClick={handleRunCode}
                            size="small"
                        >
                            <PlayCircleOutline/>
                        </IconButton>
                    </>
                )}

                <AccountMenu/>
            </Box>
        </Box>
    );
};

export default YourCodeHeader;
