import React, {useEffect, useState} from "react";
import Qs from 'qs';
import {Box, Grid} from '@mui/material';
import {compiler, OutputResult} from "../../compiler";
import DownloadSnackbar from "../../components/DownloadSnackbar/DownloadSnackbar";
import Results from "../../components/Results/Results";
import Footer from "../../components/Footer/Footer";
import YourCode from "../../components/YourCode/YourCode";
import {queryCache, useQuery} from "react-query";

const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const lastRunningCode = localStorage.getItem('lastRunningCode')

const Main = (): React.ReactElement => {
    const [source, setSource] = useState<string>(DEFAULT_SOURCE);
    const [input, setInput] = useState<string>('');

    const [result, setResult] = useState<OutputResult>({
        outputItem: [],
        outputString: ''
    });

    const params = window.location.search;

    // Below are parameters that control the behavior

    // The URL of a script. If user pass a path of script as URL, then download and load into code editor
    let yourUrl = null;

    // If auto_run=true, then hedgehog lab will run the script automatically after loading the code
    let autoRun = false;

    // Code is an encoded string of script. If code string is not empty, hedgehog lab will decode the parameter string and load to code editor
    let code = "print('hello world');";


    if (lastRunningCode) {
        code = lastRunningCode as string
    }

    if (params) {
        const obj = Qs.parse(params, {ignoreQueryPrefix: true});
        yourUrl = obj.your_url ? (obj.your_url as string) : null;
        autoRun = obj.auto_run === 'true';
        code = obj.code ? (obj.code as string) : "";
    }


    const {isFetching: isLoading, refetch} = useQuery<OutputResult,
        readonly [string, string]
        //Error
        >(['compiler', input], compiler, {
        retry: false,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        enabled: false,
        onSuccess: (result: OutputResult) => {
            setResult(result);
        },
        onError: (lastError: any) => {
            // It's necessary to output all exception messages to user at output textbox,
            // including execution runtime exception and compiling exception -Lidang
            console.log('Hedgehog Lab error: \n' + lastError.toString());
            setResult({
                outputItem: [],
                outputString: lastError.toString()
            });
        }
    });


    const handleCompileAndRun = () => {
        setResult({
            outputItem: [],
            outputString: ''
        });
        if (source === input) {
            refetch({force: true} as any);
        } else {
            setInput(source);
        }
    };

    useEffect(() => {
        if (!!input) refetch({force: true} as any);
    }, [input, refetch]);

    useEffect(() => {
        queryCache.cancelQueries(['compiler']);
    }, []);

    useEffect(() => {
        if (!!code) {
            setSource(code);
            if (autoRun) {
                setResult({
                    outputItem: [],
                    outputString: ''
                });
                setInput(code)
            }
        }


    }, [autoRun, code])

    return (
        <div>
            <Box display={"flex"}>
                <Box flexGrow={1}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Grid
                                container
                                style={{
                                    height: 'calc(100vh - 174px)'
                                }}>
                                <Grid item xs={12} md={6}>
                                    <YourCode
                                        handleCompileAndRun={handleCompileAndRun}
                                        setSource={setSource}
                                        source={source}
                                        loading={isLoading}
                                    />
                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    md={6}
                                    style={{
                                        height: 'calc(100vh - 64px)',
                                        overflowY: 'auto'
                                    }}>
                                    <Results
                                        executionOutputList={result.outputItem}
                                        executionOutputString={result.outputString}
                                        loading={isLoading}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Footer/>
                </Box>
            </Box>

            {((yourUrl)) && (
                <DownloadSnackbar
                    setResult={setResult}
                    setSource={setSource}
                    setInput={setInput}
                    yourUrl={yourUrl}
                    autoRun={autoRun}
                />
            )}
        </div>
    );
};


export default Main
