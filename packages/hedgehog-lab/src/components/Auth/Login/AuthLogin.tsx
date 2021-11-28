import * as React from "react";
import BaseForm from "../../Base/Form/BaseForm";
import AuthAction from "../Action/AuthAction";
import {Box} from "@mui/material";
import EmailInput from "../../Base/Input/Email/EmailInput";
import PasswordInput from "../../Base/Input/Password/PasswordInput";

const LoginAction = () =>
    (
        <AuthAction
            action={{text: 'Log in'}}
            signOrLogin={{text: 'Not on HHLAB yet?', actionText: 'Sign up', action: 'sign'}}
            forget={{text: 'Forget password?'}}
        />
    )

const LoginForm = () => {
    return (
        <>
            <EmailInput/>

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput/>
            </Box>

            <LoginAction/>
        </>
    )
}

const AuthLogin = (): React.ReactElement => {
    return (
        <Box sx={{mt: '10px'}}>
            <BaseForm>
                <LoginForm/>
            </BaseForm>
        </Box>
    )
}


export default AuthLogin
