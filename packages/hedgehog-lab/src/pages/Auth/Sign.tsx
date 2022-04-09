import * as React from "react";
import {useCallback, useState} from "react";
import AuthAction from "../../components/Auth/Action/AuthAction";
import {Alert, Box} from "@mui/material";
import UserNameInput from "../../components/Base/Input/UserName/UserNameInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {signRule} from "../../models/sign/signModel";
import {http} from "../../hooks/http";
import {useRecoilState, useSetRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authState} from "../../states/RAuthStates";

const SignAction = () =>
    (
        <AuthAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const Sign = (): React.ReactElement => {
    const [loading, setLoading] = useRecoilState(authActionLoadingState)
    const [errorMessage, setErrorMessage] = useState([]);
    const [auth, setAuth] = useRecoilState(authState)
    const setAuthDialogOpen = useSetRecoilState(authDialogState)

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(signRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
        setLoading(true)
        const res = await http.post('/auth/signup', data).then(res => {
            setAuth({...auth, isAuthenticated: true})
            setAuthDialogOpen(false)
            return res
        }).catch(err => {
            const message = err.response.data.message
            setErrorMessage(message)
        }).finally(() => {
            setLoading(false)
        })

    }, [auth, setAuth, setAuthDialogOpen, setLoading])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                {errorMessage.length > 0 && (
                    <Alert severity="error" sx={{mb: 2}}>
                        {Array.isArray(errorMessage) ? errorMessage.map((message, index) => (
                            <Box key={index} sx={{textAlign: 'left'}}>{message}</Box>
                        )) : errorMessage}
                    </Alert>
                )}

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
