import {styled} from "@mui/styles";
import {Drawer, Link, Typography} from "@mui/material";
import {sideBarWidth} from "./YourCode/Config/SideBar";

export const NowrapTypography = styled(Typography)({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
})

export const PlainLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    '&:hover': {
        textDecoration: "none",
    }
})

export const ResponseDrawer = styled(Drawer)({
    width: sideBarWidth,
    flexShrink: 0,
    [`& .MuiDrawer-paper`]: {
        width: sideBarWidth,
        boxSizing: "border-box"
    }
})
