import React, {useCallback, useEffect} from "react";
import {Box, Button} from "@mui/material";
import {ForumOutlined, FullscreenOutlined, GitHub, LibraryBooksOutlined,} from "@mui/icons-material";
import SharePopup from "../../Share/SharePopup";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";
import {useMatch} from "react-router-dom";
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";

interface IRightButtonProps {
    href: string;
    render: React.ReactNode;
    tooltip: string;
}

const RightButton = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    const [githubStargazersCount, setGithubStargazersCount] = React.useState<number>(0);

    const handleResultFullScreen = useCallback(() => {
        setResultFullScreen(!resultFullScreen);
    }, [resultFullScreen, setResultFullScreen]);

    const emptyPage = useMatch('')
    const userSnippetPage = useMatch('/s/:userId/:snippetId')

    const {data: githubStars} = useSWR('https://api.github.com/repos/Hedgehog-Computing/hedgehog-lab', fetcher, {revalidateOnFocus: false});
    useEffect(() => {
        setGithubStargazersCount(githubStars?.stargazers_count ?? 0)
    }, [githubStars])

    return (
        <>
            {userSnippetPage && (
                <SharePopup size={'small'}
                            type={'button'}
                            text={'Share'}
                            script={`import @${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                            embed={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                            url={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}/>
            )}

            <Button sx={{ml: 1}} size={'small'}
                    color={resultFullScreen ? 'primary' : 'inherit'}
                    variant={'contained'}
                    onClick={handleResultFullScreen}
                    endIcon={<FullscreenOutlined/>}>
                Fullscreen
            </Button>

            <Button sx={{ml: 1}} size={'small'} color={'inherit'} variant={'contained'}
                    endIcon={<ForumOutlined/>} target={'_blank'} href={'https://discord.gg/kmuBw8pRFf'}>
                Discord
            </Button>

            <Button sx={{ml: 1}} size={'small'} color={'inherit'} variant={'contained'}
                    endIcon={<LibraryBooksOutlined/>} target={'_blank'}
                    href={'https://hedgehog-book.github.io/'}>
                Book
            </Button>

            <Button sx={{ml: 1}} size={'small'} color={'inherit'} variant={'contained'}
                    endIcon={<GitHub/>} target={'_blank'} href={'https://github.com/Hedgehog-Computing/hedgehog-lab'}>
                Github

                {githubStargazersCount > 0 && (
                    <Box component={"span"} sx={{ml: '2px'}}>
                        {githubStargazersCount.toLocaleString('en-US')}
                    </Box>
                )}

            </Button>
        </>
    );
};

export default RightButton;
