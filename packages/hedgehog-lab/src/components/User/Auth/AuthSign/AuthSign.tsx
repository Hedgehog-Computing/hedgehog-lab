import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm/BaseForm";
import BaseAuthAction from "../../../Form/Base/BaseAuthAction/BaseAuthAction";
import BaseAuthForm from "../../../Form/Base/BaseAuthForm/BaseAuthForm";
import {Box} from "@mui/material";
import UserNameInput from "../../../Base/Input/UserName/UserNameInput";

const SignAction = () =>
    (
        <BaseAuthAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const SignForm = () => {
    return (
        <>
            <BaseAuthForm>
                <Box sx={{mb: '20px'}}>
                    <UserNameInput/>
                </Box>
            </BaseAuthForm>
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
