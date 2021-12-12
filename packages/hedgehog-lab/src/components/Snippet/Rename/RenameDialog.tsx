import {CheckCircleOutlined, CloseOutlined, SettingsOutlined} from "@mui/icons-material";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import React, {useCallback, useState} from "react";
import BaseOutlinedInput from "../../Base/Input/BaseOutlinedInput/BaseOutlinedInput";

const RenameDialog = (): React.ReactElement => {
    const [renameDialogOpen, setRenameDialogOpen] = useState<boolean>(false)

    const handleRenameDialogOpen = useCallback(() => {
        setRenameDialogOpen(!renameDialogOpen)
    }, [renameDialogOpen])

    return (
        <>
            <IconButton onClick={handleRenameDialogOpen}>
                <SettingsOutlined/>
            </IconButton>

            <Dialog open={renameDialogOpen} fullWidth maxWidth={'sm'}>
                <DialogTitle>
                    Rename snippet

                    <IconButton
                        aria-label="close"
                        onClick={handleRenameDialogOpen}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseOutlined/>
                    </IconButton>
                </DialogTitle>

                <DialogContent>
                    <Box sx={{mt: '10px'}}>
                        <BaseOutlinedInput name={'rename'} placeholder={'Snippet name'}/>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button startIcon={<CheckCircleOutlined/>}>
                        Rename
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default RenameDialog
