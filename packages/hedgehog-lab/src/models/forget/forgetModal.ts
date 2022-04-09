import * as yup from "yup";
import {IFormInput} from "../../interfaces/IFormInput";

export const forgetModal = (data: IFormInput): void => {
    console.log(data)
}

export const forgetRule = yup.object({
    email: yup.string().email().required(),
}).required();

