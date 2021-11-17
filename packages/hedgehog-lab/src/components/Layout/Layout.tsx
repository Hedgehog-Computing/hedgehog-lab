import React from "react";
import SideBar from "./SideBar/SideBar";
import {Box, CssBaseline, Toolbar} from "@mui/material";
import {Outlet} from "react-router-dom";
import TopBar from "./TopBar/TopBar";

const Layout = (): React.ReactElement => {
    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <TopBar/>
            <SideBar/>

            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>

                <Outlet/>
            </Box>
        </Box>
    )
}

export default Layout
