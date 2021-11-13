import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm/BaseForm";
import BaseAuthAction from "../../../Form/Base/BaseAuthAction/BaseAuthAction";
import BaseAuthForm from "../../../Form/Base/BaseAuthForm/BaseAuthForm";
import {Box} from "@mui/material";

const LoginAction = () =>
    (
        <BaseAuthAction
            action={{text: 'Log in'}}
            signOrLogin={{text: 'Not on HHLAB yet?', actionText: 'Sign up', action: 'sign'}}
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
