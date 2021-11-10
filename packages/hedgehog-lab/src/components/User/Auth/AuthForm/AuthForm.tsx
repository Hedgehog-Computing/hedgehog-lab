import AuthLogin from "../AuthLogin/AuthLogin";
import AuthSign from "../AuthSign/AuthSign";
import AuthForget from "../AuthForget/AuthForget";
import * as React from "react";
import {useRecoilState} from "recoil";
import {authActionState} from "../RAuthStates";

const AuthForm = (): React.ReactElement => {

    const [authAction, setAuthAction] = useRecoilState(authActionState)

    return (
        <>
            {authAction === 'login' && (<AuthLogin/>)}
            {authAction === 'sign' && (<AuthSign/>)}
            {authAction === 'forget' && (<AuthForget/>)}
        </>
    )
}

export default AuthForm
