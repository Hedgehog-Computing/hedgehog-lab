import * as React from "react";
import {useEffect} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import Sign from "./Sign";
import Forget from "./Forget";
import Login from "./Login";
import {authActionLoadingState, authActionState} from "../../states/RUserStates";
import {useAuth} from "../../hooks/useAuth";
import {Alert, Box} from "@mui/material";

const Auth = (): React.ReactElement => {

    const authAction = useRecoilValue(authActionState)
    const setLoading = useSetRecoilState(authActionLoadingState)
    const {errorMessage} = useAuth()

    useEffect(() => {
        setLoading(false)
    }, [setLoading])

    return (
        <>
            {errorMessage && (
                <Alert severity="error" sx={{mb: 2}}>
                    {Array.isArray(errorMessage) ? errorMessage.map((message, index) => (
                        <Box key={index} sx={{textAlign: 'left'}}>{message}</Box>
                    )) : errorMessage}
                </Alert>
            )}

            {authAction === 'login' && (<Login/>)}
            {authAction === 'sign' && (<Sign/>)}
            {authAction === 'forget' && (<Forget/>)}
        </>
    )
}

export default Auth
