import * as React from "react";
import {useCallback} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormInput} from "../../../pages/Auth/IAuthFormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {FormRules} from "./BaseFormRule";
import {useRecoilValue} from "recoil";
import {IBaseFormMethods} from "./IBaseFormMethods";
import {BaseFormModal} from "./BaseFormModal";
import {authActionState} from "../../../pages/Auth/RAuthStates";


const BaseForm: React.FC = (props): React.ReactElement => {
    const {children} = props
    const authAction = useRecoilValue(authActionState)

    const method: keyof IBaseFormMethods = authAction as any

    const formRule = FormRules[method]

    const useFormMethods = useForm<IAuthFormInput>({
        resolver: yupResolver(formRule)
    })

    const onSubmit: SubmitHandler<IAuthFormInput> = useCallback((data) => {
        BaseFormModal(method, data)
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
