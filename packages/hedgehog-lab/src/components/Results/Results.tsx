import React from "react";
import {Box, Card, Paper, Typography,} from "@mui/material";
import Output from "./Output";
import {useRecoilValue} from "recoil";
import {compilerLoadingState, compilerResultState,} from "../../states/RCompilerStates";
import EditorLoading from "../Base/Editor/Loading";
import useApp from "../../hooks/useApp";

const Results = (): React.ReactElement => {
    const compilerLoading = useRecoilValue<boolean>(compilerLoadingState);
    const compilerResult = useRecoilValue<any>(compilerResultState);

    const {outputString, outputItem} = compilerResult;
    const {isDevPath} = useApp()

    return (
        <div>
            <Card
                sx={{
                    height: `calc(100vh - ${isDevPath ? '92px' : '82px'})`,
                    overflowY: "auto",
                    overflowX: "auto",
                    borderRadius: 0,
                    px: 2,
                }}
            >
                {outputItem.length === 0 && outputString === "" ? (
                    <Box>
                        {compilerLoading ? (
                            <>
                                <EditorLoading/>
                            </>
                        ) : (
                            <Typography variant={'body2'}>
                                👀 Write some code to see the output.
                            </Typography>
                        )}
                    </Box>
                ) : (
                    <Paper elevation={0} sx={{borderRadius: 0}}>
                        {outputItem.length > 0 && (
                            <div>
                                <Output outputItemList={outputItem}/>
                            </div>
                        )}

                    </Paper>
                )}
            </Card>
        </div>
    );
};

export default Results;
