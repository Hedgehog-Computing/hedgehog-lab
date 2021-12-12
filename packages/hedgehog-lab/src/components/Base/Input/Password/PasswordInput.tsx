import {IconButton} from "@mui/material";
import {PasswordOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {useCallback, useState} from "react";
import BaseOutlinedInput from "../BaseOutlinedInput/BaseOutlinedInput";
import {IAuthFormInput} from "../../../../pages/Auth/IAuthFormInput";

const name = 'password'

interface IPasswordProps extends IAuthFormInput {
    handleClickShowPassword: () => void,
}

const EndAdornment: React.FC<IPasswordProps> = (props) => {
    const {handleClickShowPassword, showPassword} = props

    return (
        <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            edge="end"
        >
            {showPassword ? <VisibilityOffOutlined/> : <VisibilityOutlined/>}
        </IconButton>
    )
}

const PasswordInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    return (
        <Controller
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <BaseOutlinedInput
                    field={field}
                    type={showPassword ? 'text' : 'password'}
                    adornment={{
                        start: <PasswordOutlined/>,
                        end: <EndAdornment
                            handleClickShowPassword={handleClickShowPassword}
                            showPassword={showPassword}/>
                    }}
                />
            }
        />
    )
}

export default PasswordInput
