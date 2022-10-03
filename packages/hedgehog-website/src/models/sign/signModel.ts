import * as yup from "yup";

export const signRule = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();
