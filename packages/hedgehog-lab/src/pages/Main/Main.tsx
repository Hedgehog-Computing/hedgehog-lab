import React, {useEffect} from "react";
import {Box, Grid, Skeleton} from "@mui/material";
import Results from "../../components/Results/Results";
import YourCode from "../../components/YourCode/YourCode";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../states/RLayoutStates";
import {useEditor} from "../../hooks/useEditor";
import {useNavigate} from "react-router-dom";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import {useEffectOnce} from "react-use";

const DEFAULT_SOURCE = ``;

const Main = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    const {isUserSnippetPage, data, error} = useEditorMeta()
    const {editorCode, setEditorCode} = useEditor();
    const navigate = useNavigate()
    useEffectOnce(() => {
        if (!isUserSnippetPage) {
            const lastRunningCode = localStorage.getItem("lastRunningCode");
            if (editorCode === "") {
                setEditorCode(lastRunningCode);
            }
        }
    });

    useEffect(() => {
        setEditorCode(data?.content ?? DEFAULT_SOURCE)
    }, [data?.content, setEditorCode])

    return (
        <>

            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: {xs: resultFullScreen ? "none" : "block"}}}
                >
                    {(data || error) || isUserSnippetPage ? <YourCode/> :
                        (
                            <Box p={2}>
                                {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
                                    <Skeleton key={index} width={'100%'} height={'50px'}/>
                                ))}
                            </Box>
                        )}

                </Grid>

                <Grid item xs={12} md={resultFullScreen ? 12 : 6}>
                    <Results/>
                </Grid>
            </Grid>

        </>
    );
};

export default Main;
