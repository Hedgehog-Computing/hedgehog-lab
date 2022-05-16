import * as React from "react";
import {useCallback, useEffect} from "react";
import Button from "@mui/material/Button";
import {
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import {AccountCircleOutlined, CloseOutlined, LoginOutlined,} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import {useRecoilState} from "recoil";
import Auth from "../../../pages/Auth/Auth";
import {authDialogState} from "../../../states/RUserStates";

interface DialogProps {
    handleClose?: () => void;
    handleClickOpen?: () => void;
}

const AuthButton: React.FC<DialogProps> = (props) => {
    const location = useLocation();

    const {handleClickOpen} = props;

    return (
        <Button
            startIcon={<AccountCircleOutlined/>}
            variant="outlined"
            onClick={handleClickOpen}
        >
            Login
        </Button>
    );
};

const DialogHeader: React.FC<DialogProps> = (props) => {
    const {handleClose} = props;
    return (
        <DialogTitle>
            <Title/>

            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseOutlined/>
            </IconButton>
        </DialogTitle>
    );
};

const Title = () => (
    <Typography variant={"h4"} component={"p"} sx={{fontWeight: "bold"}}>
        Welcome to hlab
    </Typography>
);

export default function AuthDialog(): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    const [open, setOpen] = useRecoilState(authDialogState);

    useEffect(() => {
        if (state?.backgroundLocation !== undefined) {
            setOpen(true);
        }
    }, [state?.backgroundLocation, setOpen]);

    const handleClickOpen = useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    return (
        <>
            {location.pathname === "/auth" ? (
                <></>
            ) : (
                <ListItemButton onClick={handleClickOpen}>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>

                    <ListItemText>
                        <Box fontWeight={"bold"}>Login</Box>
                    </ListItemText>
                </ListItemButton>
            )}

            <Dialog
                open={open}
                onClose={(event, reason) => {
                    if (reason !== "backdropClick") {
                        handleClose();
                    }
                }}
                fullWidth
                sx={{textAlign: "center"}}
            >
                <Box pt={"60px"} px={"50px"} pb={"20px"}>
                    <DialogHeader handleClose={handleClose}/>

                    <DialogContent sx={{mt: "10px"}}>
                        <Auth/>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}
