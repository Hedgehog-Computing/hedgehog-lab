import {atom} from "recoil";

export const authState = atom<{
    isAuthenticated: boolean;
    user: any;
}>({
    key: "authState",
    default: {
        isAuthenticated: false,
        user: {}
    },
});

export const authDialogState = atom({
    key: 'authDialogState',
    default: false
})

export const authActionState = atom({
    key: 'authActionState',
    default: 'login'
})

export const authActionLoadingState = atom({
    key: 'authActionLoading',
    default: false
})

export const authErrorMessageState = atom({
    key: 'authErrorMessage',
    default: ''
})
