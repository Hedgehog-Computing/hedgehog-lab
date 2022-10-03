import * as React from "react";
import {useCallback} from "react";
import {Box} from "@mui/material";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import AuthAction from "../../components/Auth/Action/AuthAction";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginRule} from "../../models/login/loginModal";
import {useAuth} from "../../hooks/useAuth";


const LoginForm = () => {
    return (
        <>
            <EmailInput/>

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput/>
            </Box>

            <AuthAction
                action={{text: 'Log in'}}
                signOrLogin={{text: 'Not on hlab yet?', actionText: 'Sign up', action: 'sign'}}
                forget={{text: 'Forget password?'}}
            />
        </>
    )
}

const Login = (): React.ReactElement => {
    const {setLoading, setErrorMessage, login} = useAuth()

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(loginRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
        await login(data)
    }, [login])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                <LoginForm/>
            </form>
        </FormProvider>
    )
}


export default Login
