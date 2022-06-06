import {Button} from "@mui/material";
import {ForumOutlined, LibraryBooksOutlined} from "@mui/icons-material";
import React from "react";
import GitHubButton from "./_gitHubButton";

interface CommunityButtonsProps {
    link: string;
    icon: React.ReactElement;
    text: string;
}

const CommunityButtons = () => {
    const data: CommunityButtonsProps[] = [
        {
            text: 'book',
            icon: <LibraryBooksOutlined/>,
            link: 'https://hedgehog-computing.github.io/hedgehog-lab/'
        },
        {
            text: 'Discord',
            icon: <ForumOutlined/>,
            link: 'https://discord.gg/kmuBw8pRFf/'
        },
    ]

    return (
        <>
            {
                data.map((item, index) => (
                    <Button key={index} size={'small'} color={'inherit'} variant={'contained'}
                            endIcon={item.icon} target={'_blank'}
                            href={item.link}>
                        {item.text}
                    </Button>
                ))
            }

            <GitHubButton/>
        </>
    )
}

export default CommunityButtons;
