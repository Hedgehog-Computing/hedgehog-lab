import {Box, Chip, FormControlLabel, FormGroup, Switch,} from "@mui/material";
import React, {useCallback, useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {codeSavingFlagState} from "../../../states/RYourCodeStates";
import {compilerLiveModeState} from "../../../states/RCompilerStates";
import {authDialogState} from "../../../states/RUserStates";
import {useAuth} from "../../../hooks/useAuth";
import {useMatch, useNavigate} from "react-router-dom";
import {useSnippet} from "../../../hooks/useSnippet";
import CreateSnippetDialog from "../CreateSnippetDialog";
import {useEditor} from "../../../hooks/useEditor";
import {useDebounce} from "react-use";
import {useEditorMeta} from "../../../hooks/useEditorMeta";
import UpdatedSnippet from "../UpdatedSnippet";


const SaveState = (): React.ReactElement => {
    const codeSavingFlag = useRecoilValue(codeSavingFlagState);
    const [compilerLiveMode, setCompilerLiveMode] = useRecoilState(
        compilerLiveModeState
    );
    const [updateError, setUpdateError] = React.useState<string | null>(null);
    const liveMode = localStorage.getItem("liveMode") ?? "on";
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
    const navigate = useNavigate()
    const {editorMeta} = useEditorMeta()
    const isAuthSnippetPage = useMatch(`/s/:userID/:snippetID`)?.params
    const {setCreateDialog, updateSnippet, updateLoading} = useSnippet()
    const {editorCode} = useEditor()


    const update = useCallback(() => {
        if ((auth.isAuthenticated && isAuthSnippetPage?.userID === auth.user.username) && editorMeta.id) {
            updateSnippet({
                id: editorMeta?.id,
                title: editorMeta.title,
                description: editorMeta.description,
                content: editorCode
            }).then(r => console.log(r))
        }
    }, [auth.isAuthenticated, auth.user.username, editorCode, editorMeta.description, editorMeta?.id, editorMeta.title, isAuthSnippetPage?.userID, updateSnippet])

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
            {auth.isAuthenticated ? (
                <>
                    {(editorMeta.title && isAuthSnippetPage?.userID === auth?.user?.username) ? (
                        <Box
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    textDecoration: "underline",
                                },
                            }}
                        >
                            <UpdatedSnippet/>
                        </Box>
                    ) : (<Box sx={{cursor: 'pointer', fontSize: '12px'}} onClick={() => setCreateDialog({open: true})}>New
                        File</Box>)}
                </>
            ) : (<Box sx={{cursor: 'pointer'}} onClick={() => setAuthDialog(true)}>New File</Box>)}

            {codeSavingFlag ? "*" : ""}

            <Box ml={2}>
                <FormGroup sx={{
                    '& .MuiFormControlLabel-label': {
                        ml: '3px',
                        fontSize: '12px',
                    }
                }}>
                    <FormControlLabel control={<Switch
                        checked={compilerLiveMode === "on"}
                        onChange={handleChange}
                        size="small"
                    />} label={'LiveMode'}/>
                </FormGroup>
            </Box>

            {(!auth.isAuthenticated || isAuthSnippetPage?.userID !== auth.user.username) && (
                <Chip
                    label={!auth.isAuthenticated ? `Login to get sync` : `Save to your cloud`}
                    size="small"
                    color="warning"
                    sx={{
                        cursor: "pointer", fontSize: "12px", '& .MuiChip-label': {
                            padding: '2px 5px'
                        }
                    }}
                    onClick={() => !auth.isAuthenticated ? setAuthDialog(true) : setCreateDialog({open: true})}
                />
            )}

            <CreateSnippetDialog/>
        </Box>
    );
};

export default SaveState;

