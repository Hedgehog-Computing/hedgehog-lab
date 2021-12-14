import {IAuthFormProps} from "../../../User/Auth/AuthForm/IAuthFormProps";

export interface IPasswordProps extends IAuthFormProps {
    handleClickShowPassword: () => void,
}
