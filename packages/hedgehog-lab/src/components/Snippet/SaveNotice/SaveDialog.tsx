import React, {useCallback, useState} from "react";
import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    OutlinedInput
} from "@mui/material";
import {CloseOutlined, SaveOutlined} from "@mui/icons-material";

const SaveDialog = (): React.ReactElement => {
    const [saveDialogOpen, setSaveDialogOpen] = useState(false)

    const handleSaveDialogOpen = useCallback(() => {
        setSaveDialogOpen(!saveDialogOpen)
    }, [saveDialogOpen])

    return (
        <>
            <Alert variant={'filled'} severity={'error'}
                   action={
                       <Button onClick={handleSaveDialogOpen} variant={'outlined'} size={'small'} color={'inherit'}
                               endIcon={<SaveOutlined/>}>
                           Save
                       </Button>
                   }>
                You have not saved it
            </Alert>


            <Dialog open={saveDialogOpen} aria-labelledby="Save your code" fullWidth maxWidth={'sm'}>
                <DialogTitle id="save-your-code">
                    Share your code via URL

                    <IconButton
                        aria-label="close"
                        onClick={handleSaveDialogOpen}
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
                        <OutlinedInput fullWidth placeholder={'Snippet name'}/>
                    </Box>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus color="primary" type={'submit'}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default SaveDialog
