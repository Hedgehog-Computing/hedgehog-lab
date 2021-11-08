import {Controller} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../../Base/Input/HOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";
import {IFormProps} from "../IFormProps";

const StartAdornment = () =>
    (
        <EmailOutlined/>
    )

const name = 'email'

const EmailInput: React.FC<IFormProps> = (props): React.ReactElement => {
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
