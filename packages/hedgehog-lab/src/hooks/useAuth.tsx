import {useRecoilState, useResetRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authErrorMessageState, authState,} from "../states/RAuthStates";
import {useMatch, useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {http} from "../network/http";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);
    const [errorMessage, setErrorMessage] = useRecoilState(authErrorMessageState);
    const [authDialogOpen, setAuthDialogOpen] = useRecoilState(authDialogState);
    const [loading, setLoading] = useRecoilState(authActionLoadingState);
    const restAuth = useResetRecoilState(authState);

    const navigate = useNavigate();

    const isMe = !!useMatch(`u/${auth.user.firstname}`);
    const mathAccountPage = useMatch(`/settings/account`);

    const authorize = useCallback(
        async (accessToken: string) => {
            localStorage.setItem("accessToken", accessToken);
            try {
                await me();
            } catch (error) {
                setErrorMessage(error.response.data.message);
            }
        },
        [setErrorMessage]
    );

    const login = useCallback(
        async (data: any) => {
            setLoading(true);
            try {
                const res = await http.post("/auth/login", data);
                authorize(res.data?.accessToken);
            } catch (error) {
                const message = error.response.data.message;
                setErrorMessage(message);
            } finally {
                setLoading(false);
            }
        },
        [authorize, setErrorMessage, setLoading]
    );

    const signUp = useCallback(
        async (data: any) => {
            setLoading(true);
            try {
                const res = await http.post("/auth/signup", data);
                authorize(res.data?.accessToken);
            } catch (error) {
                const message = error.response.data.message;
                setErrorMessage(message);
            } finally {
                setLoading(false);
            }
        },
        [authorize, setErrorMessage, setLoading]
    );

    const logout = useCallback(() => {
        restAuth();

        if (!!mathAccountPage) {
            navigate("/");
        }
    }, [restAuth, mathAccountPage, navigate]);

    const me = async () => {
        const accessToken = localStorage.getItem("accessToken");
        try {
            const response = await http.post("/auth/me", {accessToken});
            setAuth({
                isAuthenticated: true,
                accessToken,
                user: response.data,
            });
        } catch (error) {
            logout();
            return auth;
        }
    };

    return {
        login,
        signup: signUp,
        auth,
        isMe,
        logout,
        loading,
        setLoading,
        authDialogOpen,
        setAuthDialogOpen,
        errorMessage,
        setErrorMessage,
        authorize,
        setAuth,
        me,
    };
};
