import * as yup from "yup";
import {IAuthFormInput} from "../../pages/Auth/IAuthFormInput";

export const forgetModal = (data: IAuthFormInput): void => {
    console.log(data)
}

export const forgetRule = yup.object({
    email: yup.string().email().required(),
}).required();

