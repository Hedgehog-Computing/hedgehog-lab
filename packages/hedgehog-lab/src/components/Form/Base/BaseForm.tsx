import * as React from "react";
import {useCallback} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormProps} from "../../User/Auth/AuthForm/IAuthFormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import {AuthFormYupSchema} from "../../User/Auth/AuthForm/AuthFormYup";
import {useRecoilState} from "recoil";
import {authActionState} from "../../User/Auth/RAuthStates";
import {IAuthForm} from "../../User/Auth/AuthForm/IAuthForm";
import {AuthFormSubmit} from "../../User/Auth/AuthForm/AuthFormSubmit";


const BaseForm: React.FC = (props): React.ReactElement => {
    const {children} = props
    const [authAction, setAuthAction] = useRecoilState(authActionState)

    const method: keyof IAuthForm = authAction as any

    const authFormYupSchema = AuthFormYupSchema[method]

    const useFormMethods = useForm<IAuthFormProps>({
        resolver: yupResolver(authFormYupSchema)
    })

    const onSubmit: SubmitHandler<IAuthFormProps> = useCallback((data) => {
        AuthFormSubmit(method, data)
    }, [authAction])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}

export default BaseForm
