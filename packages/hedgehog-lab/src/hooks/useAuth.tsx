import {useRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authErrorMessageState, authState} from "../states/RAuthStates";
import {useMatch, useNavigate} from "react-router-dom";
import {useCallback} from "react";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [errorMessage, setErrorMessage] = useRecoilState(authErrorMessageState)
    const [authDialogOpen, setAuthDialogOpen] = useRecoilState(authDialogState)
    const [loading, setLoading] = useRecoilState(authActionLoadingState)

    const navigate = useNavigate()
    const isAuthenticated = auth.isAuthenticated

    const isMe = !!useMatch(`u/${auth.user.firstname}`)
    const mathAccountPage = useMatch(`/settings/account`)

    const login = useCallback((accessToken: string) => {
        setAuth({...auth, isAuthenticated: true, accessToken})
        setErrorMessage('')

        localStorage.setItem('accessToken', accessToken)

    }, [auth, setAuth, setErrorMessage])

    const logout = useCallback(() => {
        setAuth({...auth, isAuthenticated: false});
        localStorage.removeItem('accessToken')

        if (!!mathAccountPage) {
            navigate('/')
        }
    }, [setAuth, auth, mathAccountPage, navigate])


    return {
        auth,
        isAuthenticated,
        isMe,
        logout,
        loading,
        setLoading,
        authDialogOpen,
        setAuthDialogOpen,
        errorMessage,
        setErrorMessage,
        login,
    };
};
