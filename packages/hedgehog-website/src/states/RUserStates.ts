import {atom, selector} from "recoil";

interface IAuthState {
    isAuthenticated: boolean;
    user: any;
    accessToken: string
}

const authStateAtom = atom<IAuthState>({
    key: "AuthStateAtom",
    default: {
        isAuthenticated: false,
        accessToken: '',
        user: {}
    },
});


export const userState = selector({
    key: "AuthState",
    get: async ({get}) => {
        return get(authStateAtom);
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
        return get(currentUserEmailAtom);
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
