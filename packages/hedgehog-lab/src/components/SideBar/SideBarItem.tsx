import React, { HTMLAttributes } from 'react'
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

interface SideBarItemProps {
  handleSideBarItemClick: (open: string) => void,
  open: string,
  name: string,
}

const SideBarItem: React.FC<SideBarItemProps & HTMLAttributes<HTMLElement>> = (props: SideBarItemProps & HTMLAttributes<HTMLElement>) => {

  const { open, name, handleSideBarItemClick, children } = props

  return (
    <React.Fragment>
      <ListItem button onClick={() => handleSideBarItemClick(name)}>
        <ListItemText primary={name} />
        {open === name ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open === name} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            children
          }
        </List>
      </Collapse>
    </React.Fragment>
  )
}

export default SideBarItem
