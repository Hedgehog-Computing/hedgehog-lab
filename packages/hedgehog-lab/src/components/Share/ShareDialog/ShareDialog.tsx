import React, {useCallback, useState} from "react";
import {Button, DialogActions, Divider, IconButton, Tooltip} from "@mui/material";
import {CloseOutlined, ShareOutlined} from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CopyInput from "../../Base/Input/Copy/CopyInput";
import {HEDGEHOG_DOMAIN} from "../../../config";

const ShareDialog = (): React.ReactElement => {

    const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false)
    const [url, setUrl] = useState<string>(`${HEDGEHOG_DOMAIN}?code=`)

    const handleShareDialogOpen = useCallback(() => {
        setShareDialogOpen(!shareDialogOpen)
    }, [shareDialogOpen])

    const handleAutoRunCheckBoxChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = event.target.checked

        const autoRunFlag = isChecked ? `${url}&auto_run=true` : `${url}`
        setUrl(autoRunFlag)
    }, [])

    return (
        <>
            <Tooltip title={'Share'} arrow>
                <IconButton onClick={handleShareDialogOpen}>
                    <ShareOutlined/>
                </IconButton>
            </Tooltip>

            <Dialog aria-labelledby="Share your code via URL"
                    fullWidth={true} maxWidth={"lg"} open={shareDialogOpen}>
                <MuiDialogTitle id="share-your-code">
                    Share your code via URL

                    <IconButton
                        aria-label="close"
                        onClick={handleShareDialogOpen}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseOutlined/>
                    </IconButton>
                </MuiDialogTitle>
                <MuiDialogContent>
                    <CopyInput url={url}/>

                    <Divider sx={{pb: '20px'}}/>

                    <FormControlLabel
                        control={<Checkbox name="AutoRunCheckBox" onChange={handleAutoRunCheckBoxChange}/>}
                        label="Automatically execute the script after loading"
                    />

                </MuiDialogContent>
                <DialogActions>
                    <Button autoFocus color="primary" onClick={handleShareDialogOpen}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ShareDialog
