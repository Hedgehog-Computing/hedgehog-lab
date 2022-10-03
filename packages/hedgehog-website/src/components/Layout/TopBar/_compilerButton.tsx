import {Button} from "@mui/material";
import {queryCache} from "react-query";
import {PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {COMPILE_AND_RUN_BUTTON_ID, useEditor} from "../../../hooks/useEditor";
import React, {useCallback} from "react";
import {useCompiler} from "../../../hooks/useCompilier";

const CompilerButton = () => {
    const {editorCode} = useEditor();
    const [setCompilerReFetch, isLoading] = useCompiler();

    const handleRunCode = useCallback(() => {
        setCompilerReFetch(true);
    }, [setCompilerReFetch]);

    return (
        <>
            {isLoading ? (
                <Button
                    size="small"
                    color="error"
                    variant={"contained"}
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
                        sx={{alignSelf: 'center'}}
                        variant={"contained"}
                        id={COMPILE_AND_RUN_BUTTON_ID}
                        color="primary"
                        onClick={handleRunCode}
                        size="small"
                        endIcon={<PlayCircleOutline/>}
                    >
                        Run
                    </Button>
                </>
            )}
        </>
    )
}

export default CompilerButton;
