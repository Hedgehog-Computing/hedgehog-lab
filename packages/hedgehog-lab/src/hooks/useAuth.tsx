import {useRecoilState, useResetRecoilState} from "recoil";
import {authActionLoadingState, authDialogState, authErrorMessageState, userState,} from "../states/RUserStates";
import {useMatch, useNavigate} from "react-router-dom";
import {useCallback} from "react";
import {http} from "../network/http";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(userState);
    const [errorMessage, setErrorMessage] = useRecoilState(authErrorMessageState);
    const [authDialogOpen, setAuthDialogOpen] = useRecoilState(authDialogState);
    const [loading, setLoading] = useRecoilState(authActionLoadingState);
    const restAuth = useResetRecoilState(userState);

    const navigate = useNavigate();

    const isMe = !!useMatch(`u/${auth.user.username}`);
    const isMeLike = !!useMatch(`u/${auth.user.username}/likes`)

    const mathAccountPage = useMatch(`/settings/account`);

    const authorize = useCallback(
        async (accessToken: string) => {
            localStorage.setItem("accessToken", accessToken);
            try {
                await me();
            } catch (error) {
                setErrorMessage(error.response?.data.message);
            }
        },
        [setErrorMessage]
    );

    const login = useCallback(
        async (data: any) => {
            setLoading(true);
            try {
                const res = await http.post("/auth/login", data);
                const token = res.data?.response?.result?.accessToken
                authorize(token);
            } catch (error) {
                const message = error.response?.data.message;
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
                authorize(res.data?.response?.result?.accessToken);
            } catch (error) {
                const message = error.response?.data.message;
                setErrorMessage(message);
            } finally {
                setLoading(false);
            }
        },
        [authorize, setErrorMessage, setLoading]
    );

    const logout = useCallback(() => {
        restAuth();
        http.defaults.headers.common["Authorization"] = "";

        if (!!mathAccountPage) {
            navigate("/");
        }
    }, [restAuth, mathAccountPage, navigate]);

    const me = async () => {
        const accessToken = localStorage.getItem("accessToken");
        http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        try {
            const response = await http.post("/auth/me");
            setAuth({
                isAuthenticated: true,
                accessToken,
                user: response.data.response.result,
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
        isMeLike
    };
};
