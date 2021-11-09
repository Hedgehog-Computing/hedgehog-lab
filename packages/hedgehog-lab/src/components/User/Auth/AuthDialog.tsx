import * as React from 'react';
import {useCallback} from 'react';
import Button from '@mui/material/Button';
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {AccountCircleOutlined, CloseOutlined} from "@mui/icons-material";
import AuthLogin from "./AuthLogin/AuthLogin";
import {Link, useLocation, useNavigate} from "react-router-dom";


interface DialogProps {
    handleClose?: () => void
    handleClickOpen?: () => void
}

const AuthButton: React.FC<DialogProps> = (props) => {
    const location = useLocation()

    const {handleClickOpen} = props

    return (
        <Button component={Link} startIcon={<AccountCircleOutlined/>} variant="outlined"
                to={'/login'} state={{backgroundLocation: location}} onClick={handleClickOpen}>
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
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    const onDismiss = useCallback(() => {
        navigate(-1);
    }, [])

    const [open, setOpen] = React.useState(state?.backgroundLocation !== undefined);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [open])

    const handleClose = useCallback(() => {
        setOpen(false);
        onDismiss()
    }, [open])

    return (
        <>
            <AuthButton handleClickOpen={handleClickOpen}/>

            <Dialog open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            handleClose();
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
