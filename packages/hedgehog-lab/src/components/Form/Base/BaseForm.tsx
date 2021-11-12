import * as React from "react";
import {useCallback} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormProps} from "../../User/Auth/IAuthFormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import {AuthForgetYupSchema, AuthLoginYupSchema, AuthSignYupSchema} from "../../User/Auth/AuthForm/AuthFormYup";
import {useRecoilState} from "recoil";
import {authActionState} from "../../User/Auth/RAuthStates";

const BaseForm: React.FC = (props): React.ReactElement => {
    const {children} = props

    const [authAction, setAuthAction] = useRecoilState(authActionState)

    const yupSchema =
        authAction === 'login' ? AuthLoginYupSchema
            : authAction === 'sign' ? AuthSignYupSchema
                : authAction === 'forget' ? AuthForgetYupSchema
                    : AuthLoginYupSchema

    const useFormMethods = useForm<IAuthFormProps>({
        resolver: yupResolver(yupSchema)
    })

    const onSubmit: SubmitHandler<IAuthFormProps> = useCallback((data) => {
        console.log(data)
    }, [])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}

export default BaseForm
