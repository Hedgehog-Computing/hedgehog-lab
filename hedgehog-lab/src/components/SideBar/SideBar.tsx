import React, { Dispatch, SetStateAction } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  makeStyles,
  Theme,
  createStyles,
  ListSubheader
} from '@material-ui/core';
// @ts-ignore
import { tutorials } from '../../tutorials';

interface SideBarProps {
  handleCompileAndRun: (event: React.MouseEvent) => void;
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
  source: string
  loading: boolean;
  setSource: Dispatch<SetStateAction<string>>
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
  }),
);


const SideBar: React.FC<SideBarProps> = (props: SideBarProps) => {
  const {
    handleLoadTutorial,
  } = props;

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
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
                  <ListItemText primary={`${i + 1}: ${tutorial.description}`}>
                    Tutorial {i + 1}: {tutorial.description}
                  </ListItemText>
                </ListItem>
              );
            }
          )}
        </List>
      </div>
    </Drawer>
  );
};

export default SideBar;
