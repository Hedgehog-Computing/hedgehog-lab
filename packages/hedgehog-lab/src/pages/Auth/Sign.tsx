import * as React from "react";
import {useCallback} from "react";
import AuthAction from "../../components/Auth/Action/AuthAction";
import {Box} from "@mui/material";
import UserNameInput from "../../components/Base/Input/UserName/UserNameInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {signRule} from "../../models/sign/signModel";
import {useAuth} from "../../hooks/useAuth";

const SignAction = () =>
    (
        <AuthAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const Sign = (): React.ReactElement => {
    const {setLoading, setErrorMessage, login, signup} = useAuth()

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(signRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
        signup(data)

    }, [signup])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                <Box sx={{mb: 2}}>
                    <UserNameInput/>
                </Box>

                <EmailInput/>

                <Box sx={{mt: 2, mb: 1}}>
                    <PasswordInput/>
                </Box>

                <SignAction/>
            </form>
        </FormProvider>
    )
}


export default Sign
