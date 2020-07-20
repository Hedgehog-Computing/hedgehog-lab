import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  createStyles,
  ListSubheader,
  useMediaQuery
} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
// @ts-ignore
import { tutorials } from '../../tutorials';

interface SideBarProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
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
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const lgBreakpointMatches = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <div>
      <Drawer
        variant={lgBreakpointMatches ? "permanent" : "temporary"}
        anchor="left"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
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
                  <ListItem key={`${i}-${Date.now()}`} button onClick={(e) => handleLoadTutorial(e, i)}>
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
