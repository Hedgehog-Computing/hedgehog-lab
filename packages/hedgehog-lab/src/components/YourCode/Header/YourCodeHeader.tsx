import {Box, Button} from "@mui/material";
import {PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {queryCache} from "react-query";
import React, {useCallback} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {editorCodeState} from "../RYourCodeStates";
import {COMPILE_AND_RUN_BUTTON_ID} from "../YourCode";
import {compiler} from "../../../compiler";
import {compilerLoadingState, compilerReFetchState} from "../../Compiler/RCompilerStates";
import SaveDialog from "../../Snippet/SaveNotice/SaveDialog";
import {useParams} from "react-router-dom";
import SaveNotice from "../../Snippet/SaveNotice/SaveNotice";

const YourCodeHeader = (): React.ReactElement => {
    const compilerLoading = useRecoilValue<boolean>(compilerLoadingState)
    const editorCode = useRecoilValue<string>(editorCodeState)
    const setCompilerReFetch = useSetRecoilState<boolean>(compilerReFetchState);

    const handleRunCode = useCallback(() => {
        setCompilerReFetch(true)
    }, [])

    const {snippetID} = useParams()

    return (
        <Box sx={{display: 'flex', alignContent: 'center', justifyContent: 'space-between'}}>
            {
                snippetID ? <SaveNotice/> : <SaveDialog/>
            }
            <div>
                {compilerLoading ? (
                    <Button
                        endIcon={<StopCircleOutlined/>}
                        variant="contained"
                        color="error"


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
                        variant={'contained'}
                        color="primary"
                        onClick={handleRunCode}>
                        Run
                    </Button>
                )}
            </div>
        </Box>
    )
}

export default YourCodeHeader
