import React from 'react';

import { TimelineOutlined, TravelExploreOutlined } from '@mui/icons-material';
import { Box, Drawer, Toolbar } from '@mui/material';
import List from '@mui/material/List';

import HeaderListItem, { HeaderListItemProps } from '@/sections/Header/_HeaderListItem';
import useSidebar from '@/store/sidebar';

export const sideBarWidth = '240px';

const plainLinkData: HeaderListItemProps = {
  data: [
    { icon: <TravelExploreOutlined />, text: 'Explore', link: '/' },
    { icon: <TimelineOutlined />, text: 'Timeline', link: '/' },
  ],
};

function Sidebar() {
  const [isSidebarOpen] = useSidebar();

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isSidebarOpen}
      sx={{
        width: sideBarWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: sideBarWidth,
          boxSizing: 'border-box',
        },
        borderRight: isSidebarOpen ? '1px solid rgba(0, 0, 0, 0.12)' : '',
      }}
    >
      <Toolbar />

      <Box
        sx={{
          overflow: 'auto',
          display: 'grid',
          height: '100%',
          [`& .MuiListItemText-root span`]: {
            fontWeight: 'bold',
          },
          mt: '5px',
        }}
      >
        <List disablePadding>
          <HeaderListItem {...plainLinkData} />
        </List>
      </Box>
    </Drawer>
  );
}

export default Sidebar;
