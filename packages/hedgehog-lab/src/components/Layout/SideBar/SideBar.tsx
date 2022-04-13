import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {tutorials} from "../../../tutorials";
import {
    Box,
    Button,
    Collapse,
    Divider,
    Drawer,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
    useTheme,
} from "@mui/material";
import {
    CreateOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    FiberManualRecord,
    TextSnippetOutlined,
    TimelineOutlined,
    TravelExploreOutlined,
} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {sideBarWidth} from "../../YourCode/Config/SideBar";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink, useNavigate} from "react-router-dom";
import {bindPopover, bindTrigger, usePopupState,} from "material-ui-popup-state/hooks";
import {useEditor} from "../../../hooks/useEditor";
import {useAuth} from "../../../hooks/useAuth";
import AuthDialog from "../../Auth/Dialog/AuthDialog";

const NewSnippet = () => {
    const theme = useTheme();
    const popupState = usePopupState({
        variant: "popover",
        popupId: "newSnippetPopup",
    });

    const navigate = useNavigate();
    const {setEditorCode} = useEditor();

    const handleSetEditorCode = useCallback(
        (editorCode: any) => {
            setEditorCode(editorCode);
            navigate("/");
            popupState.close();
        },
        [navigate, popupState, setEditorCode]
    );

    return (
        <>
            <ListItemButton {...bindTrigger(popupState)}>
                <ListItemIcon>
                    <CreateOutlined/>
                </ListItemIcon>

                <ListItemText>New Snippet</ListItemText>
            </ListItemButton>

            <Menu
                {...bindPopover(popupState)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
            >
                <Box sx={{py: 1}}>
                    <MenuItem
                        onClick={() => {
                            handleSetEditorCode(" ");
                        }}
                    >
                        <Typography
                            color={theme.palette.text.primary}
                            variant={"body2"}
                            component={"span"}
                            sx={{ml: "18px"}}
                        >
                            Empty script
                        </Typography>
                    </MenuItem>
                    <Divider/>
                    {tutorials.map((tutorial, index) => {
                        return (
                            <MenuItem
                                key={index}
                                onClick={() => {
                                    handleSetEditorCode(tutorial.source);
                                }}
                            >
                                <Typography
                                    color={theme.palette.text.primary}
                                    variant={"body2"}
                                    component={"span"}
                                    sx={{ml: "18px"}}
                                >
                                    {tutorial.description}
                                </Typography>
                            </MenuItem>
                        );
                    })}
                </Box>
            </Menu>
        </>
    );
};

const ExploreSnippet = () => {
    return (
        <Link
            to="/explore"
            component={RouteLink}
            sx={{
                display: "block",
                color: "initial",
                "&:hover": {
                    textDecoration: "none",
                },
            }}
        >
            <ListItemButton>
                <ListItemIcon>
                    <TravelExploreOutlined/>
                </ListItemIcon>

                <ListItemText>Explore</ListItemText>
            </ListItemButton>
        </Link>
    );
};

const SideBar = (): React.ReactElement => {
    const [collapseOpen, setCollapseOpen] = useState(true);
    const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);

    const theme = useTheme();
    const lgBreakpoint = window.matchMedia("(min-width: 1910px)");
    const lgBreakpointMatches = lgBreakpoint.matches;
    const {auth} = useAuth();

    const handleCollapseClick = useCallback(() => {
        setCollapseOpen(!collapseOpen);
    }, [collapseOpen]);

    useEffect(() => {
        setSideBarOpen(lgBreakpointMatches);
    }, [lgBreakpointMatches, setSideBarOpen]);

    interface IFooterLink {
        text: string;
        href: string;
    }

    const FooterLink: React.FC<IFooterLink> = (props) => {
        return (
            <Link
                underline="hover"
                sx={{cursor: "pointer"}}
                href={props.href}
                target="_blank"
            >
                {props.text}
            </Link>
        );
    };
    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={sideBarOpen}
            sx={{
                width: sideBarWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: sideBarWidth,
                    boxSizing: "border-box",
                },
                borderRight: sideBarOpen ? "1px solid rgba(0, 0, 0, 0.12)" : "",
            }}
        >
            <Toolbar/>

            <Box
                sx={{
                    overflow: "auto",
                    display: "grid",
                    height: "100%",
                    [`& .MuiListItemText-root span`]: {
                        fontWeight: "bold",
                    },
                }}
            >
                <List disablePadding>
                    <NewSnippet/>

                    <Divider/>

                    <ExploreSnippet/>

                    <Divider/>

                    {auth.isAuthenticated ? (
                        <>
                            <Link
                                to="/timeline"
                                component={RouteLink}
                                sx={{
                                    display: "block",
                                    color: "initial",
                                    "&:hover": {
                                        textDecoration: "none",
                                    },
                                }}
                            >
                                {" "}
                                <ListItem button>
                                    <ListItemIcon>
                                        <TimelineOutlined/>
                                    </ListItemIcon>
                                    <ListItemText>Timeline</ListItemText>
                                </ListItem>
                            </Link>

                            <Divider/>

                            <ListItem button onClick={handleCollapseClick}>
                                <ListItemIcon>
                                    <TextSnippetOutlined
                                        color={collapseOpen ? "primary" : "inherit"}
                                    />
                                </ListItemIcon>
                                <ListItemText>My Snippets</ListItemText>
                                {collapseOpen ? (
                                    <ExpandLessOutlined color={"primary"}/>
                                ) : (
                                    <ExpandMoreOutlined/>
                                )}
                            </ListItem>
                            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                                <List
                                    component="div"
                                    disablePadding
                                    sx={{
                                        borderLeft: "solid 1px",
                                        ml: "27px",
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        borderColor: theme.palette.primary[500],
                                    }}
                                >
                                    {tutorials.map((tutorial, index) => {
                                        return (
                                            <ListItemButton key={index}>
                                                <ListItemText>
                                                    <FiberManualRecord
                                                        sx={{
                                                            fontSize: "5px",
                                                            color: theme.palette.grey[500],
                                                            ml: "6px",
                                                        }}
                                                    />

                                                    <Typography
                                                        color={theme.palette.text.primary}
                                                        variant={"body2"}
                                                        component={"span"}
                                                        sx={{ml: "18px"}}
                                                    >
                                                        {tutorial.description}
                                                    </Typography>
                                                </ListItemText>
                                            </ListItemButton>
                                        );
                                    })}
                                </List>

                                <Box sx={{textAlign: "center", my: 1}}>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component={RouteLink}
                                        to={`/u/${auth.user.firstname}`}
                                    >
                                        All
                                    </Button>
                                </Box>
                            </Collapse>
                        </>
                    ) : (
                        <AuthDialog/>
                    )}
                </List>

                <Box sx={{alignSelf: "end", m: 1}}>
                    @2022 hhlab ·{" "}
                    <FooterLink
                        href="https://github.com/Hedgehog-Computing/hedgehog-lab"
                        text="GitHub"
                    />{" "}
                    · <FooterLink href="https://hedgehog-book.github.io/" text="Book"/>
                </Box>
            </Box>
        </Drawer>
    );
};

export default SideBar;
