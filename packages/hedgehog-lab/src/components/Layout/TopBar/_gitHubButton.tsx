import {GitHub} from "@mui/icons-material";
import {Box, Button} from "@mui/material";
import React, {useEffect} from "react";
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";

const GitHubButton = () => {
    const [githubStargazersCount, setGithubStargazersCount] = React.useState<number>(0);
    const {data: githubStars} = useSWR('https://api.github.com/repos/Hedgehog-Computing/hedgehog-lab', fetcher, {revalidateOnFocus: false});

    useEffect(() => {
        setGithubStargazersCount(githubStars?.stargazers_count ?? 0)
    }, [githubStars])

    return (
        <Button size={'small'} color={'inherit'} variant={'contained'}
                endIcon={<GitHub/>} target={'_blank'} href={'https://github.com/Hedgehog-Computing/hedgehog-lab'}>
            Github

            {githubStargazersCount > 0 && (
                <Box component={"span"} sx={{ml: '2px'}}>
                    {githubStargazersCount.toLocaleString('en-US')}
                </Box>
            )}

        </Button>
    )
}

export default GitHubButton;
