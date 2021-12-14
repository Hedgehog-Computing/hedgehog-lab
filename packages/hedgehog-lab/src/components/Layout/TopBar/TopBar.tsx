import React, {useCallback} from "react";
import {
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemIcon,
    ListItemText,
    styled,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from "@mui/material/Box";
import AuthDialog from "../../Auth/Dialog/AuthDialog";
import ShareDialog from "../../Share/ShareDialog";
import RightButton from "./RightButton";
import {MenuOutlined} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink,} from 'react-router-dom';

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
    }, [setSideBarOpen, sideBarOpen])


    return (
        <AppBar open={sideBarOpen} position="fixed"
                sx={{
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                elevation={0}
                color="inherit">
            <Toolbar disableGutters>

                <ListItem>
                    <ListItemIcon onClick={handleSideBarOpen}>
                        <IconButton>
                            <MenuOutlined/>
                        </IconButton>
                    </ListItemIcon>

                    <Link component={RouteLink}
                          to={`/`}
                          sx={{display: 'block'}}>
                        <ListItemText sx={{display: {xs: 'none', md: 'block'}}}>
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
                        </ListItemText>
                    </Link>
                </ListItem>


                <Box display={'flex'} justifyContent={'end'} width={'100%'} mr={'10px'}>
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
