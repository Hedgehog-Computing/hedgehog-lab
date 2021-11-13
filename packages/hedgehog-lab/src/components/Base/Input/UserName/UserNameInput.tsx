import {Controller} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../HOutlined/HOutlinedInput";
import {PersonOutlined} from "@mui/icons-material";
import {IFormProps} from "../../../Form/IFormProps";

const StartAdornment = () =>
    (
        <PersonOutlined/>
    )

const name = 'username'

const UserNameInput: React.FC<IFormProps> = (props): React.ReactElement => {
    const {control, error} = props
    return (
        <Controller
            // name ref IAuthFormProps
            name={name}
            control={control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput error={error} placeholder={'Username'}
                                name={name}
                                field={field} startAdornment={<StartAdornment/>}/>
            }
        />
    )
}


export default UserNameInput
