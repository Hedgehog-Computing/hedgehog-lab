import React from 'react';

import { Box, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { PlainDivider, PlainLink } from '@/components/styled';

interface ListItemProp {
  icon: React.ReactElement;
  text: string;
  link: string;
}

export interface HeaderListItemProps {
  data: ListItemProp[];
}

const HeaderListItem: React.FC<HeaderListItemProps> = (props) => {
  return (
    <>
      {props.data.map((item) => (
        <Box key={item.text}>
          <PlainDivider />
          <PlainLink
            sx={{
              display: 'block',
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>

              <ListItemText>{item.text}</ListItemText>
            </ListItemButton>
          </PlainLink>
        </Box>
      ))}
    </>
  );
};

export default HeaderListItem;
