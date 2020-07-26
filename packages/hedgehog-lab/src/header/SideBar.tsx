import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  createStyles,
  ListSubheader
} from '@material-ui/core';
// @ts-ignore
import { tutorials } from '../tutorials';

interface SideBarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  siderBarOpen: boolean
}

const drawerWidth = 240;

const useStyles = makeStyles(() =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  }),
);


const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {

  const {
    handleLoadTutorial,
    siderBarOpen
  } = props;

  const classes = useStyles();

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open={siderBarOpen}
        style={{
          display: siderBarOpen ? "" : "none"
        }}
      >
        <Toolbar />

        <div className={classes.drawerContainer}>
          <List
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                Hedgehog Lab Tutorials:
            </ListSubheader>
            }
          >
            {tutorials.map(
              (tutorial: { description: React.ReactNode }, i: number) => {
                return (
                  <ListItem
                    key={`${i}-${Date.now()}`}
                    button
                    onClick={
                      (e) => handleLoadTutorial(e, i)
                    }
                  >
                    <ListItemText>
                      Tutorial {i + 1}: {tutorial.description}
                    </ListItemText>
                  </ListItem>
                );
              }
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default SideBar;
