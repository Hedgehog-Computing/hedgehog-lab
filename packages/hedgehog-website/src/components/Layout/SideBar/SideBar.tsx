import * as React from "react";
import {useCallback, useEffect, useState} from "react";
import {Box, Collapse, Divider, Link, List, ListItemButton, ListItemText, Typography, useTheme} from "@mui/material";
import {CreateOutlined, ExploreOutlined, HomeOutlined, PersonOutline, TimelineOutlined} from "@mui/icons-material";
import {useRecoilState} from "recoil";
import {sideBarOpenState} from "../../../states/RLayoutStates";
import {Link as RouteLink} from "react-router-dom";
import {useAuth} from "../../../hooks/useAuth";
import AuthDialog from "../../Auth/Dialog/AuthDialog";
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";
import useApp from "../../../hooks/useApp";
import {blue, grey} from "@mui/material/colors";
import SideList from "./_sideList";
import {ResponseDrawer} from "../../styled";

const CurrentSnippets = () => {

    const theme = useTheme();
    const [collapseOpen, setCollapseOpen] = useState(true);
    const {auth} = useAuth();
    const {
        data
    } = useSWR([`/snippets/mySnippets`], fetcher, {refreshInterval: process.env.NODE_ENV === "development" ? 0 : 1000});
    const handleCollapseClick = useCallback(() => {
        setCollapseOpen(!collapseOpen);
    }, [collapseOpen]);

    return (
        <>
            {data && data?.response?.result.length > 0 && (
                <>
                    <ListItemButton onClick={handleCollapseClick} sx={{
                        borderRadius: 10,
                        height: '28px'
                    }}>
                        {/*<ListItemIcon>*/}
                        {/*    <TextSnippetOutlined*/}
                        {/*        color={collapseOpen ? "primary" : "inherit"}*/}
                        {/*    />*/}
                        {/*</ListItemIcon>*/}
                        <ListItemText sx={{
                            '& .MuiTypography-root': {
                                fontSize: '12px'
                            }
                        }}>Current</ListItemText>
                        {/*{collapseOpen ? (*/}
                        {/*    <ExpandLessOutlined color={"primary"}/>*/}
                        {/*) : (*/}
                        {/*    <ExpandMoreOutlined/>*/}
                        {/*)}*/}
                    </ListItemButton>
                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <List
                            dense
                            disablePadding
                            component="div"
                            sx={{
                                borderLeft: "solid 1px",
                                ml: "-5px",
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
                                              },
                                              borderRadius: 10
                                          }}>
                                        <ListItemButton dense sx={{
                                            borderRadius: 10,
                                            height: '28px'
                                        }}>
                                            <ListItemText>
                                                {/*<FiberManualRecord*/}
                                                {/*    sx={{*/}
                                                {/*        fontSize: "5px",*/}
                                                {/*        color: theme.palette.grey[500],*/}
                                                {/*        ml: "6px"*/}
                                                {/*    }}*/}
                                                {/*/>*/}

                                                <Typography
                                                    color={theme.palette.text.primary}
                                                    variant={"body2"}
                                                    component={"span"}
                                                    sx={{fontSize: '12px', ml: '4px'}}
                                                >
                                                    {item.title.slice(0, 7)}..
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
    const lgBreakpoint = window.matchMedia("(min-width: 1600px)");
    const lgBreakpointMatches = lgBreakpoint.matches;
    const {auth} = useAuth();
    const {isDevPath} = useApp();

    useEffect(() => {
        setSideBarOpen(lgBreakpointMatches);
    }, [lgBreakpointMatches, setSideBarOpen]);

    const publicList = [
        {link: '/', icon: <HomeOutlined/>, text: 'Home'},
        {link: '/e/example/Empty', icon: <CreateOutlined/>, text: 'New'},
        {link: '/explore', icon: <ExploreOutlined/>, text: 'Explore'},
    ]

    return (
        <ResponseDrawer
            variant="persistent"
            anchor="left"
            open={sideBarOpen}
            sx={{
                borderRight: sideBarOpen ? "1px solid rgba(0, 0, 0, 0.12)" : "",

            }}
        >
            {isDevPath && <Box mt={2}/>}
            <Box
                sx={{
                    overflow: "auto",
                    display: "grid",
                    height: "100%",
                    [`& .MuiListItemText-root span`]: {
                        fontWeight: "bold"
                    },
                    bgcolor: grey[100],
                    mt: '32px'
                }}
            >
                <List dense sx={{
                    px: '5px',
                }}>
                    <SideList data={publicList}/>
                    <Divider/>
                    {auth.isAuthenticated ? (
                        <>
                            <SideList data={[{text: 'Timeline', icon: <TimelineOutlined/>, link: '/timeline'}]}/>
                            <CurrentSnippets/>
                            <SideList data={[{
                                text: 'My Profile',
                                icon: <PersonOutline/>,
                                link: `/u/${auth.user.username}`
                            }]}/>
                        </>
                    ) : (
                        <AuthDialog/>
                    )}
                </List>
            </Box>
        </ResponseDrawer>
    );
};

export default SideBar;
