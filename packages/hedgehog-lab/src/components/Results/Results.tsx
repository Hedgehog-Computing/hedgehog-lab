import React from 'react';
import {Card, LinearProgress, Paper, Typography,} from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import Output from './Output';
import {useRecoilValue} from "recoil";
import {compilerLoadingState, compilerResultState} from "../Compiler/RCompilerStates";

const Results = (): React.ReactElement => {

    const compilerLoading = useRecoilValue<boolean>(compilerLoadingState)
    const compilerResult = useRecoilValue<any>(compilerResultState);

    const {outputString, outputItem} = compilerResult

    return (
        <div style={{height: '100%'}}>
            <Card
                style={{
                    height: 'calc(100vh - 160px)',
                    overflowY: 'auto',
                    overflowX: 'auto',
                    borderRadius: 0
                }}>
                {outputItem.length === 0 && outputString === '' ? (
                    <div className={'no-code'}>
                        <div className="no-code-content">
                            <Typography variant={"h6"}>
                                {compilerLoading
                                    ? 'Loading...'
                                    : `Please write your code on the ${document.body.clientWidth < 960 ? 'top' : 'left'
                                    } and click the 'Compile and run' button`}
                            </Typography>
                            {compilerLoading ? (
                                <LinearProgress/>
                            ) : document.body.clientWidth < 960 ? (
                                <ArrowUpwardOutlinedIcon style={{fontSize: 50}}/>
                            ) : (
                                <ArrowBackOutlinedIcon style={{fontSize: 50}}/>
                            )}
                        </div>
                    </div>
                ) : (
                    <Paper variant={'outlined'} sx={{p: 2, minHeight: '100%', borderRadius: 0}}>
                        {outputItem.length > 0 && (
                            <div>
                                <Output outputItemList={outputItem}/>
                            </div>
                        )}
                        {outputString && (
                            <pre style={{
                                fontFamily: 'monospace',
                                fontWeight: 400,
                                fontSize: '1rem',
                                lineHeight: '1.5'
                            }}>
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
