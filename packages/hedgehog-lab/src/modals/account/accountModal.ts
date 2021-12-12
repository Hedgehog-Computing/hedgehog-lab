import * as yup from "yup";
import {IAuthFormInput} from "../../pages/Auth/IAuthFormInput";

export const accountModal = (data: IAuthFormInput): void => {
    console.log(data)
}

export const accountRule = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

