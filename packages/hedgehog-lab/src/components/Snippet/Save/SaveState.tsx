import {Box, Checkbox, Chip, IconButton, OutlinedInput, Tooltip,} from "@mui/material";
import {CircleOutlined, MotionPhotosAuto, PublishOutlined,} from "@mui/icons-material";
import React, {useEffect} from "react";
import {useRecoilState, useRecoilValue, useResetRecoilState} from "recoil";
import {codeSavingFlagState, editorMetaState} from "../../../states/RYourCodeStates";
import {compilerLiveModeState} from "../../../states/RCompilerStates";
import BasePopupText from "../../Base/Popup/BasePopupText";
import {authDialogState} from "../../../states/RAuthStates";
import {useAuth} from "../../../hooks/useAuth";
import {useMatch} from "react-router-dom";
import useSWR from "swr";
import {fetcher} from "../../../network/fetcher";

export const useEditorMeta = () => {
    const [editorMeta, setEditorMeta] = useRecoilState(editorMetaState);
    const resetEditorMeta = useResetRecoilState(editorMetaState);

    const isUserSnippetPage = useMatch(`/s/:userID/:snippetID`)

    let URL

    if (isUserSnippetPage) {
        const {userID, snippetID} = isUserSnippetPage?.params
        URL = `/snippets?author=${userID}&title=${snippetID}`
    }

    const {data, error} = useSWR([URL], fetcher)

    data && setEditorMeta(data)

    useEffect(() => {
        !data && resetEditorMeta()
    }, [data, resetEditorMeta, setEditorMeta])

    return {isUserSnippetPage, data, error}
};

const SaveState = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue(codeSavingFlagState);
    const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
        compilerLiveModeState
    );

    const liveMode = localStorage.getItem("liveMode") ?? "off";

    useEffect(() => {
        if (liveMode === "on") {
            setCompilerLiveMode("on");
        } else {
            setCompilerLiveMode("off");
        }
    }, [liveMode, setCompilerLiveMode]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const liveMode = event.target.checked ? "on" : "off";
        setCompilerLiveMode(liveMode);
        localStorage.setItem("liveMode", liveMode);
    };

    const [authDialog, setAuthDialog] = useRecoilState(authDialogState);

    const {auth} = useAuth();


    const editorMeta = useRecoilValue(editorMetaState);

    return (
        <Box
            sx={{
                width: "100%",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Box
                sx={{
                    cursor: "pointer",
                    "&:hover": {
                        textDecoration: "underline",
                    },
                }}
            >
                <BasePopupText text={editorMeta ? `${editorMeta.title}` : 'File Name'}>
                    <Box sx={{display: "grid", p: 1}}>
                        <OutlinedInput
                            size="small"
                            placeholder="File Name"
                            endAdornment={
                                <IconButton size="small">
                                    <PublishOutlined/>
                                </IconButton>
                            }
                        />

                        <OutlinedInput
                            sx={{mt: 1}}
                            size="small"
                            placeholder="Description"
                            endAdornment={
                                <IconButton size="small">
                                    <PublishOutlined/>
                                </IconButton>
                            }
                        />
                    </Box>
                </BasePopupText>

                {codeSavingFlag ? "*" : ""}
            </Box>
            <Tooltip title="Live Mode" arrow>
                <Checkbox
                    checked={compilerLiveMode === "on"}
                    onChange={handleChange}
                    size="small"
                    icon={<CircleOutlined/>}
                    checkedIcon={<MotionPhotosAuto/>}
                />
            </Tooltip>

            {auth.isAuthenticated ? (
                ""
            ) : (
                <Chip
                    label="Not synchronized"
                    size="small"
                    color="warning"
                    sx={{cursor: "pointer"}}
                    onClick={() => setAuthDialog(true)}
                />
            )}
        </Box>
    );
};

export default SaveState;
