import React, {useEffect, useState} from "react";
import Qs from 'qs';
import {Grid, styled} from '@mui/material';
import {compiler} from "../../compiler";
import Results from "../../components/Results/Results";
import Footer from "../../components/DeprecatedCode/Footer/Footer";
import YourCode from "../../components/YourCode/YourCode";
import {queryCache} from "react-query";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {compilerReFetchState, editorCodeState} from "../../components/YourCode/RYourCodeStates";
import {sideBarWidth} from "../../components/YourCode/Config/SideBar";
import {sideBarOpenState} from "../../components/Layout/RLayoutStates";

const DEFAULT_SOURCE = `//write your code here
print("hello world")
`;

const lastRunningCode = localStorage.getItem('lastRunningCode')

const MainContent = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sideBarWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));


const Main = (): React.ReactElement => {
    const setEditorCode = useSetRecoilState<string>(editorCodeState)
    const setCompilerReFetch = useSetRecoilState<boolean>(compilerReFetchState);
    const sideBarOpen = useRecoilValue(sideBarOpenState)
    // If auto_run=true, then hedgehog lab will run the script automatically after loading the code
    const [autoRun, setAutoRun] = useState<boolean>(false)

    const params = window.location.search;
    // Below are parameters that control the behavior
    // Code is an encoded string of script. If code string is not empty, hedgehog lab will decode the parameter string and load to code editor
    let code = DEFAULT_SOURCE;


    if (lastRunningCode) {
        code = lastRunningCode as string
    }

    useEffect(() => {
        if (params) {
            const obj = Qs.parse(params, {ignoreQueryPrefix: true});
            setAutoRun(obj.auto_run === 'true')
            code = obj.code ? (obj.code as string) : "";
        }
    }, [params])

    useEffect(() => {
        queryCache.cancelQueries(['compiler']);
    }, []);

    useEffect(() => {
        setEditorCode(code)
    }, [code])

    useEffect(() => {
        if (autoRun) setCompilerReFetch(true)
    }, [autoRun])

    return (
        <MainContent open={sideBarOpen}>
            <Grid container>
                <Grid item xs={12}>
                    <Grid
                        container
                        style={{
                            height: 'calc(100vh - 174px)'
                        }}>
                        <Grid item xs={12} md={6}>
                            <YourCode/>
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            md={6}
                            style={{
                                height: 'calc(100vh - 64px)',
                                overflowY: 'auto'
                            }}>
                            <Results/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Footer/>
        </MainContent>
    );
};


export default Main
