import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface HeaderProps {
  sidebarToggler: () => void;
  sidebarInitState: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const {
    sidebarToggler,
    sidebarInitState
  } = props;

  const classes = useStyles();
  return (
    <div>
      <AppBar position="fixed" elevation={0} color="default" className={classes.appBar}>
        <Toolbar>
          <FormControlLabel
            control={
              <Switch
                checked={sidebarInitState}
                onChange={sidebarToggler}
                name="handleSideBarOpen"
                color="primary"
              />
            }
            label="Tutorials"
          />

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ display: "inline"}}
          >
            <img src={process.env.PUBLIC_URL + "/cat.png"} style={{ height: '1.25rem' }} alt="Hedgehog Lab Logo" />
          </IconButton>

          <Typography
            variant={"h6"}
            style={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center'
            }}>
            Hedgehog Lab
          </Typography>

          <Button
            color="inherit"
            style={{ textTransform: 'none', height: 36 }}
            onClick={() => { window.open('https://github.com/lidangzzz/hedgehog-lab') }}
          >
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/lidangzzz/hedgehog-lab?style=social"
            />
          </Button>
        </Toolbar>
      </AppBar>

    </div>
  );
};

export default Header;
