import React from "react";
import {Box,} from "@mui/material";
import {ControlledEditor} from "@monaco-editor/react";
import ResizeObserver from "react-resize-detector";
import {useEditor} from "../../hooks/useEditor";

const YourCode = (): React.ReactElement => {
    const {
        editorCode,
        handleUploadSource,
        handleEditorDidMount,
        editor,
        editorTheme,
        options,
    } = useEditor();

    return (
        <div>
            <Box sx={{height: "calc(100vh - 82px)", borderRadius: 0, pt: 1}}>
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
