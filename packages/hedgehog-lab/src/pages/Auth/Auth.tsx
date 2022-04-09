import * as React from "react";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Sign from "./Sign";
import Forget from "./Forget";
import Login from "./Login";
import {authActionLoadingState, authActionState} from "../../states/RAuthStates";

const Auth = (): React.ReactElement => {

    const authAction = useRecoilValue(authActionState)
    const setLoading = useSetRecoilState(authActionLoadingState)

    useEffect(() => {
        setLoading(false)
    }, [setLoading])

    return (
        <>
            {authAction === 'login' && (<Login/>)}
            {authAction === 'sign' && (<Sign/>)}
            {authAction === 'forget' && (<Forget/>)}
        </>
    )
}

export default Auth
