import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../HOutlinedInput/HOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";

const StartAdornment = () =>
    (
        <EmailOutlined/>
    )

const name = 'email'

const EmailInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()
    return (
        <Controller
            {...useFormMethods.register(name)}
            // name ref IAuthFormProps
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput
                    error={useFormMethods.formState.errors}
                    placeholder={'Email'}
                    field={field}
                    name={name}
                    startAdornment={<StartAdornment/>}/>
            }
        />
    )
}


export default EmailInput
