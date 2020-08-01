import React, { useState } from 'react';
import SideBarItem from './SideBarItem'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  createStyles,
  ListSubheader,
  Tooltip,
  Button
} from '@material-ui/core';
import { tutorials } from '../../tutorials';
import {Theme} from "@material-ui/core/styles";
import clsx from "clsx";

interface SideBarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  siderBarOpen: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
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
      ...theme.mixins.toolbar,
    },
    drawerContainer: {
      overflowX: "hidden",
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
        background: '#535353',
      },
      '&::-webkit-scrollbar-track': {
        display: 'fixed',
        '-webkit-box-shadow': 'inset 0 0 1px rgba(0,0,0,0)',
        borderRadius: 10,
        background: '#ccc',
      }
    },
    listItem: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      display: 'inline-block',
      width: '100%',
    },
    tooltip: {
      fontSize: '1rem'
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const { handleLoadTutorial, siderBarOpen } = props;

  const [open, setOpen] = useState('Tutorials');

  const classes = useStyles();

  const handleSideBarItemClick = (name: string) => {
    if (open === name) {
      setOpen('');
    } else {
      setOpen(name);
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: siderBarOpen,
        [classes.drawerClose]: !siderBarOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: siderBarOpen,
          [classes.drawerClose]: !siderBarOpen,
        }),
      }}
    >
      <Toolbar />

      <div className={classes.drawerContainer}>
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Welcome to Hedgehog Lab!
            </ListSubheader>
          }>
          <SideBarItem
            handleSideBarItemClick={handleSideBarItemClick}
            name={'Tutorials'}
            open={open}
          >
            {tutorials.map((tutorial: { description: React.ReactNode }, i: number) => {
              return (
                <ListItem
                  key={`${i}-${Date.now()}`}
                  button
                  className={classes.nested}
                  onClick={(e) => handleLoadTutorial(e, i)}
                >
                  <ListItemText>
                    <Tooltip
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      title={tutorial.description as string}
                      arrow
                    >
                    <span
                      className={classes.listItem}
                    >Tutorial {i + 1}: {tutorial.description}</span>
                    </Tooltip>
                  </ListItemText>
                </ListItem>
              );
            })}
          </SideBarItem>
          <SideBarItem
            handleSideBarItemClick={handleSideBarItemClick}
            name={'Local code'}
            open={open}
          >
            {tutorials.map((tutorial: { description: React.ReactNode }, i: number) => {
              return (
                <ListItem
                  key={`${i}-${Date.now()}`}
                  button
                  className={classes.nested}
                  onClick={(e) => handleLoadTutorial(e, i)}
                >
                  <ListItemText>
                    <Tooltip
                      placement="top"
                      classes={{ tooltip: classes.tooltip }}
                      title={tutorial.description as string}
                      arrow
                    >
                    <span
                      className={classes.listItem}
                    >Tutorial {i + 1}: {tutorial.description}</span>
                    </Tooltip>
                  </ListItemText>
                </ListItem>
              );
            })}
          </SideBarItem>
        </List>
      </div>

      <Button
        variant="contained"
        color="primary"
        style={{
          height: '5%'
        }}
      >Upload</Button>
    </Drawer>
  )
}

export default SideBar;
