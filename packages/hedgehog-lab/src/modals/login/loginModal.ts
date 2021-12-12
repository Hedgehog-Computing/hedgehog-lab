import * as yup from "yup";
import {IAuthFormInput} from "../../pages/Auth/IAuthFormInput";

export const loginModal = (data: IAuthFormInput): void => {
    console.log(data)
}

export const loginRule = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

