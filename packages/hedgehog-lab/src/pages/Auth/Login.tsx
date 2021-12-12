import * as React from "react";
import {useCallback} from "react";
import {Box} from "@mui/material";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import AuthAction from "../../components/Auth/Action/AuthAction";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IBaseFormProps} from "../../components/Base/Form/IBaseFormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginModal, loginRule} from "../../modals/login/loginModal";


const LoginForm = () => {
    return (
        <>
            <EmailInput/>

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput/>
            </Box>

            <AuthAction
                action={{text: 'Log in'}}
                signOrLogin={{text: 'Not on HHLAB yet?', actionText: 'Sign up', action: 'sign'}}
                forget={{text: 'Forget password?'}}
            />
        </>
    )
}

const Login = (): React.ReactElement => {
    const useFormMethods = useForm<IBaseFormProps>({
        resolver: yupResolver(loginRule)
    })

    const onSubmit: SubmitHandler<IBaseFormProps> = useCallback((data) => {
        loginModal(data)
    }, [])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                <LoginForm/>
            </form>
        </FormProvider>
    )
}


export default Login
