import React from 'react';
import { AppBar, Button, Toolbar, Typography, IconButton } from '@material-ui/core';

const Header: React.FC<{}> = () => {
  return (
    <div style={{ flexGrow: 1 }} className={'header'}>
      <AppBar position="static" elevation={0} color="default">
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
    </div>
  );
};

export default Header;
