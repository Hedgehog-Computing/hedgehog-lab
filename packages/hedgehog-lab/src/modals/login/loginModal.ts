import * as yup from "yup";
import {IBaseFormProps} from "../../components/Base/Form/IBaseFormProps";

export const loginModal = (data: IBaseFormProps): void => {
    console.log(data)
}

export const loginRule = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

