import React, {useCallback, useEffect, useState} from 'react';
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import {AvTimerOutlined, CheckCircleOutlineOutlined, CloseOutlined, SettingsOutlined} from "@mui/icons-material";

const SettingsButton = (): React.ReactElement => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [autoSaveTime, setAutoSaveTime] = useState(1000)
    const [autoSaveTimeSavingFlag, setAutoSaveTimeSavingFlag] = useState(false)

    const handleDialogOpen = useCallback(() => {
        setDialogOpen(!dialogOpen)
    }, [dialogOpen])

    const localAutoSaveTime = localStorage.getItem('auto-save-time')
    useEffect(() => {
        if (localAutoSaveTime) setAutoSaveTime(parseInt(localAutoSaveTime))
    }, [localAutoSaveTime])

    const handleAutoSaveTimeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAutoSaveTime(parseInt(event.target.value))
        localStorage.setItem('auto-save-time', event.target.value)
        setAutoSaveTimeSavingFlag(true)

        setTimeout(() => {
            setAutoSaveTimeSavingFlag(false)
        }, 500)
    }, [])

    return (
        <>
            <IconButton onClick={handleDialogOpen}>
                <SettingsOutlined/>
            </IconButton>

            <Dialog open={dialogOpen} fullWidth maxWidth={"md"}>
                <DialogTitle>
                    Interface Settings

                    <IconButton
                        aria-label="close"
                        onClick={handleDialogOpen}
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
                    <Box sx={{my: '10px'}}>
                        <FormControl fullWidth variant={'outlined'}>
                            <InputLabel htmlFor={'automatic-saving-time'}>Automatic saving time(second)</InputLabel>
                            <OutlinedInput
                                onChange={handleAutoSaveTimeChange}
                                endAdornment={
                                    autoSaveTimeSavingFlag
                                        ? <CircularProgress size={'24px'}/>
                                        : <CheckCircleOutlineOutlined color={'success'}/>
                                }
                                startAdornment={<AvTimerOutlined/>}
                                fullWidth
                                id={'automatic-saving-time'} label={'Automatic saving time(second)'}
                                value={autoSaveTime}/>
                        </FormControl>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SettingsButton;
