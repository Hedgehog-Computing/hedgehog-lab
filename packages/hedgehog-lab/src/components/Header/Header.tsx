import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

interface HeaderProps {
  siderBarOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lgBreakpointMatches: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      borderBottom: '1px solid #E0E0E0'
    }
  })
);

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { siderBarOpen, setOpen, lgBreakpointMatches } = props;

  const classes = useStyles();

  const handleSideBarOpen = () => {
    setOpen(!siderBarOpen);
  };

  return (
    <div>
      <AppBar position="fixed" elevation={0} color="default" className={classes.appBar}>
        <Toolbar>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ display: lgBreakpointMatches ? 'inline' : 'none' }}
            onClick={handleSideBarOpen}
          >
            {
              siderBarOpen ?
                <ArrowBackOutlinedIcon style={{ fontSize: '1.25rem' }} />
              :
                <img
                  src={process.env.PUBLIC_URL + '/cat.png'}
                  style={{ height: '1.25rem' }}
                  alt="Hedgehog Lab Logo"
                />
            }
          </IconButton>

          <Typography
            variant={lgBreakpointMatches ? 'h6' : 'body1'}
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
            onClick={() => {
              window.open('https://github.com/lidangzzz/hedgehog-lab');
            }}>
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/lidangzzz/hedgehog-lab?style=social"
            />
          </Button>
        </Toolbar>
      </AppBar>

      {/*<SideBar handleLoadTutorial={handleLoadTutorial} siderBarOpen={siderBarOpen} />*/}
    </div>
  );
};

export default Header;
