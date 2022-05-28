import React from 'react';

import { ForumOutlined, LibraryBooksOutlined, MenuOutlined } from '@mui/icons-material';
import { List, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { PlainLink } from '@/components/styled';
import { title } from '@/config';
import HeaderButtons, { HeaderButtonProps } from '@/sections/Header/_HeaderButtons';
import useSidebar from '@/store/sidebar';


const linkButtonData: HeaderButtonProps = {
  data: [
    {
      text: 'Book',
      link: 'https://hedgehog-book.github.io/',
      icon: <LibraryBooksOutlined />,
    },
    {
      text: 'Discord',
      link: 'https://discord.gg/kmuBw8pRFf',
      icon: <ForumOutlined />,
    },
  ],
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function Header() {
  const [isSidebarOpen, sidebarActions] = useSidebar();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        open={isSidebarOpen}
        position="fixed"
        elevation={0}
        color="inherit"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.7)',
          transition: 'width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }} disableGutters>
          <List>
            <ListItem>
              <ListItemIcon onClick={sidebarActions.toggle} sx={{ cursor: 'pointer' }}>
                <MenuOutlined />
              </ListItemIcon>

              <PlainLink sx={{ display: 'block' }}>
                <ListItemText sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      fontWeight: 'bold',
                      letterSpacing: 0,
                      width: '100%',
                    }}
                  >
                    {title}
                  </Typography>
                </ListItemText>
              </PlainLink>
            </ListItem>
          </List>

          <Box>
            <HeaderButtons {...linkButtonData} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
