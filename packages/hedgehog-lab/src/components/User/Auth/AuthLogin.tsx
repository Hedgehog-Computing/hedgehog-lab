import * as React from "react";
import {useCallback} from "react";
import {Box, Button, Link, Typography} from "@mui/material";
import {IAuthFormProps} from "./IAuthFormProps";
import {SubmitHandler, useForm} from "react-hook-form";
import EmailInput from "../../Form/Email/EmailInput";
import PasswordInput from "../../Form/Password/PasswordInput";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";


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

const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

const LoginForm = () => {
    const {control, handleSubmit, register, formState: {errors}} = useForm<IAuthFormProps>({
        resolver: yupResolver(schema)
    });

    const onSubmit: SubmitHandler<IAuthFormProps> = useCallback((data) => {
        console.log(data)
    }, [])

    return (
        <Box sx={{mt: '10px'}}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmailInput
                    {...register("email")}
                    control={control}
                    error={errors}
                />

                <Box sx={{mt: '20px', mb: '10px'}}>
                    <PasswordInput
                        {...register("password")}
                        control={control}
                        error={errors}
                    />
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
