import React from "react";
import {Box, Card, Paper,} from "@mui/material";
import Output from "./Output";
import {useRecoilValue} from "recoil";
import {compilerLoadingState, compilerResultState,} from "../../states/RCompilerStates";
import EditorLoading from "../Base/Editor/Loading";

const Results = (): React.ReactElement => {
    const compilerLoading = useRecoilValue<boolean>(compilerLoadingState);
    const compilerResult = useRecoilValue<any>(compilerResultState);

    const {outputString, outputItem} = compilerResult;

    return (
        <div>
            <Card
                sx={{
                    height: "calc(100vh - 82px)",
                    overflowY: "auto",
                    overflowX: "auto",
                    borderRadius: 0,
                    px: 2,
                }}
            >
                {outputItem.length === 0 && outputString === "" ? (
                    <Box>
                        {compilerLoading && (
                            <>
                                <EditorLoading/>
                            </>
                        )}
                    </Box>
                ) : (
                    <Paper elevation={0} sx={{borderRadius: 0}}>
                        {outputItem.length > 0 && (
                            <div>
                                <Output outputItemList={outputItem}/>
                            </div>
                        )}
                        {outputString && (
                            <pre
                                style={{
                                    fontFamily: "inherit",
                                    fontWeight: 500,
                                    fontSize: "1rem",
                                    lineHeight: "1.5",
                                }}
                            >
                {outputString}
              </pre>
                        )}
                    </Paper>
                )}
            </Card>
        </div>
    );
};

export default Results;
