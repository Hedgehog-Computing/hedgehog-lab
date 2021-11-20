import {Box, Button} from "@mui/material";
import {FiberManualRecord, PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {queryCache} from "react-query";
import React, {useCallback} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {codeSavingFlagState, editorCodeState} from "../RYourCodeStates";
import {COMPILE_AND_RUN_BUTTON_ID} from "../YourCode";
import {compiler} from "../../../compiler";
import {compilerLoadingState, compilerReFetchState} from "../../Compiler/RCompilerStates";

const YourCodeHeader = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue<boolean>(codeSavingFlagState)
    const compilerLoading = useRecoilValue<boolean>(compilerLoadingState)
    const editorCode = useRecoilValue<string>(editorCodeState)
    const setCompilerReFetch = useSetRecoilState<boolean>(compilerReFetchState);

    const handleRunCode = useCallback(() => {
        setCompilerReFetch(true)
    }, [])


    return (
        <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}>
            <Button size={'small'} variant={'outlined'} endIcon={
                codeSavingFlag && (<FiberManualRecord/>)
            }>
                Your Code
            </Button>

            <div>
                {compilerLoading ? (
                    <Button
                        endIcon={<StopCircleOutlined/>}
                        variant="contained"
                        color="error"
                        size="small"
                        style={{
                            textTransform: 'none',
                        }}


                        onClick={() => {
                            // stop the web-worker
                            queryCache.cancelQueries(['compiler']);
                            // set result to initial state
                            queryCache.setQueryData(['compiler', editorCode], () => ({
                                outputItem: [],
                                outputString: ''
                            }));
                        }}>
                        Stop
                    </Button>
                ) : (
                    <Button
                        endIcon={<PlayCircleOutline/>}
                        id={COMPILE_AND_RUN_BUTTON_ID}
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={handleRunCode}
                        style={{
                            textTransform: 'none'
                        }}>
                        Run
                    </Button>
                )}
            </div>
        </Box>
    )
}

export default YourCodeHeader
