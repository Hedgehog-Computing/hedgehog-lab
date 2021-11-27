import * as React from 'react';
import {useCallback, useEffect} from 'react';
import Button from '@mui/material/Button';
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {AccountCircleOutlined, CloseOutlined} from "@mui/icons-material";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import {authDialogState} from "../RAuthStates";
import Auth from "../Auth";


interface DialogProps {
    handleClose?: () => void
    handleClickOpen?: () => void
}


const AuthButton: React.FC<DialogProps> = (props) => {
    const location = useLocation()

    const {handleClickOpen} = props

    return (
        <Button component={Link} startIcon={<AccountCircleOutlined/>} variant="outlined"
                to={'/auth'} state={{backgroundLocation: location}} onClick={handleClickOpen}>
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

    const [open, setOpen] = useRecoilState(authDialogState);

    useEffect(() => {
        if (state?.backgroundLocation !== undefined) {
            setOpen(true)
        }
    }, [state?.backgroundLocation])

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [open])

    const handleClose = useCallback(() => {
        setOpen(false);
        navigate(-1)
    }, [open])

    return (
        <>
            {location.pathname === '/auth' ? <></> : <AuthButton handleClickOpen={handleClickOpen}/>}


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
                        <Auth/>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}
