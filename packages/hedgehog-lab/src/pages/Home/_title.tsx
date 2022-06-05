import {Divider, Typography} from "@mui/material";
import React from "react";

interface TitleProps {
    title: string;
}

const Title: React.FC<TitleProps> = (props) => {
    const {title} = props;

    return (
        <>
            <Typography variant={"h4"}>
                {title}
            </Typography>

            <Divider sx={{my: 1}}/>
        </>
    )
}

export default Title;
