import React from "react";
import {AppBar, Divider, Toolbar, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import AuthDialog from "../../User/Auth/AuthDialog/AuthDialog";
import ShareDialog from "../../Share/ShareDialog/ShareDialog";
import RightButton from "./RightButton/RightButton";


const TopBar = (): React.ReactElement => {
    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} elevation={0} color="inherit">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                        fontWeight: "bold",
                        letterSpacing: 0,
                        width: '100%'
                    }}>
                    Hedgehog Lab
                </Typography>

                <Box display={'flex'} justifyContent={'end'} width={'100%'}>
                    <ShareDialog/>

                    <RightButton/>

                    <AuthDialog/>
                </Box>
            </Toolbar>

            <Divider/>
        </AppBar>
    )
}

export default TopBar
