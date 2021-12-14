import {atom} from "recoil";

export const authDialogState = atom({
    key: 'authDialogState',
    default: false
})

export const authActionState = atom({
    key: 'authActionState',
    default: 'login'
})
