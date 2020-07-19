import React from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
  }),
);

const Header: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" elevation={0} color="default" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={process.env.PUBLIC_URL + "/cat.png"} style={{ height: '1.25rem' }} />
        </IconButton>

        <Typography variant="h6" style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
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
  );
};

export default Header;
