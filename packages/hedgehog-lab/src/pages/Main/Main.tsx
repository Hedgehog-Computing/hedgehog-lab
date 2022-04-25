import React, {useEffect} from "react";
import {Box, Grid, Skeleton} from "@mui/material";
import Results from "../../components/Results/Results";
import YourCode from "../../components/YourCode/YourCode";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../states/RLayoutStates";
import {useEditor} from "../../hooks/useEditor";
import {useEditorMeta} from "../../components/Snippet/Save/SaveState";

const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const Main = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    const {isUserSnippetPage, data, error} = useEditorMeta()
    const {editorCode, setEditorCode} = useEditor();

    useEffect(() => {
        if (!isUserSnippetPage) {
            const lastRunningCode = localStorage.getItem("lastRunningCode");
            if (editorCode === "") {
                setEditorCode(lastRunningCode);
            }
        } else {
            setEditorCode(data?.content ?? DEFAULT_SOURCE)
        }
    }, [data, editorCode, isUserSnippetPage, setEditorCode]);
    return (
        <>
            {data ? (
                    <Grid container>
                        <Grid
                            item
                            xs={12}
                            md={6}
                            sx={{display: {xs: resultFullScreen ? "none" : "block"}}}
                        >
                            <YourCode/>
                        </Grid>

                        <Grid item xs={12} md={resultFullScreen ? 12 : 6}>
                            <Results/>
                        </Grid>
                    </Grid>
                ) :
                <Box p={2}>
                    {Array.from([1, 2, 3, 4, 5]).map((_, index) => (
                        <Skeleton key={index} width={'100%'} height={'50px'}/>
                    ))}
                </Box>
            }
        </>
    );
};

export default Main;
