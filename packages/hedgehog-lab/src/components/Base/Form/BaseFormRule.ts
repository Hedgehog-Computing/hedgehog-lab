import * as yup from "yup";

const Login = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

const Sign = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required()
}).required();

const Forget = yup.object({
    email: yup.string().email().required(),
}).required();

const SettingAccount = Sign

export const FormRules = {
    'login': Login,
    'sign': Sign,
    'forget': Forget,
    'settingAccount': SettingAccount
}
