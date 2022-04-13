import {useRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authErrorMessageState, authState} from "../states/RAuthStates";
import {useMatch, useNavigate} from "react-router-dom";
import {http} from "./http";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [errorMessage, setErrorMessage] = useRecoilState(authErrorMessageState)
    const [authDialogOpen, setAuthDialogOpen] = useRecoilState(authDialogState)
    const [loading, setLoading] = useRecoilState(authActionLoadingState)

    const navigate = useNavigate()
    const isAuthenticated = auth.isAuthenticated

    const isMe = !!useMatch(`u/${auth.user.firstname}`)
    const mathAccountPage = useMatch(`/settings/account`)

    const login = (accessToken: string) => {
        setAuth({...auth, isAuthenticated: true, accessToken})
        setErrorMessage('')

        localStorage.setItem('accessToken', accessToken)
        me()
    }

    const logout = () => {
        setAuth({...auth, isAuthenticated: false});
        localStorage.removeItem('accessToken')

        if (!!mathAccountPage) {
            navigate('/')
        }
    };

    const me = async () => {
        const accessToken = localStorage.getItem('accessToken')
        if (!accessToken) {
            logout()
        }

        await http.post('/auth/me', {accessToken}).then(res => {
            setAuth({...auth, isAuthenticated: true, user: res.data})
        }).catch(() => {
            setAuth({...auth, isAuthenticated: false})
            logout()
        }).finally(() => {
            setLoading(false)
        });
    }

    return {
        auth,
        setAuth,
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
        me
    };
};
