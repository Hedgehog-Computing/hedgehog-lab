import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {
    CreateOutlined,
    ExpandLessOutlined,
    ExpandMoreOutlined,
    FiberManualRecord,
    HomeOutlined,
    PersonOutline,
    TextSnippetOutlined,
    TimelineOutlined,
    TravelExploreOutlined
} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {sideBarWidth} from "../../YourCode/Config/SideBar";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink, useNavigate} from "react-router-dom";
import {usePopupState} from "material-ui-popup-state/hooks";
import {useEditor} from "../../../hooks/useEditor";
import {useAuth} from "../../../hooks/useAuth";
import AuthDialog from "../../Auth/Dialog/AuthDialog";
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";
import useApp from "../../../hooks/useApp";
import {blue} from "@mui/material/colors";

const NewSnippet = () => {
    const theme = useTheme();
    const popupState = usePopupState({
        variant: "popover",
        popupId: "newSnippetPopup"
    });

    const navigate = useNavigate();
    const {setEditorCode} = useEditor();

    const handleSetEditorCode = useCallback(
        (description: any) => {
            navigate(`/example/${description}`);
            popupState.close();
        },
        [navigate, popupState, setEditorCode]
    );

    return (
        <>
            <Link
                to="/example/Empty"
                component={RouteLink}
                sx={{
                    display: "block",
                    color: "initial",
                    "&:hover": {
                        textDecoration: "none"
                    }
                }}
            >
                <ListItemButton>
                    <ListItemIcon>
                        <CreateOutlined/>
                    </ListItemIcon>

                    <ListItemText>New Snippet</ListItemText>
                </ListItemButton>
            </Link>
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
                    textDecoration: "none"
                }
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

const CurrentSnippets = () => {

    const theme = useTheme();
    const [collapseOpen, setCollapseOpen] = useState(true);
    const {auth} = useAuth();
    const {
        data,
        error
    } = useSWR([`/snippets/mySnippets`], fetcher, {refreshInterval: process.env.NODE_ENV === "development" ? 0 : 1000});
    const handleCollapseClick = useCallback(() => {
        setCollapseOpen(!collapseOpen);
    }, [collapseOpen]);

    return (
        <>
            {data && data?.response?.result.length > 0 && (
                <>
                    <ListItemButton onClick={handleCollapseClick}>
                        <ListItemIcon>
                            <TextSnippetOutlined
                                color={collapseOpen ? "primary" : "inherit"}
                            />
                        </ListItemIcon>
                        <ListItemText>Current</ListItemText>
                        {collapseOpen ? (
                            <ExpandLessOutlined color={"primary"}/>
                        ) : (
                            <ExpandMoreOutlined/>
                        )}
                    </ListItemButton>
                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <List
                            dense
                            disablePadding
                            component="div"
                            sx={{
                                borderLeft: "solid 1px",
                                ml: "27px",
                                borderColor: blue[500]
                            }}
                        >
                            {data && data.response.result.map((item: { title: any; }, index: string | number | null | undefined) => {
                                return (
                                    <Link component={RouteLink} to={`s/${auth.user.username}/${item.title}`}
                                          key={index}
                                          sx={{
                                              display: "block",
                                              color: "initial",
                                              "&:hover": {
                                                  textDecoration: "none"
                                              }
                                          }}>
                                        <ListItemButton>
                                            <ListItemText>
                                                <FiberManualRecord
                                                    sx={{
                                                        fontSize: "5px",
                                                        color: theme.palette.grey[500],
                                                        ml: "6px"
                                                    }}
                                                />

                                                <Typography
                                                    color={theme.palette.text.primary}
                                                    variant={"body2"}
                                                    component={"span"}
                                                    sx={{ml: "18px"}}
                                                >
                                                    {item.title.slice(0, 10)}
                                                </Typography>
                                            </ListItemText>
                                        </ListItemButton>
                                    </Link>
                                );
                            })}
                        </List>
                    </Collapse>
                </>
            )}
        </>
    );
};

const SideBar = (): React.ReactElement => {
    const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);


    const lgBreakpoint = window.matchMedia("(min-width: 1910px)");
    const lgBreakpointMatches = lgBreakpoint.matches;
    const {auth} = useAuth();
    const {isDevPath} = useApp();

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
                    boxSizing: "border-box"
                },
                borderRight: sideBarOpen ? "1px solid rgba(0, 0, 0, 0.12)" : ""
            }}
        >
            <Toolbar/>

            {isDevPath && <Box mt={2}/>}
            <Box
                sx={{
                    overflow: "auto",
                    display: "grid",
                    height: "100%",
                    [`& .MuiListItemText-root span`]: {
                        fontWeight: "bold"
                    },
                }}
            >
                <List dense sx={{
                    px: '5px', '& .MuiListItemButton-root': {
                        my: '2px'
                    }
                }}>
                    <Link
                        to="/"
                        component={RouteLink}
                        sx={{
                            display: "block",
                            color: "initial",
                            "&:hover": {
                                textDecoration: "none"
                            }
                        }}
                    >
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeOutlined/>
                            </ListItemIcon>

                            <ListItemText>Home</ListItemText>
                        </ListItemButton>
                    </Link>


                    <NewSnippet/>


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
                                        textDecoration: "none"
                                    }
                                }}
                            >
                                {" "}
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TimelineOutlined/>
                                    </ListItemIcon>
                                    <ListItemText>Timeline</ListItemText>
                                </ListItemButton>
                            </Link>


                            <CurrentSnippets/>

                            <Link
                                to={`/u/${auth.user.username}`}
                                component={RouteLink}
                                sx={{
                                    display: "block",
                                    color: "initial",
                                    "&:hover": {
                                        textDecoration: "none"
                                    }
                                }}
                            >
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PersonOutline/>
                                    </ListItemIcon>

                                    <ListItemText>My Profile</ListItemText>
                                </ListItemButton>
                            </Link>
                        </>
                    ) : (
                        <AuthDialog/>
                    )}
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBar;
