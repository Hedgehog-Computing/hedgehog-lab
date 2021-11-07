import * as React from "react";
import {Box, Button, Link, Typography} from "@mui/material";
import {IAuthFormProps} from "./IAuthFormProps";
import {SubmitHandler, useForm} from "react-hook-form";
import EmailInput from "../../Form/EmailInput";
import PasswordInput from "../../Form/PasswordInput";

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

            <Button type={"submit"} sx={{mt: '20px'}} fullWidth size={"large"} variant={'contained'}>
                Log in
            </Button>
        </>
    )

const LoginForm = () => {
    const {control, handleSubmit} = useForm<IAuthFormProps>();

    const onSubmit: SubmitHandler<IAuthFormProps> = data => {
        console.log(data)
    };

    return (
        <Box sx={{mt: '10px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmailInput control={control}/>

                <Box sx={{mt: '20px', mb: '10px'}}>
                    <PasswordInput control={control}/>
                </Box>

                <LoginAction/>
            </form>
        </Box>
    )
}

const AuthLogin = (): React.ReactElement => (
    <>
        <LoginForm/>
    </>
)

export default AuthLogin
