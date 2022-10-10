import Title from "./_title";
import React from "react";
import {Box, Grid} from "@mui/material";
import useSWR from "swr";
import {fetcher} from "../../network/fetcher";
import GridItem from "./_gridItem";

const Community = () => {
    const {data, error} = useSWR('/snippets/all?size=10&from=1', fetcher)
    return (
        <Box>
            <Title title={'From the community'}/>

            <Grid container spacing={1}>
                {data && data?.response?.result.map((snippet: {
                    user: { username: string };
                    title: string;
                    description: string;
                }, index: number) => {
                    return (
                        <GridItem key={index} link={`/s/${snippet.user.username}/${snippet.title}`}
                                  title={snippet.title} description={snippet.description}/>
                    )
                })}
            </Grid>
        </Box>
    )
}

export default Community;
