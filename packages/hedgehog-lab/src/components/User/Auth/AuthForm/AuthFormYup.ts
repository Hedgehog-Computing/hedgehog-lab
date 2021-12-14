import * as yup from "yup";

const AuthLoginYupSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

const AuthSignYupSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

const AuthForgetYupSchema = yup.object({
    email: yup.string().email().required(),
}).required();

const AuthSettingAccountYupSchema = AuthSignYupSchema

export const AuthFormYupSchema = {
    'login': AuthLoginYupSchema,
    'sign': AuthSignYupSchema,
    'forget': AuthForgetYupSchema,
    'settingAccount': AuthSettingAccountYupSchema
}
