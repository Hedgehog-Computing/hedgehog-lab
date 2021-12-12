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
import {signModal, signRule} from "../../modals/sign/signModal";

const SignAction = () =>
    (
        <AuthAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const SignForm = () => {
    return (
        <>
            <Box sx={{mb: '20px'}}>
                <UserNameInput/>
            </Box>

            <EmailInput/>

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput/>
            </Box>

            <SignAction/>
        </>
    )
}

const Sign = (): React.ReactElement => {
    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(signRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => {
        signModal(data)
    }, [])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                <SignForm/>
            </form>
        </FormProvider>
    )
}


export default Sign
