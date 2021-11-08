import {useFormContext} from "react-hook-form";
import EmailInput from "../Email/EmailInput";
import {Box} from "@mui/material";
import PasswordInput from "../Password/PasswordInput";
import * as React from "react";

const BaseAuthForm = (): React.ReactElement => {
    const methods = useFormContext()

    return (
        <>
            <EmailInput
                {...methods.register("email")}
                control={methods.control}
                error={methods.formState.errors}
            />

            <Box sx={{mt: '20px', mb: '10px'}}>
                <PasswordInput
                    {...methods.register("password")}
                    control={methods.control}
                    error={methods.formState.errors}
                />
            </Box>
        </>
    )
}

export default BaseAuthForm
