import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm";
import BaseAction from "../../../Form/Base/BaseAction";
import BaseAuthForm from "../../../Form/Base/BaseAuthForm";
import {Box} from "@mui/material";
import {useFormContext} from "react-hook-form";
import UserNameInput from "../../../Base/Input/UserName/UserNameInput";

const SignAction = () =>
    (
        <BaseAction
            action={{text: 'Sign In'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
        />
    )

const SignForm = () => {
    const useFormMethods = useFormContext()
    return (
        <>
            <BaseAuthForm>
                <Box sx={{mb: '20px'}}>
                    <UserNameInput

                        {...useFormMethods.register("username")}
                        control={useFormMethods.control}
                        error={useFormMethods.formState.errors}
                    />
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
