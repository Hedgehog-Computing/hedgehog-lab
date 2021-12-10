import * as React from "react";
import BaseForm from "../../components/Base/Form/BaseForm";
import AuthAction from "../../components/Auth/Action/AuthAction";
import {Box} from "@mui/material";
import UserNameInput from "../../components/Base/Input/UserName/UserNameInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";

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
    return (
        <Box sx={{mt: '10px'}}>
            <BaseForm>
                <SignForm/>
            </BaseForm>
        </Box>
    )
}


export default Sign
