import * as React from "react";
import {useCallback} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IAuthFormProps} from "../../User/Auth/IAuthFormProps";
import {yupResolver} from "@hookform/resolvers/yup";
import {AuthYupSchema} from "../../User/Auth/AuthYupSchema";

const BaseForm: React.FC = (props): React.ReactElement => {
    const {children} = props

    const useFormMethods = useForm<IAuthFormProps>({
        resolver: yupResolver(AuthYupSchema)
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
