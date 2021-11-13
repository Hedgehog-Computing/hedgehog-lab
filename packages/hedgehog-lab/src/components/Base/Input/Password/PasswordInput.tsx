import {IconButton} from "@mui/material";
import {PasswordOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Controller} from "react-hook-form";
import * as React from "react";
import {useCallback, useState} from "react";
import {IBaseInputProps} from "../IBaseInputProps";
import HOutlinedInput from "../HOutlined/HOutlinedInput";
import {IPasswordProps} from "./IPasswordProps";

const StartAdornment = () =>
    (
        <PasswordOutlined/>
    )

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

const PasswordInput: React.FC<IBaseInputProps> = (props) => {
    const {control, error} = props

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    const name = 'password'

    return (
        <Controller
            // name ref IAuthFormProps
            name={name}
            control={control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput
                    name={name}
                    field={field}
                    error={error}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <EndAdornment handleClickShowPassword={handleClickShowPassword} showPassword={showPassword}/>
                    }
                    placeholder={'Password'}
                    startAdornment={
                        <StartAdornment/>
                    }/>
            }
        />
    )
}

export default PasswordInput
