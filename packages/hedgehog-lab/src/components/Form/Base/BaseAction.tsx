import {Button, Link, Typography} from "@mui/material";
import * as React from "react";
import {useRecoilState} from "recoil";
import {authActionState} from "../../User/Auth/RAuthStates";

interface IBaseActionProps {
    forget?: {
        text: string,
        link?: string
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

const BaseAction: React.FC<IBaseActionProps> = (prop) => {
    const [authAction, setAuthAction] = useRecoilState(authActionState)

    return (
        <>
            {prop.forget && (
                <Typography variant={"body2"} sx={{textAlign: 'right'}}>
                    <Link sx={{fontWeight: 'medium'}}>
                        {prop.forget?.text}
                    </Link>
                </Typography>
            )}

            <Typography sx={{mt: '40px', fontWeight: 'medium'}} variant={"body1"}>
                {prop.signOrLogin?.text}
                <Link sx={{ml: '2px', fontWeight: 'medium'}} onClick={() => setAuthAction(prop.signOrLogin.action)}>
                    {prop.signOrLogin.actionText}
                </Link>
            </Typography>

            <Button type={"submit"} sx={{mt: '20px'}} fullWidth size={"large"} variant={'contained'}>
                {prop.action.text}
            </Button>
        </>
    )
}

export default BaseAction
