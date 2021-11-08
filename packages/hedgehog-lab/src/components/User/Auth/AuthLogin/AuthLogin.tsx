import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm";
import BaseAction from "../../../Form/Base/BaseAction";
import BaseAuthForm from "../../../Form/Base/BaseAuthForm";
import {Box} from "@mui/material";

const LoginAction = () =>
    (
        <BaseAction
            action={{text: 'Log in'}}
            signOrLogin={{text: 'Not on HHLAB yet?', linkText: 'Sign up'}}
            forget={{text: 'Forget password?'}}
        />
    )

const LoginForm = () => {
    return (
        <>
            <BaseAuthForm/>
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
