import React, {useCallback} from "react";
import {IconButton} from "@mui/material";
import {FullscreenOutlined,} from "@mui/icons-material";
import SharePopup from "../../Share/SharePopup";
import {useRecoilState} from "recoil";
import {resultFullScreenState} from "../../../states/RLayoutStates";
import {useMatch} from "react-router-dom";

interface IRightButtonProps {
    href: string;
    render: React.ReactNode;
    tooltip: string;
}

const RightButton = (): React.ReactElement => {
    const [resultFullScreen, setResultFullScreen] = useRecoilState<boolean>(
        resultFullScreenState
    );

    const handleResultFullScreen = useCallback(() => {
        setResultFullScreen(!resultFullScreen);
    }, [resultFullScreen, setResultFullScreen]);

    const emptyPage = useMatch('')
    const userSnippetPage = useMatch('/s/:userId/:snippetId')

    return (
        <>
            {userSnippetPage && (
                <SharePopup script={`import ${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                            embed={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}
                            url={`https://hlab.app/s/${userSnippetPage.params.userId}/${userSnippetPage.params.snippetId}`}/>
            )}

            <IconButton onClick={handleResultFullScreen}>
                <FullscreenOutlined/>
            </IconButton>
        </>
    );
};

export default RightButton;
