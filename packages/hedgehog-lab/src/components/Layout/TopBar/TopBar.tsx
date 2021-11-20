import React, {useCallback} from "react";
import {Divider, IconButton, Link, styled, Toolbar, Typography, useTheme} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import AuthDialog from "../../User/Auth/AuthDialog/AuthDialog";
import ShareDialog from "../../Share/ShareDialog/ShareDialog";
import RightButton from "./RightButton/RightButton";
import {MenuOutlined} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {sideBarOpenState} from "../RLayoutStates";
import {Link as RouterLink,} from 'react-router-dom';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const TopBar = (): React.ReactElement => {
    const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState)
    const theme = useTheme()

    const handleSideBarOpen = useCallback(() => {
        setSideBarOpen(!sideBarOpen)
    }, [sideBarOpen])

    return (
        <AppBar open={sideBarOpen} position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}} elevation={0}
                color="inherit">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleSideBarOpen}>
                    <MenuOutlined/>
                </IconButton>

                <Link component={RouterLink} to={'/'}>
                    <Typography
                        variant="h6"
                        noWrap
                        color={theme.palette.text.primary}
                        sx={{
                            fontWeight: "bold",
                            letterSpacing: 0,
                            width: '100%'
                        }}>
                        Hedgehog Lab
                    </Typography>
                </Link>

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
