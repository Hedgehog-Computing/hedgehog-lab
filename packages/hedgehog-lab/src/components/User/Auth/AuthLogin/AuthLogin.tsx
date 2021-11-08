import * as React from "react";
import BaseForm from "../../../Form/Base/BaseForm";
import BaseAction from "../../../Form/Base/BaseAction";
import BaseAuthForm from "../../../Form/Base/BaseAuthForm";

const LoginAction = () =>
    (
        <BaseAction
            action={{text: 'Log in'}}
            signOrLogin={{text: 'Not on HHLAB yet?', linkText: 'Sign up'}}
            forget={{text: 'Forget password?'}}
        />
    )

const LoginForm = () => {
    return (
        <>
            <BaseAuthForm/>
            <LoginAction/>
        </>
    )
}

const AuthLogin = (): React.ReactElement => {
    return (
        <BaseForm>
            <LoginForm/>
        </BaseForm>
    )
}


export default AuthLogin
