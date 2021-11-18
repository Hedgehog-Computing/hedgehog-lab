import {atom} from "recoil";

export const codeSavingFlagState = atom({
    key: 'codeSavingFlag',
    default: false
})

export const compilerLoadingState = atom({
    key: 'compilerLoading',
    default: false
})

export const editorCodeState = atom({
    key: 'editorCode',
    default: ''
})

export const compilerResultState = atom({
    key: 'compilerResult',
    default: {
        outputItem: [],
        outputString: ''
    }
})

export const inputCodeState = atom({
    key: 'inputCode',
    default: ''
})

export const compilerReFetchState = atom({
    key: 'compilerReFetch',
    default: false
})

