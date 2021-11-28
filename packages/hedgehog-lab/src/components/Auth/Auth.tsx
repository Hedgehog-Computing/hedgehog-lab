import AuthLogin from "./Login/AuthLogin";
import AuthSign from "./Sign/AuthSign";
import AuthForget from "./Forget/AuthForget";
import * as React from "react";
import {useRecoilValue} from "recoil";
import {authActionState} from "./RAuthStates";

const Auth = (): React.ReactElement => {

    const authAction = useRecoilValue(authActionState)

    return (
        <>
            {authAction === 'login' && (<AuthLogin/>)}
            {authAction === 'sign' && (<AuthSign/>)}
            {authAction === 'forget' && (<AuthForget/>)}
        </>
    )
}

export default Auth
