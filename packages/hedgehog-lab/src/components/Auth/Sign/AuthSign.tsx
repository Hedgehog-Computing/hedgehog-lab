import * as React from "react";
import BaseForm from "../../Base/Form/BaseForm";
import AuthAction from "../Action/AuthAction";
import {Box} from "@mui/material";
import UserNameInput from "../../Base/Input/UserName/UserNameInput";
import EmailInput from "../../Base/Input/Email/EmailInput";
import PasswordInput from "../../Base/Input/Password/PasswordInput";

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

const AuthSign = (): React.ReactElement => {
    return (
        <Box sx={{mt: '10px'}}>
            <BaseForm>
                <SignForm/>
            </BaseForm>
        </Box>
    )
}


export default AuthSign
