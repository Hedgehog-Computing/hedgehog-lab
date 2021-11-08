import * as yup from "yup";

export const AuthYupSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();
