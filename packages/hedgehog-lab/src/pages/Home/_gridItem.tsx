import React from "react"
import {Grid, Link, Paper, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

interface GridItemProps {
    link: string;
    title: string;
    description?: string;
}

const GridItem: React.FC<GridItemProps> = (props) => {
    const {link, title, description} = props;

    return (
        <Grid xs={12} md={6} lg={3} xl={2} item>
            <Link component={RouterLink} to={link} sx={{width: '100%', height: '100%'}}>
                <Paper sx={{p: 2, width: '100%', height: '100%'}}>
                    <Typography variant={'subtitle2'}>
                        {title}
                    </Typography>
                    {description}
                </Paper>
            </Link>
        </Grid>
    )
}

export default GridItem
