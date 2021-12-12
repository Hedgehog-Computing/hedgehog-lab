import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import BaseOutlinedInput from "../BaseOutlinedInput/BaseOutlinedInput";
import {PersonOutlined} from "@mui/icons-material";

const name = 'username'

const UserNameInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    field={field}
                    adornment={{
                        start: <PersonOutlined/>
                    }}
                />
            }
        />
    )
}


export default UserNameInput
