import React from "react";
import {Box} from "@mui/material";
import SharePopup from "../../Share/SharePopup";
import {useMatch} from "react-router-dom";

interface IRightButtonProps {
    href: string;
    render: React.ReactNode;
    tooltip: string;
}

const RightButton = (): React.ReactElement => {
    const userSnippetPage = useMatch('/s/:userId/:snippetId')

    return (
        <>
            {userSnippetPage && (
                <Box ml={1}>
                    <SharePopup size={'small'}
                                type={'button'}
                                text={'Share'}
                                script={`import @${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                                embed={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                                url={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}/>
                </Box>
            )}


        </>
    );
};

export default RightButton;
