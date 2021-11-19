import * as React from 'react';
import {useCallback, useState} from 'react';
import {tutorials} from "../../../tutorials";
import {
    Box,
    Collapse,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {BookOutlined, ExpandLessOutlined, ExpandMoreOutlined, FiberManualRecord} from "@mui/icons-material";
import {useSetRecoilState} from "recoil";
import {editorCodeState} from "../../YourCode/RYourCodeStates";

const drawerWidth = 240;

const SideBar = (): React.ReactElement => {
    const [collapseOpen, setCollapseOpen] = useState(true)
    const setEditorCode = useSetRecoilState(editorCodeState)
    const theme = useTheme()

    const handleCollapseClick = useCallback(() => {
        setCollapseOpen(!collapseOpen);
    }, [collapseOpen])

    const handleSetEditorCode = useCallback((editorCode) => {
        setEditorCode(editorCode)
    }, [])

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {width: drawerWidth, boxSizing: 'border-box'},
                borderRight: '1px solid rgba(0, 0, 0, 0.12)'
            }}
        >
            <Toolbar/>

            <Box sx={{overflow: 'auto'}}>
                <List>
                    <ListItem button onClick={handleCollapseClick}>
                        <ListItemIcon>
                            <BookOutlined color={'primary'}/>
                        </ListItemIcon>
                        <ListItemText>
                            <Box fontWeight={"bold"}>
                                Tutorials
                            </Box>
                        </ListItemText>
                        {collapseOpen ? <ExpandLessOutlined color={'primary'}/> : <ExpandMoreOutlined/>}
                    </ListItem>

                    <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding
                              sx={{
                                  borderLeft: 'solid 1px',
                                  ml: '27px',
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  // @ts-ignore
                                  borderColor: theme.palette.primary[500]
                              }}>
                            {tutorials.map((tutorial, index) => {
                                return (
                                    <ListItem button key={index} onClick={
                                        () => {
                                            handleSetEditorCode(tutorial.source)
                                        }
                                    }>
                                        <ListItemText>
                                            <FiberManualRecord
                                                sx={{fontSize: '5px', color: theme.palette.grey[500], ml: '6px'}}/>

                                            <Typography variant={'body2'} component={'span'} sx={{ml: '18px'}}>
                                                {tutorial.description}
                                            </Typography>
                                        </ListItemText>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Collapse>

                    <Divider/>

                </List>
            </Box>
        </Drawer>
    );
}

export default SideBar
