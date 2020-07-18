import React from 'react';

import {
  Button,
  Typography,
  AppBar,
  Toolbar,
} from '@material-ui/core';

const appBarLink = [
  {
    title: 'Twitter',
    url: 'https://twitter.com/lidangzzz'
  },
  {
    title: 'Github',
    url: 'https://github.com/lidangzzz/hedgehog-lab'
  }
]

export default function GlobalAppBar() {
  return (
    <AppBar position="static" elevation={0} color="primary">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hedgehog Lab
        </Typography>

        {appBarLink.map((item, i) => {
          return (
            <Button
              color="inherit"
              style={{ textTransform: 'none' }}
              target="_black"
              href={item.url}
            >
              {item.title}
            </Button>
          );
        })}
      </Toolbar>
    </AppBar>
  )
}