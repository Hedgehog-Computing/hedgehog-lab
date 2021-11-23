import * as React from "react";
import BaseForm from "../../Base/Form/BaseForm";
import AuthAction from "../Action/AuthAction";
import {Box} from "@mui/material";
import EmailInput from "../../Base/Input/Email/EmailInput";

const ForgetAction = () =>
    (
        <AuthAction
            action={{text: 'Forget'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
            forget={{text: 'Forget password?'}}
        />
    )

const ForgetForm = () => {
    return (
        <>
            <EmailInput/>
            <ForgetAction/>
        </>
    )
}

const AuthForget = (): React.ReactElement => {
    return (
        <Box sx={{mt: '10px'}}>
            <BaseForm>
                <ForgetForm/>
            </BaseForm>
        </Box>
    )
}


export default AuthForget
