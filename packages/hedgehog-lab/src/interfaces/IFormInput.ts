import {InputBaseProps} from "@mui/material";

export interface IFormInput {
    username?: string,
    email?: string,
    password?: string,
    showPassword?: boolean
}

export interface IInputProps extends Partial<InputBaseProps> {
    defaultValue?: string
}
