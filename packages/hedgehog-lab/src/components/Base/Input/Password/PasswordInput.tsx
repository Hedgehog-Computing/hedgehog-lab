import {IconButton} from "@mui/material";
import {PasswordOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Controller, useFormContext} from "react-hook-form";
import * as React from "react";
import {useCallback, useState} from "react";
import HOutlinedInput from "../HOutlinedInput/HOutlinedInput";
import {IPasswordProps} from "./IPasswordProps";

const name = 'password'

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

const PasswordInput = (): React.ReactElement => {
    const useFormMethods = useFormContext()
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword])

    return (
        <Controller
            // name ref IAuthFormProps
            name={name}
            control={useFormMethods.control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput
                    field={field}
                    name={name}
                    error={useFormMethods.formState.errors}
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
