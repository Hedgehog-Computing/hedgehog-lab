import {atom} from "recoil";

export const codeSavingFlagState = atom({
    key: 'codeSavingFlag',
    default: false
})


export const editorCodeState = atom({
    key: 'editorCode',
    default: ''
})


export const inputCodeState = atom({
    key: 'inputCode',
    default: ''
})


