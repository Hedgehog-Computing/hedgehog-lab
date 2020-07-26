import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  createStyles,
  ListSubheader,
  Theme,
} from '@material-ui/core';
// @ts-ignore
import { tutorials } from '../tutorials/Tutorials';

interface SidebarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  siderBarOpen: boolean
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
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
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end"
    },
  }),
);

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {

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
        <div className={classes.drawerHeader} />

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

export default Sidebar;
