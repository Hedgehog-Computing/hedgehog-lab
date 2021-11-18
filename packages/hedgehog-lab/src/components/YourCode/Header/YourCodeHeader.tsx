import {Box, Button} from "@mui/material";
import {FiberManualRecord, PlayCircleOutline, StopCircleOutlined} from "@mui/icons-material";
import {queryCache, useQuery} from "react-query";
import React, {useCallback, useEffect} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {
    codeSavingFlagState,
    compilerLoadingState,
    compilerReFetchState,
    compilerResultState,
    editorCodeState
} from "../RYourCodeStates";
import {COMPILE_AND_RUN_BUTTON_ID} from "../YourCode";
import {compiler, OutputResult} from "../../../compiler";

const YourCodeHeader = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue<boolean>(codeSavingFlagState)
    const [compilerLoading, setCompilerLoading] = useRecoilState<boolean>(compilerLoadingState)
    const editorCode = useRecoilValue<string>(editorCodeState)
    const setCompilerResult = useSetRecoilState<any>(compilerResultState);
    const compilerReFetch = useRecoilValue<boolean>(compilerReFetchState);

    const {isFetching: isLoading, refetch} = useQuery<OutputResult,
        readonly [string, string]
        //Error
        >(['compiler', editorCode], compiler, {
        retry: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (result) => {
            setCompilerResult(result);
        },
        onError: (lastError: any) => {
            // It's necessary to output all exception messages to user at output textbox,
            // including execution runtime exception and compiling exception -Lidang
            console.log('Hedgehog Lab error: \n' + lastError.toString());
            setCompilerResult({
                outputItem: [],
                outputString: lastError.toString()
            });
        }
    });

    useEffect(() => {
        if (compilerReFetch) refetch({force: true} as any)
    }, [compilerReFetch])

    const handleRunCode = useCallback(() => {
        setCompilerResult({
            outputItem: [],
            outputString: ''
        });
        refetch({force: true} as any)
    }, [editorCode])

    useEffect(() => {
        setCompilerLoading(isLoading)
    }, [isLoading])

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
