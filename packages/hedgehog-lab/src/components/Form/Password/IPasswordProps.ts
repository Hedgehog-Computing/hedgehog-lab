import {IAuthFormProps} from "../../User/Auth/IAuthFormProps";

export interface IPasswordProps extends IAuthFormProps {
    handleClickShowPassword: () => void,
}
