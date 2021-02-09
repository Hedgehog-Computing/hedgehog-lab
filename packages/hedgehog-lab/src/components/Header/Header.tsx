import React from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface HeaderProps {
  siderBarOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lgBreakpointMatches: boolean;
  switchShowCodes: boolean;
  setShowCode:   React.Dispatch<React.SetStateAction<boolean>>;
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
  const { siderBarOpen, setOpen, lgBreakpointMatches, switchShowCodes, setShowCode } = props;

  const classes = useStyles();

  const handleSideBarOpen = () => {
    setOpen(!siderBarOpen);
  };

  const handleShowOrHideCodes = () =>{
    setShowCode(!switchShowCodes);
  }

  /*todo: add show code
  
  
          <FormGroup row>
            <FormControlLabel
              control={
              <Switch checked={switchShowCodes} onChange={handleShowOrHideCodes} name="Switch_ShowCodes" />}
              label="Show codes"
            />
          </FormGroup>

  */         

  return (
    <div>
      <AppBar position="fixed" elevation={0} color="default" className={classes.appBar}>
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ display: 'inline' }}
            onClick={handleSideBarOpen}>
            {siderBarOpen ? (
              <ArrowBackOutlinedIcon style={{ fontSize: '1.25rem' }} />
            ) : (
                // <img
                //   src={process.env.PUBLIC_URL + '/cat.png'}
                //   style={{ height: '1.25rem' }}
                //   alt="Hedgehog Lab Logo"
                // />
                <MenuIcon style={{ fontSize: '1.25rem' }} />
              )}
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
    </div>
  );
};

export default Header;
