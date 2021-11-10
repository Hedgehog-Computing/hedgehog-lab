import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm";
import BaseAction from "../../../Form/Base/BaseAction";
import {Box} from "@mui/material";
import {useFormContext} from "react-hook-form";
import EmailInput from "../../../Base/Input/Email/EmailInput";

const ForgetAction = () =>
    (
        <BaseAction
            action={{text: 'Forget'}}
            signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
            forget={{text: 'Forget password?'}}
        />
    )

const ForgetForm = () => {
    const useFormMethods = useFormContext()
    return (
        <>
            <EmailInput

                {...useFormMethods.register("email")}
                control={useFormMethods.control}
                error={useFormMethods.formState.errors}
            />
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
