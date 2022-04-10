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
import {http} from "../../hooks/http";
import {useAuth} from "../../hooks/useAuth";

const SignAction = () =>
    (
        <AuthAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const Sign = (): React.ReactElement => {
    const {setLoading, setErrorMessage, login} = useAuth()

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(signRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
        setLoading(true)
        await http.post('/auth/signup', data).then(res => {
            login()
            return res
        }).catch(err => {
            const message = err.response.data.message
            setErrorMessage(message)
        }).finally(() => {
            setLoading(false)
        });

    }, [login, setErrorMessage, setLoading])

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
