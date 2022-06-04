import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {BaseTextFieldProps} from "@mui/material";
import BaseOutlinedInput from "../BaseOutlinedInput/BaseOutlinedInput";
import {PersonOutlined} from "@mui/icons-material";

const name = 'description';

const UserDescriptionInput: React.FC<BaseTextFieldProps> = (props) => {
    const useFormMethods = useFormContext()

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    size={props.size}
                    field={field}
                    placeholder={'Introduce yourself'}
                    adornment={{
                        start: <PersonOutlined/>
                    }}
                />
            }
        />
    )
}

export default UserDescriptionInput;
