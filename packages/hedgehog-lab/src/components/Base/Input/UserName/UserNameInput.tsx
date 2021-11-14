import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import HOutlinedInput from "../HOutlined/HOutlinedInput";
import {PersonOutlined} from "@mui/icons-material";

const StartAdornment = () =>
    (
        <PersonOutlined/>
    )

const name = 'username'

const UserNameInput = (): React.ReactElement => {

    const useFormMethods = useFormContext()
    return (
        <Controller
            // name ref IAuthFormProps
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput error={useFormMethods.formState.errors}
                                placeholder={'Username'}
                                field={field}
                                name={name}
                                startAdornment={<StartAdornment/>}/>
            }
        />
    )
}


export default UserNameInput
