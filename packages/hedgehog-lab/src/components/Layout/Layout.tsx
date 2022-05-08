import React from "react";
import SideBar from "./SideBar/SideBar";
import {Box, CssBaseline, styled, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import TopBar from "./TopBar/TopBar";
import {sideBarWidth} from "../YourCode/Config/SideBar";
import {useRecoilValue} from "recoil";
import {sideBarOpenState} from "../../states/RLayoutStates";
import useApp from "../../hooks/useApp";

const MainContent = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
})<{
    open?: boolean;
}>(({theme, open}) => ({
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${sideBarWidth}px`,
    ...(open && {
        transition: theme.transitions.create("margin", {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const Layout = (): React.ReactElement => {
    const sideBarOpen = useRecoilValue(sideBarOpenState);
    const {isDevPath} = useApp()

    return (
        <Box sx={{display: "flex"}}>
            <CssBaseline/>

            <TopBar/>

            <SideBar/>

            <Box component="main" sx={{flexGrow: 1}}>
                <Toolbar/>
                {isDevPath && <Box mt={2}/>}
                <MainContent open={sideBarOpen}>
                    <Box sx={{overflow: "hidden"}}>
                        <Outlet/>
                    </Box>
                </MainContent>
            </Box>
        </Box>
    );
};

export default Layout;
