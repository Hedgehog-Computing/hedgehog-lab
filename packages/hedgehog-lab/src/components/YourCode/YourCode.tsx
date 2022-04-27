import React, {useEffect} from "react";
import {Box,} from "@mui/material";
import {ControlledEditor} from "@monaco-editor/react";
import ResizeObserver from "react-resize-detector";
import {useEditor} from "../../hooks/useEditor";
import {useMatch, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import {useEditorMeta} from "../../hooks/useEditorMeta";
import {http} from "../../network/http";

const YourCode = (): React.ReactElement => {
    const {
        editorCode,
        handleUploadSource,
        handleEditorDidMount,
        editor,
        editorTheme,
        options,
        autoSaveCode,
    } = useEditor();

    const {editorMeta, isUserSnippetPage} = useEditorMeta()
    const {auth, setAuthDialogOpen} = useAuth()
    const userID = useMatch(`/s/:userID/:snippetID`)
    const navigate = useNavigate()


    useEffect(() => {
        if (editorMeta.id) {
            const isMySnippet = auth.user.firstname === userID?.params.userID
            const time = new Date().getTime()
            if (auth.isAuthenticated && editorMeta.title && !isMySnippet) {
                const title = `${editorMeta.title}-${time}`
                http.post('/snippets/create', {
                    title: title,
                    content: editorCode,
                    token: auth.accessToken,
                    versions: 1,
                    visibility: 'public',
                    description: editorMeta.description ?? 'no description',
                    authorId: auth.user.id
                }).then(r => navigate(`/s/${auth.user.firstname}/${title}`))

            }
        }
    }, [auth.accessToken, auth.isAuthenticated, auth.user.firstname, auth.user.id, editorCode, editorMeta.description, editorMeta.id, editorMeta.title, navigate, userID?.params.userID])

    return (
        <div>
            <Box sx={{height: "calc(100vh - 82px)", borderRadius: 0}}>
                <ResizeObserver
                    onResize={() => {
                        if (editor) {
                            editor.layout();
                        }
                    }}
                >
                    <div
                        style={{
                            height: "100%",
                        }}
                    >
                        <ControlledEditor
                            language="javascript"
                            value={editorCode}
                            onChange={handleUploadSource}
                            options={options}
                            editorDidMount={handleEditorDidMount}
                            theme={editorTheme}
                        />
                    </div>
                </ResizeObserver>
            </Box>
        </div>
    );
};

export default YourCode;
