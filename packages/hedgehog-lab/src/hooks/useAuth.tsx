import {useRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authErrorMessageState, authState} from "../states/RAuthStates";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [errorMessage, setErrorMessage] = useRecoilState(authErrorMessageState)
    const [authDialogOpen, setAuthDialogOpen] = useRecoilState(authDialogState)
    const [loading, setLoading] = useRecoilState(authActionLoadingState)

    const navigate = useNavigate()
    const isAuthenticated = auth.isAuthenticated

    const isMe = false

    const login = () => {
        setAuth({...auth, isAuthenticated: true})
        setAuthDialogOpen(false)
        setErrorMessage('')
    }

    const logout = () => {
        setAuth({...auth, isAuthenticated: false});
        navigate('/')
    };

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
        login
    };
};
