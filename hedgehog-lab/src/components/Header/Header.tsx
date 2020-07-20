import React, { useState, MouseEvent } from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton, useMediaQuery, Menu, MenuItem, Hidden } from '@material-ui/core';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { tutorials } from '../../tutorials';

interface HeaderProps {
  handleLoadTutorial: (event: React.MouseEvent, i: number) => void;
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
    handleLoadTutorial,
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const lgBreakpointMatches = useMediaQuery(theme.breakpoints.up('lg'));

  const [tutorialsEl, setTutorialsEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    /**
     * Warning: finddomnode is deprecated in strictmode,
     * Here is known issue: https://github.com/mui-org/material-ui/issues/13394
     */
    setTutorialsEl(event.currentTarget);
  };

  const handleClose = () => {
    setTutorialsEl(null);
  };

  return (
    <AppBar position="fixed" elevation={0} color="default" className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <img src={process.env.PUBLIC_URL + "/cat.png"} style={{ height: '1.25rem' }} alt="Hedgehog Lab Logo" />
        </IconButton>

        <Typography
          variant={lgBreakpointMatches ? "h6" : "body1"}
          style={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center'
          }}>
          Hedgehog Lab
        </Typography>

        <Hidden lgUp>
          <Button
            aria-controls="tutorials-menu"
            aria-haspopup="true"
            onClick={handleClick}
            style={{ textTransform: 'none', height: 36 }}
            endIcon={<ExpandMoreIcon />}
          >
            Tutorials
          </Button>
          <Menu
            id="tutorials-menu"
            anchorEl={tutorialsEl}
            keepMounted
            open={Boolean(tutorialsEl)}
            onClose={handleClose}
          >
            {!lgBreakpointMatches && tutorials.map(
              (tutorial: { description: React.ReactNode }, i: number) => {
                return (
                  <MenuItem
                    key={`${i}-${Date.now()}`}
                    dense
                    onClick={
                      (e) => {
                        handleLoadTutorial(e, i);
                        handleClose()
                      }
                    }
                  >
                    Tutorial {i + 1}: {tutorial.description}
                  </MenuItem>
                );
              }
            )}
          </Menu>
        </Hidden>

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
