import {Box, Grid} from "@mui/material";
import {tutorials} from "../../tutorials";
import React from "react";
import Title from "./_title";
import GridItem from "./_gridItem";

const GettingStarted = () => {
    return (
        <Box>
            <Title title={'Getting started with examples'}/>

            <Grid container spacing={1}>
                {tutorials.map((tutorial, index) => {
                    return (
                        <GridItem key={index} link={`example/${tutorial.description}`} title={tutorial.description}/>
                    );
                })}
            </Grid>
        </Box>
    )
}

export default GettingStarted;
