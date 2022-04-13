import {atom, selector} from "recoil";
import {http} from "../hooks/http";

interface IAuthState {
    isAuthenticated: boolean;
    user: any;
    accessToken: string
}

const authStateAtom = atom<IAuthState>({
    key: "authStateAtom",
    default: {
        isAuthenticated: false,
        accessToken: '',
        user: {}
    },
});


export const authState = selector({
    key: "authState",
    get: async ({get}) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await http.post('/auth/me', {accessToken});
            return {
                isAuthenticated: true,
                accessToken,
                user: response.data
            };
        } catch (error) {
            return get(authStateAtom);
        }
    },
    set: ({set}, newValue: any) => {
        if (newValue.accessToken) {
            localStorage.setItem('accessToken', newValue.accessToken);
        }

        if (!newValue.isAuthenticated) {
            localStorage.removeItem('accessToken');
        }

        set(authStateAtom, newValue);
    }
});

const currentUserEmailAtom = atom({
    key: 'CurrentUserEmailAtom',
    default: ''
});

export const currentUserEmail = selector({
    key: 'CurrentUserEmail',
    get: async ({get}) => {
        const accessToken = localStorage.getItem('accessToken');

        try {
            const response = await http.post('/auth/me', {accessToken});
            return response.data.email;
        } catch (error) {
            return error.response.data.message;
        }
    },
    set: ({set}, newValue: any) => {
        console.log('set', newValue);
        set(currentUserEmailAtom, newValue);
    }
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
