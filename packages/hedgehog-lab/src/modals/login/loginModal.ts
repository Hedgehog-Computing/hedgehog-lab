import * as yup from "yup";
import {IFormInput} from "../../interfaces/IFormInput";

export const loginModal = (data: IFormInput): void => {
    console.log(data)
}

export const loginRule = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

