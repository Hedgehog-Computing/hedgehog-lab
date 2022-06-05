import {Box} from "@mui/material";
import Title from "./_title";
import React from "react";
import GridItem from "./_gridItem";

const Draft = () => {
    const lastRunningCode = localStorage.getItem("lastRunningCode");
    return (
        lastRunningCode && (
            <Box>
                <Title title={'Draft'}/>

                <GridItem link={`/draft`} title={'Continue editing the last draft'}/>
            </Box>
        )
    )
}

export default Draft;
