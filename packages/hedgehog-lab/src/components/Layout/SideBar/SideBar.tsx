import * as React from 'react';
import {useCallback} from 'react';
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
import {BookOutlined, ExpandLess, ExpandMore, FiberManualRecord} from "@mui/icons-material";

const drawerWidth = 240;

const SideBar = (): React.ReactElement => {
    const [open, setOpen] = React.useState(true);
    const theme = useTheme()

    const handleClick = useCallback(() => {
        setOpen(!open);
    }, [open])

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
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <BookOutlined color={'primary'}/>
                        </ListItemIcon>
                        <ListItemText>
                            <Box fontWeight={"bold"}>
                                Tutorials
                            </Box>
                        </ListItemText>
                        {open ? <ExpandLess color={'primary'}/> : <ExpandMore/>}
                    </ListItem>

                    <Collapse in={open} timeout="auto" unmountOnExit>
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
                                    <ListItem button key={index}>
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
