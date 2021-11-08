import * as React from 'react';
import Button from '@mui/material/Button';
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {AccountCircleOutlined, CloseOutlined} from "@mui/icons-material";
import AuthLogin from "./AuthLogin/AuthLogin";


interface DialogProps {
    handleClose?: () => void
    handleClickOpen?: () => void
}

const AuthButton: React.FC<DialogProps> = (props) => {
    const {handleClickOpen} = props

    return (
        <Button startIcon={<AccountCircleOutlined/>} variant="outlined" onClick={handleClickOpen}>
            Login
        </Button>
    )
}

const DialogHeader: React.FC<DialogProps> = (props) => {
    const {handleClose} = props
    return (
        <DialogTitle>
            <Title/>

            <IconButton
                aria-label="close"
                onClick={handleClose}
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
    )
}

const Title = () => (
    <Typography variant={'h4'} component={'p'} sx={{fontWeight: 'bold'}}>
        Welcome to HHLAB
    </Typography>
)

export default function AuthDialog(): React.ReactElement {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <AuthButton handleClickOpen={handleClickOpen}/>

            <Dialog open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            handleClose()
                        }
                    }}
                    fullWidth
                    sx={{textAlign: 'center'}}>
                <Box pt={'60px'} px={'50px'} pb={'20px'}>
                    <DialogHeader handleClose={handleClose}/>

                    <DialogContent sx={{mt: '10px'}}>
                        <AuthLogin/>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}
