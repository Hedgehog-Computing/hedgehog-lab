import {Box, Divider, Tab, Tabs, Toolbar} from "@mui/material";
import {CodeOutlined, StarBorderOutlined} from "@mui/icons-material";
import {Link as RouterLink, Outlet, useMatch} from "react-router-dom";
import React from "react";

const SnippetsLayout = (): React.ReactElement => {
    const routeMatch = useMatch('/snippets');
    const currentTab = routeMatch?.pathname;

    return (
        <>
            <Toolbar variant="dense" disableGutters>
                <Tabs aria-label="icon label tabs example"
                      value={currentTab ? currentTab : '/snippets/starred'}>
                    <Tab iconPosition={'start'} to={'/snippets'} value={'/snippets'}
                         icon={<CodeOutlined fontSize={'small'}/>}
                         label="All snippets" component={RouterLink}/>
                    <Tab iconPosition={'start'} to={'/snippets/starred'} value={'/snippets/starred'}
                         component={RouterLink}
                         icon={<StarBorderOutlined fontSize={'small'}/>} label="Starred"/>
                </Tabs>
            </Toolbar>

            <Divider/>

            <Box mt={'20px'}>
                <Outlet/>
            </Box>
        </>
    )
}

export default SnippetsLayout
