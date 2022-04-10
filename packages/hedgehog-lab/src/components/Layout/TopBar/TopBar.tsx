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
    useTheme,
} from "@mui/material";
import MuiAppBar, {AppBarProps as MuiAppBarProps} from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import {MenuOutlined} from "@mui/icons-material";
import {useRecoilState, useRecoilValue} from "recoil";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink, matchPath, useLocation, useParams,} from "react-router-dom";
import YourCodeHeader from "../../YourCode/Header/YourCodeHeader";
import {sideBarWidth} from "../../YourCode/Config/SideBar";
import AccountMenu from "../../Auth/Account/AccountMenu";

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

    return (
        <Box width={"100%"}>
            <ListItem>
                <ListItemIcon onClick={handleSideBarOpen}>
                    <IconButton>
                        <MenuOutlined/>
                    </IconButton>
                </ListItemIcon>

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
            </ListItem>
        </Box>
    );
};

const Header = (): React.ReactElement => {
    const {snippetID} = useParams();
    const {pathname} = useLocation();
    const isSnippetsPath = matchPath("snippets/new", pathname);
    const isTutorialsPath = matchPath("tutorial/*", pathname);
    const isHomePath = matchPath("", pathname);

    if (
        isHomePath ||
        isTutorialsPath ||
        isSnippetsPath ||
        snippetID !== undefined
    ) {
        return <YourCodeHeader/>;
    }

    return (
        <>
            <Box sx={{display: 'flex', ml: 'auto'}}>
                <AccountMenu/>
            </Box>
        </>
    );
};

const TopBar = (): React.ReactElement => {
    const sideBarOpen = useRecoilValue(sideBarOpenState);
    
    return (
        <AppBar
            open={sideBarOpen}
            position="fixed"
            sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(20px)",
                background: "rgba(255, 255, 255, 0.7)",
                transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            }}
            elevation={0}
            color="inherit"
        >
            <Toolbar disableGutters sx={{mr: 2}}>
                <Box minWidth={sideBarWidth}>
                    <Brand/>
                </Box>

                <Header/>
            </Toolbar>

            <Divider/>
        </AppBar>
    );
};

export default TopBar;
