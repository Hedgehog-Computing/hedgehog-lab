import {Controller} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../../Base/Input/HOutlinedInput";
import {EmailOutlined} from "@mui/icons-material";
import {IFormProps} from "../IFormProps";

const StartAdornment = () =>
    (
        <EmailOutlined/>
    )


const EmailInput: React.FC<IFormProps> = (props): React.ReactElement => {
    const {error} = props
    return (
        <Controller
            // name ref IAuthFormProps
            name={'email'}
            {...props}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput error={!!error?.email?.message} helperText={error?.email?.message} placeholder={'Email'}
                                field={field} startAdornment={<StartAdornment/>}/>
            }
        />
    )
}


export default EmailInput
