import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import YourCode from "../../components/YourCode/YourCode";
import Results from "../../components/Results/Results";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../states/RLayoutStates";
import {useEditor} from "../../hooks/useEditor";

const Draft = () => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );
    const {editorCode, setEditorCode} = useEditor();
    const lastRunningCode = localStorage.getItem("lastRunningCode");

    useEffect(() => {
        if (editorCode === "") {
            setEditorCode(lastRunningCode);
        }
    }, [editorCode])

    return (
        <>
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
        </>
    )
}

export default Draft;
