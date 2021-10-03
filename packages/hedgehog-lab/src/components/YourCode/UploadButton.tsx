import React, {ChangeEvent} from 'react';
import {IconButton, Tooltip} from "@mui/material";
import {CloudUploadOutlined} from "@mui/icons-material";

interface UploadButtonProps {
    handleLoadFile: (str: string) => void;
}

const UploadButton: React.FC<UploadButtonProps> = (props: UploadButtonProps) => {
    const {handleLoadFile} = props;

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const resultFile = files[0];
        const reader = new FileReader();
        reader.readAsText(resultFile, 'UTF-8');
        reader.onload = function (e) {
            if (!e.target) return;
            const fileContent = e.target.result;
            const reg = /(.md)$/g;
            if (!fileContent) return;
            if (reg.test(resultFile.name)) {
                handleLoadFile(`markdown(\`\n${fileContent as string}\n\`)`);
            } else {
                handleLoadFile(fileContent as string);
            }
        };
    };

    return (
        <React.Fragment>
            <input
                accept=".js,.md"
                id="contained-button-file"
                multiple={false}
                type="file"
                onChange={handleFileChange}
                style={{display: "none"}}
            />
            <Tooltip title={'Upload'}>
                <label htmlFor="contained-button-file">
                    <IconButton component="span">
                        <CloudUploadOutlined/>
                    </IconButton>
                </label>
            </Tooltip>
        </React.Fragment>
    );
};

export default UploadButton;
