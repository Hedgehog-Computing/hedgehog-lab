import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm/BaseForm";
import BaseAuthAction from "../../../Form/Base/BaseAuthAction/BaseAuthAction";
import {Box} from "@mui/material";
import EmailInput from "../../../Base/Input/Email/EmailInput";

const ForgetAction = () =>
    (
        <BaseAuthAction
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
