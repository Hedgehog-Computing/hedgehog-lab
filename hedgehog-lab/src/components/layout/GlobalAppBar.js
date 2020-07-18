import React from 'react';

import {
  Button,
  Typography,
  AppBar,
  Toolbar,
} from '@material-ui/core';

export default function GlobalAppBar() {
  return (
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
  )
}