import {Controller} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../HOutlined/HOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";
import {IBaseInputProps} from "../IBaseInputProps";

const StartAdornment = () =>
    (
        <EmailOutlined/>
    )

const name = 'email'

const EmailInput: React.FC<IBaseInputProps> = (props): React.ReactElement => {
    const {control, error} = props
    return (
        <Controller
            // name ref IAuthFormProps
            name={name}
            control={control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput error={error} placeholder={'Email'}
                                name={name}
                                field={field} startAdornment={<StartAdornment/>}/>
            }
        />
    )
}


export default EmailInput
