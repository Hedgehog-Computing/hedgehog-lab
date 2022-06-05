import {Link as RouteLink, useLocation} from "react-router-dom";
import {Link, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import * as React from "react";
import {blue} from "@mui/material/colors";

export interface SideListItemProps {
    link: string,
    icon: React.ReactNode,
    text: string
}

const SideListItem: React.FC<SideListItemProps> = (props) => {
    const {link, icon, text} = props;
    const location = useLocation()
    const isActive = link === location.pathname;
    return (
        <Link
            to={link}
            component={RouteLink}
            sx={{
                display: "block",
                bgcolor: isActive ? blue[100] : 'inherit',
                "&:hover": {
                    textDecoration: "none"
                },
                borderRadius: 10,
            }}
        >
            <ListItemButton sx={{borderRadius: 10}}>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>

                <ListItemText>
                    {text}
                </ListItemText>
            </ListItemButton>
        </Link>
    )
}

export default SideListItem;
