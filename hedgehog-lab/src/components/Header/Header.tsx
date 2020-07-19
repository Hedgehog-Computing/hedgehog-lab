import React from 'react'
import {AppBar, Button, Toolbar, Typography, Icon} from "@material-ui/core";
import TwitterIcon from '@material-ui/icons/Twitter';

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
            onClick={() => {window.open('https://twitter.com/lidangzzz')}}
          >
            <TwitterIcon
              style={{ cursor: 'pointer' }}
            />
            Twitter
          </Button>
          <Button
            color="inherit"
            style={{ textTransform: 'none', height: 36 }}
            onClick={() => {window.open('https://github.com/lidangzzz/hedgehog-lab')}}
          >
            <img
              alt="GitHub stars"
              src="https://img.shields.io/github/stars/lidangzzz/hedgehog-lab?style=social"
            />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header
