import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import BaseOutlinedInput from "../BaseOutlinedInput/BaseOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";

const name = 'email'

const EmailInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()
    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={() =>
                <BaseOutlinedInput
                    name={name}
                    adornment={{start: <EmailOutlined/>}}/>
            }
        />
    )
}


export default EmailInput
