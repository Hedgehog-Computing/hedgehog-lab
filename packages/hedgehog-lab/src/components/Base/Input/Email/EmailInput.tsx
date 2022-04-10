import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import BaseOutlinedInput from "../BaseOutlinedInput/BaseOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";
import {IInputProps} from "../../../../interfaces/IFormInput";

const name = 'email'

const EmailInput: React.FC<IInputProps> = (props): React.ReactElement => {
    const useFormMethods = useFormContext()
    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={props.defaultValue}
            render={({field}) =>
                <BaseOutlinedInput
                    value={props.defaultValue}
                    field={field}
                    adornment={{start: <EmailOutlined/>}}/>
            }
        />
    )
}


export default EmailInput
