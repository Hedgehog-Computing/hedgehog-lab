import * as React from "react";
import {useRecoilValue} from "recoil";
import Sign from "./Sign";
import AuthForget from "../../components/Auth/Forget/AuthForget";
import Login from "./Login";
import {authActionState} from "./RAuthStates";

const Auth = (): React.ReactElement => {

    const authAction = useRecoilValue(authActionState)

    return (
        <>
            {authAction === 'login' && (<Login/>)}
            {authAction === 'sign' && (<Sign/>)}
            {authAction === 'forget' && (<AuthForget/>)}
        </>
    )
}

export default Auth
