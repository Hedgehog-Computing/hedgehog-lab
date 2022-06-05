import {styled} from "@mui/styles";
import {Typography} from "@mui/material";

export const NowrapTypography = styled(Typography)({
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
})
