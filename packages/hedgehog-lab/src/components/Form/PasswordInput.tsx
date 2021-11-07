import {IconButton} from "@mui/material";
import {PasswordOutlined, VisibilityOffOutlined, VisibilityOutlined} from "@mui/icons-material";
import {Controller} from "react-hook-form";
import * as React from "react";
import {useState} from "react";
import {IFormProps} from "./IFormProps";
import {IAuthFormProps} from "../User/Auth/IAuthFormProps";
import HOutlinedInput from "../Base/Input/HOutlinedInput";

interface IPasswordInputProps extends IAuthFormProps {
    handleClickShowPassword?: () => void,
}

const StartAdornment = () =>
    (
        <PasswordOutlined/>
    )

const EndAdornment: React.FC<IPasswordInputProps> = (props) => {
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

const PasswordInput: React.FC<IFormProps> = (props) => {
    const {control} = props

    const [showPassword, setShowPassword] = useState<boolean>(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };


    return (
        <Controller
            // name ref IAuthFormProps
            name={'password'}
            control={control}
            defaultValue={''}
            render={({field}) =>
                <HOutlinedInput
                    field={field}
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
