import * as React from "react";
import {useRecoilValue} from "recoil";
import Sign from "./Sign";
import Forget from "./Forget";
import Login from "./Login";
import {authActionState} from "../../states/RAuthStates";

const Auth = (): React.ReactElement => {

    const authAction = useRecoilValue(authActionState)

    return (
        <>
            {authAction === 'login' && (<Login/>)}
            {authAction === 'sign' && (<Sign/>)}
            {authAction === 'forget' && (<Forget/>)}
        </>
    )
}

export default Auth
