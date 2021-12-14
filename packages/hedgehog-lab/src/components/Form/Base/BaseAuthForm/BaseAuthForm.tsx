import {useFormContext} from "react-hook-form";
import EmailInput from "../../../Base/Input/Email/EmailInput";
import {Box} from "@mui/material";
import PasswordInput from "../../../Base/Input/Password/PasswordInput";
import * as React from "react";

const BaseAuthForm: React.FC = (prop): React.ReactElement => {
    const useFormMethods = useFormContext()

    const {children} = prop

    return (
        <>
            {children}
            <EmailInput
                {...useFormMethods.register("email")}
                control={useFormMethods.control}
                error={useFormMethods.formState.errors}
            />

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput
                    {...useFormMethods.register("password")}
                    control={useFormMethods.control}
                    error={useFormMethods.formState.errors}
                />
            </Box>
        </>
    )
}

export default BaseAuthForm
