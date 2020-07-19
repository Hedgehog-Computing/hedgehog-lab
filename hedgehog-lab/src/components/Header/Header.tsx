import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@material-ui/core';

const Header: React.FC<{}> = () => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={0} color="default">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Hedgehog Lab
          </Typography>

          <Button
            color="inherit"
            style={{ textTransform: 'none' }}
            target="_black"
            href="https://twitter.com/lidangzzz"
          >
            Twitter
          </Button>
          <Button
            color="inherit"
            style={{ textTransform: 'none' }}
            target="_black"
            href="https://github.com/lidangzzz/hedgehog-lab"
          >
            Github
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
