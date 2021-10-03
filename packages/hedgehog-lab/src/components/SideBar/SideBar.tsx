import React, {useState} from 'react';
import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Tooltip,
    Typography
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import SideBarItem from './SideBarItem';
import {tutorials} from '../../tutorials';
import {Theme} from '@mui/material/styles';
import clsx from 'clsx';
import DelButton from "./DelButton";
import {ArrowBackOutlined, BookOutlined, CodeOutlined, MenuOutlined} from "@mui/icons-material";

interface SideBarProps {
    handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
    handleLoadFile: (str: string) => void;
    getLocalCodeList: () => void;
    localList: { description: string; source: string }[];
    source: string;
    siderBarOpen: boolean;
    setSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const drawerWidth = 230;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: 0
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar
        },
        drawerContainer: {
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100%',
            '&::-webkit-scrollbar': {
                display: 'fixed',
                width: 10,
                height: 1
            },
            '&::-webkit-scrollbar-thumb': {
                display: 'fixed',
                borderRadius: 10,
                '-webkit-box-shadow': 'inset 0 0 5px rgba(0,0,0,0.2)',
                background: '#535353'
            },
            '&::-webkit-scrollbar-track': {
                display: 'fixed',
                '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0)',
                borderRadius: 10,
                background: '#ccc'
            }
        },
        listItem: {
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            display: 'inline-block',
            width: '100%'
        },
        tooltip: {
            fontSize: '1rem'
        },
        nested: {
            paddingLeft: theme.spacing(4)
        }
    })
);

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
    const {
        handleLoadTutorial,
        siderBarOpen,
        handleLoadFile,
        getLocalCodeList,
        localList,
        setSideBarOpen
    } = props;

    const [open, setOpen] = useState('Tutorials');

    const classes = useStyles();

    const handleSideBarItemClick = (name: string) => {
        if (open === name) {
            setOpen('');
        } else {
            setOpen(name);
        }
    };

    const handleSideBarOpen = () => {
        setSideBarOpen(!siderBarOpen);
    };

    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: siderBarOpen,
                [classes.drawerClose]: !siderBarOpen
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: siderBarOpen,
                    [classes.drawerClose]: !siderBarOpen
                })
            }}>

            <Box sx={{borderRight: '1px solid rgba(0, 0, 0, 0.12)', height: '100%'}}>
                <List dense>
                    <ListItem disablePadding>
                        <ListItemText sx={{pl: '10px'}}>
                            <Typography
                                variant={'h6'}
                                sx={{
                                    fontWeight: 600,
                                    letterSpacing: 0
                                }}
                            >
                                Hedgehog Lab
                            </Typography>
                        </ListItemText>

                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleSideBarOpen}
                            size="large">
                            {siderBarOpen ? (
                                <ArrowBackOutlined style={{fontSize: '1.25rem'}}/>
                            ) : (
                                // <img
                                //   src={process.env.PUBLIC_URL + '/cat.png'}
                                //   style={{ height: '1.25rem' }}
                                //   alt="Hedgehog Lab Logo"
                                // />
                                <MenuOutlined style={{fontSize: '1.25rem'}}/>
                            )}
                        </IconButton>
                    </ListItem>

                    <Divider/>

                    <SideBarItem
                        icon={<BookOutlined/>}
                        handleSideBarItemClick={handleSideBarItemClick}
                        name={'Tutorials'}
                        open={open}>
                        {tutorials.map((tutorial: { description: React.ReactNode }, i: number) => {
                            return (
                                <Tooltip
                                    key={`${i}-${Date.now()}`}
                                    placement="top"
                                    title={tutorial.description as string}
                                    arrow>
                                    <ListItemButton dense>
                                        <ListItem
                                            dense
                                            onClick={(e) => handleLoadTutorial(e, i)}>
                                            <ListItemText>
                                                      <span>
                                                        {i + 1}. {tutorial.description}
                                                      </span>
                                            </ListItemText>
                                        </ListItem>
                                    </ListItemButton>
                                </Tooltip>
                            );
                        })}
                    </SideBarItem>

                    <SideBarItem
                        icon={<CodeOutlined/>}
                        handleSideBarItemClick={handleSideBarItemClick}
                        name={'Local Code'}
                        open={open}>
                        {localList.length > 0 &&
                        localList.map((item: { description: string; source: string }, i: number) => {
                            return (
                                <Tooltip
                                    key={`${i}-${Date.now()}`}
                                    placement="top"
                                    title={item.description}
                                    arrow>
                                    <ListItemButton dense>
                                        <ListItem
                                            secondaryAction={
                                                <DelButton name={item.description}
                                                           getLocalCodeList={getLocalCodeList}/>
                                            }
                                            dense
                                            onClick={() => handleLoadFile(item.source)}>
                                            <ListItemText>
                                                <span>{item.description}</span>
                                            </ListItemText>

                                        </ListItem>
                                    </ListItemButton>
                                </Tooltip>
                            );
                        })}
                    </SideBarItem>
                </List>
            </Box>
        </Drawer>
    );
};

export default SideBar;
