import {Link, Typography} from "@mui/material";
import * as React from "react";
import {useCallback} from "react";
import {useRecoilState} from "recoil";
import {authActionLoadingState, authActionState} from "../../../states/RAuthStates";
import {LoadingButton} from "@mui/lab";

interface IBaseActionProps {
    forget?: {
        text: string
    },
    signOrLogin: {
        text: string,
        action: string,
        actionText: string
    },
    action: {
        text: string
    }
}


const AuthAction: React.FC<IBaseActionProps> = (prop) => {
    const [authAction, setAuthAction] = useRecoilState(authActionState)
    const [loading, setLoading] = useRecoilState(authActionLoadingState)

    const handleSetAuthAction = useCallback((action: string) => {
        setAuthAction(action)
    }, [setAuthAction])

    return (
        <>
            {authAction !== 'forget' && (
                <Typography variant={"body2"} sx={{textAlign: 'right'}}>
                    <Link sx={{fontWeight: 'medium', cursor: "pointer"}}
                          onClick={() => handleSetAuthAction('forget')}>
                        {prop.forget?.text}
                    </Link>
                </Typography>
            )}

            <Typography sx={{mt: '40px', fontWeight: 'medium'}} variant={"body1"}>
                {prop.signOrLogin?.text}
                <Link sx={{ml: '2px', fontWeight: 'medium', cursor: "pointer"}}
                      onClick={() => handleSetAuthAction(prop.signOrLogin.action)}>
                    {prop.signOrLogin.actionText}
                </Link>
            </Typography>

            <LoadingButton loading={loading} type={"submit"} sx={{mt: 2}} fullWidth size={"large"}
                           variant={'contained'}>
                {prop.action.text}
            </LoadingButton>
        </>
    )
}

export default AuthAction
