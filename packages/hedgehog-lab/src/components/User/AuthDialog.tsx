import * as React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import {Box, DialogContent, IconButton, InputAdornment, Link, OutlinedInput, Typography} from "@mui/material";
import {
    AccountCircleOutlined,
    CloseOutlined,
    EmailOutlined,
    PasswordOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined
} from "@mui/icons-material";

interface State {
    password: string;
    showPassword: boolean;
}

interface DialogProps {
    handleClose?: () => void
    handleClickOpen?: () => void
}

const LoginButton: React.FC<DialogProps> = (props) => {
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
            <Typography variant={'h4'} component={'p'} sx={{fontWeight: 'bold'}}>
                Welcome to HHLAB
            </Typography>

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

const LoginForm = () => {
    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    });

    const handleChange =
        (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setValues({...values, [prop]: event.target.value});
        };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <OutlinedInput error fullWidth placeholder={'Email'} startAdornment={
                <InputAdornment position={"start"}>
                    <EmailOutlined/>
                </InputAdornment>
            }/>

            <OutlinedInput
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
                        </IconButton>
                    </InputAdornment>
                }
                sx={{my: '20px'}}
                fullWidth
                placeholder={'Password'}
                startAdornment={
                    <InputAdornment position={"start"}>
                        <PasswordOutlined/>
                    </InputAdornment>
                }/>
        </>
    )
}

const LoginAction = () =>
    (<Button sx={{mt: '20px'}} fullWidth size={"large"} variant={'contained'}>
        Log in
    </Button>)

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
            <LoginButton handleClickOpen={handleClickOpen}/>

            <Dialog open={open}
                    onClose={(event, reason) => {
                        if (reason !== 'backdropClick') {
                            handleClose()
                        }
                    }}
                    fullWidth
                    sx={{textAlign: 'center'}}>
                <Box pt={'60px'} px={'50px'}>
                    <DialogHeader handleClose={handleClose}/>

                    <DialogContent>
                        <Box mt={'10px'}>
                            <LoginForm/>
                        </Box>

                        <Typography variant={"body2"} sx={{textAlign: 'right'}}>
                            <Link sx={{fontWeight: 'medium'}}>
                                Forget password?
                            </Link>
                        </Typography>

                        <LoginAction/>

                        <Typography sx={{mt: '60px', fontWeight: 'medium'}} variant={"body1"}>
                            Not on HHLAB yet?
                            <Link sx={{ml: '2px', fontWeight: 'medium'}}>
                                Sign up
                            </Link>
                        </Typography>
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
}
