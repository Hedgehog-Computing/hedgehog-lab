import * as yup from "yup";

export const AuthLoginYupSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

export const AuthSignYupSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

export const AuthForgetYupSchema = yup.object({
    email: yup.string().email().required(),
}).required();
