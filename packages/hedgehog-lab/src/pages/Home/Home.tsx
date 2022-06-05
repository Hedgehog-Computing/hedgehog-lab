import React from "react";
import GettingStarted from "./_gettingStarted";
import Community from "./_community";
import {Stack} from "@mui/material";
import Draft from "./_draft";

const Home = () => {
    return (
        <>
            <Stack spacing={4}>
                <Draft/>
                <GettingStarted/>
                <Community/>
            </Stack>
        </>
    )
}

export default Home;
