import {Box, Checkbox, Chip, IconButton, OutlinedInput, Tooltip,} from "@mui/material";
import {CircleOutlined, MotionPhotosAuto, PublishOutlined,} from "@mui/icons-material";
import React, {useCallback, useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {codeSavingFlagState, editorMetaState} from "../../../states/RYourCodeStates";
import {compilerLiveModeState} from "../../../states/RCompilerStates";
import BasePopupText from "../../Base/Popup/BasePopupText";
import {authDialogState} from "../../../states/RAuthStates";
import {useAuth} from "../../../hooks/useAuth";
import {useMatch} from "react-router-dom";
import {useSnippet} from "../../../hooks/useSnippet";
import CreateSnippetDialog from "../CreateSnippetDialog";
import {useEditor} from "../../../hooks/useEditor";
import {useDebounce} from "react-use";


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

    const isAuthSnippetPage = useMatch(`/s/:userID/:snippetID`)?.params
    const {setCreateDialog, updateSnippet} = useSnippet()
    const {editorCode} = useEditor()

    const update = useCallback(() => {
        if (auth.isAuthenticated || isAuthSnippetPage?.userID === auth.user.firstname && editorMeta.id) {
            updateSnippet({
                token: auth.accessToken,
                id: editorMeta?.id,
                title: editorMeta.title,
                description: editorMeta.description,
                content: editorCode
            }).then(r => console.log(r))
        }
    }, [auth.accessToken, auth.isAuthenticated, auth.user.firstname, editorCode, editorMeta.description, editorMeta?.id, editorMeta.title, isAuthSnippetPage?.userID, updateSnippet])

    const [] = useDebounce(
        () => {
            if (editorMeta.id) {
                update();
            }

        },
        1000,
        [editorCode]
    );

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

            {(!auth.isAuthenticated || isAuthSnippetPage?.userID !== auth.user.firstname) && (
                <Chip
                    label={!auth.isAuthenticated ? `Login to get sync` : `Save to your cloud`}
                    size="small"
                    color="warning"
                    sx={{cursor: "pointer"}}
                    onClick={() => !auth.isAuthenticated ? setAuthDialog(true) : setCreateDialog({open: true})}
                />
            )}

            <CreateSnippetDialog/>
        </Box>
    );
};

export default SaveState;

