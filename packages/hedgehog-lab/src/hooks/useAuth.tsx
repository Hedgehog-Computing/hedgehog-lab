import {useRecoilState} from "recoil";
import {authState} from "../states/RAuthStates";
import {useNavigate} from "react-router-dom";

export const useAuth = () => {
    const [auth, setAuth] = useRecoilState(authState);

    const navigate = useNavigate()
    const isAuthenticated = auth.isAuthenticated

    const isMe = false

    const logout = () => {
        setAuth({...auth, isAuthenticated: false});
        navigate('/')
    };

    return {isAuthenticated, isMe, logout};
};
