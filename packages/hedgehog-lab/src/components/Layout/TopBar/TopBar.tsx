import React, {useCallback} from "react";
import {
    Divider,
    IconButton,
    Link,
    ListItem,
    ListItemIcon,
    ListItemText,
    Stack,
    styled,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {MenuOutlined} from "@mui/icons-material";
import {useRecoilState, useRecoilValue} from "recoil";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink,} from "react-router-dom";
import {sideBarWidth} from "../../YourCode/Config/SideBar";
import DevModeAlert from "./DevModeAlert";
import useApp from "../../../hooks/useApp";
import {grey} from "@mui/material/colors";
import CommunityButtons from "./_communityButtons";
import SaveState from "../../Snippet/Save/SaveState";
import AccountMenu from "../../Auth/Account/AccountMenu";
import {useEditor} from "../../../hooks/useEditor";
import FullScreenButton from "./_fullScreenButton";
import CompilerButton from "./_compilerButton";

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({theme, open}) => ({
    transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Brand = (): React.ReactElement => {
    const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);
    const theme = useTheme();
    const handleSideBarOpen = useCallback(() => {
        setSideBarOpen(!sideBarOpen);
    }, [setSideBarOpen, sideBarOpen]);
    const isPhoneMedia = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Box width={"100%"}>
            <ListItem>
                <ListItemIcon onClick={handleSideBarOpen}>
                    <IconButton>
                        <MenuOutlined/>
                    </IconButton>
                </ListItemIcon>

                {!isPhoneMedia && (
                    <Link component={RouteLink} to={`/`} sx={{display: "block"}}>
                        <ListItemText sx={{display: {xs: "none", md: "block"}}}>
                            <Typography
                                variant="h6"
                                noWrap
                                color={theme.palette.text.primary}
                                sx={{
                                    fontWeight: "bold",
                                    letterSpacing: 0,
                                    width: "100%",
                                }}
                            >
                                Hedgehog Lab
                            </Typography>
                        </ListItemText>
                    </Link>
                )}
            </ListItem>
        </Box>
    );
};

const Header = () => {
    const theme = useTheme()
    const isPhoneMedia = useMediaQuery(theme.breakpoints.down("md"));
    const {isEditorPage} = useEditor();

    return (
        <>
            <Stack direction={'row'} spacing={1} width={'100%'}>
                {!isPhoneMedia && (
                    <>
                        {isEditorPage && <FullScreenButton/>}
                        <Stack direction={'row'} spacing={1}>
                            <CommunityButtons/>
                        </Stack>
                    </>
                )}


                {!isEditorPage && (
                    <Stack direction={'row'} spacing={1} sx={{ml: 'auto'}}>
                        <AccountMenu/>
                    </Stack>
                )}

                {(isEditorPage && !isPhoneMedia) && (<CompilerButton/>)}
            </Stack>
        </>
    );
};

const TopBar = (): React.ReactElement => {
    const sideBarOpen = useRecoilValue(sideBarOpenState);
    const {isDevPath} = useApp()
    const theme = useTheme()
    const isPhoneMedia = useMediaQuery(theme.breakpoints.down("md"));
    const {isEditorPage} = useEditor();

    return (
        <AppBar
            open={sideBarOpen}
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(20px)",
                background: grey[100],
                transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
            elevation={0}
            color="inherit"
        >
            {isDevPath && <DevModeAlert/>}

            <Toolbar disableGutters sx={{mr: 2}}>
                <Box minWidth={isPhoneMedia ? '60px' : sideBarWidth}>
                    <Brand/>
                </Box>

                {(isEditorPage) && (
                    <SaveState/>
                )}

                <Box display={'flex'} ml={"auto"}>
                    <Header/>
                </Box>
            </Toolbar>
            <Divider/>
        </AppBar>
    );
};

export default TopBar;
