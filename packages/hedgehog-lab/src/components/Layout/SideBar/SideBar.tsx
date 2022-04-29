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
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";
import {useSnippet} from "../../../hooks/useSnippet";

const NewSnippet = () => {
    const theme = useTheme();
    const popupState = usePopupState({
        variant: "popover",
        popupId: "newSnippetPopup",
    });

    const navigate = useNavigate();
    const {setEditorCode} = useEditor();
    const {setCreateDialog} = useSnippet()

    const handleSetEditorCode = useCallback(
        (description: any) => {
            navigate(`/example/${description}`);
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
                            handleSetEditorCode("Empty");
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
                            <>
                                {tutorial.description !== 'Empty' && (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            handleSetEditorCode(tutorial.description);
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
                                )}
                            </>
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

const MySnippets = () => {

    const theme = useTheme();
    const [collapseOpen, setCollapseOpen] = useState(true);
    const {auth} = useAuth()
    const {data, error} = useSWR([`/snippets/mySnippets?token=${auth.accessToken}`], fetcher);
    const handleCollapseClick = useCallback(() => {
        setCollapseOpen(!collapseOpen);
    }, [collapseOpen]);

    return (
        <>
            <ListItemButton onClick={handleCollapseClick}>
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
            </ListItemButton>
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
                    {data && data.hits.map((item: { _source: { title: string; }; }, index: string | number | null | undefined) => {
                        return (
                            <Link component={RouteLink} to={`s/${auth.user.firstname}/${item._source.title}`}
                                  key={index}
                                  sx={{
                                      display: "block",
                                      color: "initial",
                                      "&:hover": {
                                          textDecoration: "none",
                                      },
                                  }}>
                                <ListItemButton>
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
                                            {item._source.title.slice(0, 10)}
                                        </Typography>
                                    </ListItemText>
                                </ListItemButton>
                            </Link>
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
    )
}

const SideBar = (): React.ReactElement => {
    const [sideBarOpen, setSideBarOpen] = useRecoilState(sideBarOpenState);


    const lgBreakpoint = window.matchMedia("(min-width: 1910px)");
    const lgBreakpointMatches = lgBreakpoint.matches;
    const {auth} = useAuth();


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
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TimelineOutlined/>
                                    </ListItemIcon>
                                    <ListItemText>Timeline</ListItemText>
                                </ListItemButton>
                            </Link>

                            <Divider/>

                            <MySnippets/>
                        </>
                    ) : (
                        <AuthDialog/>
                    )}
                </List>

                <Box sx={{alignSelf: "end", m: 1}}>
                    <Link href={'https://discord.gg/kmuBw8pRFf'} target={'_blank'} sx={{display: 'block', mb: 1}}>
                        <Button fullWidth variant={'outlined'}>
                            Join our Discord
                        </Button>
                    </Link>

                    @2022 hlab ·{" "}
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
