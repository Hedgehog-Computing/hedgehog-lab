import React, {HTMLAttributes} from 'react';
import {Collapse, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Typography} from '@mui/material';
import {KeyboardArrowDown, KeyboardArrowRight} from '@mui/icons-material';

interface SideBarItemProps {
    handleSideBarItemClick: (open: string) => void;
    open: string;
    name: string;
    icon: React.ReactElement
}

const SideBarItem: React.FC<SideBarItemProps & HTMLAttributes<HTMLElement>> = (
    props: SideBarItemProps & HTMLAttributes<HTMLElement>
) => {
    const {icon, open, name, handleSideBarItemClick, children} = props;

    return (
        <React.Fragment>
            <ListItem disableGutters dense button onClick={() => handleSideBarItemClick(name)}>
                <ListItemIcon sx={{minWidth: 'auto'}}>
                    <IconButton size={"small"} color={'primary'} sx={{
                        'svg': {fontSize: '20px'}
                    }}>
                        {icon}
                    </IconButton>
                </ListItemIcon>

                <ListItemText sx={{px: '4px'}}>
                    <Typography variant={'body2'} sx={{fontWeight: 550}}>
                        {name}
                    </Typography>
                </ListItemText>

                <IconButton size={"small"} color={'primary'}>
                    {open === name ? <KeyboardArrowDown/> : <KeyboardArrowRight/>}
                </IconButton>
            </ListItem>
            <Collapse in={open === name} timeout="auto" unmountOnExit>
                <List disablePadding dense>
                    {children}
                </List>
            </Collapse>
            <Divider/>
        </React.Fragment>
    );
};

export default SideBarItem;
