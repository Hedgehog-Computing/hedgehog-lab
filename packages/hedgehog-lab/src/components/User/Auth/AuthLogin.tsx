import * as React from "react";
import {IconButton, InputAdornment, Link, OutlinedInput, Typography} from "@mui/material";
import {EmailOutlined, PasswordOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import Button from "@mui/material/Button";
import IAuthFormState from "./IAuthFormState";


const LoginForm = () => {
    const [loginValues, setLoginValues] = React.useState<IAuthFormState>({
        email: '',
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setLoginValues({
            ...loginValues,
            showPassword: !loginValues.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <OutlinedInput fullWidth
                           type={'email'}
                           placeholder={'Email'}
                           value={loginValues.email}
                           startAdornment={
                               <InputAdornment position={"start"}>
                                   <EmailOutlined/>
                               </InputAdornment>
                           }/>

            <OutlinedInput
                type={loginValues.showPassword ? 'text' : 'password'}
                value={loginValues.password}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {loginValues.showPassword ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
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
    (
        <>
            <Typography variant={"body2"} sx={{textAlign: 'right'}}>
                <Link sx={{fontWeight: 'medium'}}>
                    Forget password?
                </Link>
            </Typography>

            <Typography sx={{mt: '40px', fontWeight: 'medium'}} variant={"body1"}>
                Not on HHLAB yet?
                <Link sx={{ml: '2px', fontWeight: 'medium'}}>
                    Sign up
                </Link>
            </Typography>

            <Button sx={{mt: '20px'}} fullWidth size={"large"} variant={'contained'}>
                Log in
            </Button>
        </>
    )

const AuthLogin = (): React.ReactElement => (
    <>
        <LoginForm/>
        <LoginAction/>
    </>
)

export default AuthLogin
