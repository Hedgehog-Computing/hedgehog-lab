import * as yup from "yup";
import {IFormInput} from "../../interfaces/IFormInput";

export const accountModal = (data: IFormInput): void => {
    console.log(data)
}

export const accountRule = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

