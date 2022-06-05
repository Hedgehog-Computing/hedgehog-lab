import React, {useEffect} from "react";
import {Grid} from "@mui/material";
import Results from "../../components/Results/Results";
import YourCode from "../../components/YourCode/YourCode";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../states/RLayoutStates";
import {useEditor} from "../../hooks/useEditor";
import {useMatch} from "react-router-dom";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import EditorLoading from "../../components/Base/Editor/Loading";
import {tutorials} from "../../tutorials";

const DEFAULT_SOURCE = localStorage.getItem('lastRunningCode') ?? '';

const Main = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    const {isUserSnippetPage, data, error} = useEditorMeta()
    const {editorCode, setEditorCode} = useEditor();
    const mathExamplePage = useMatch('/example/:exampleName')


    useEffect(() => {
        if (data?.response?.result?.content) {
            setEditorCode(data?.response?.result?.content ?? DEFAULT_SOURCE)
        }
    }, [data?.response, setEditorCode])

    useEffect(() => {
        if (mathExamplePage) {
            const title = mathExamplePage.params.exampleName
            const currentObj = tutorials.find(o => o.description === title) ?? {
                'description': 'Empty',
                'source': DEFAULT_SOURCE
            }

            setEditorCode(currentObj?.source)

        }
    }, [mathExamplePage?.params?.exampleName])

    return (
        <>

            <Grid container>
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{display: {xs: resultFullScreen ? "none" : "block"}}}
                >
                    {(data || error) ? <YourCode/> :
                        (
                            <EditorLoading/>
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
