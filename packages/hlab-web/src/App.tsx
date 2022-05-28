import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Box, Toolbar, styled } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { withErrorHandler } from '@/error-handling';
import AppErrorBoundaryFallback from '@/error-handling/fallbacks/App';
import Pages from '@/routes/Pages';
import Header from '@/sections/Header';
import HotKeys from '@/sections/HotKeys';
import Notifications from '@/sections/Notifications';
import SW from '@/sections/SW';
import Sidebar from '@/sections/Sidebar';
import { sideBarWidth } from '@/sections/Sidebar/Sidebar';
import useSidebar from '@/store/sidebar';


const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${sideBarWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

function App() {
  const [isSidebarOpen] = useSidebar();

  return (
    <Fragment>
      <CssBaseline />
      <Notifications />
      <HotKeys />
      <SW />

      <BrowserRouter>
        <Header />
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <MainContent open={isSidebarOpen}>
              <Pages />
            </MainContent>
          </Box>
        </Box>
      </BrowserRouter>
    </Fragment>
  );
}

export default withErrorHandler(App, AppErrorBoundaryFallback);
