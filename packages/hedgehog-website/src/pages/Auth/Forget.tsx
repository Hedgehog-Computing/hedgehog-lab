import * as React from "react";
import {useCallback} from "react";
import AuthAction from "../../components/Auth/Action/AuthAction";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import {yupResolver} from "@hookform/resolvers/yup";
import {forgetModal, forgetRule} from "../../models/forget/forgetModal";

const ForgetForm = () => {
    return (
        <>
            <EmailInput/>

            <AuthAction
                action={{text: 'Forget'}}
                signOrLogin={{text: 'Already a member?', actionText: 'Log in', action: 'login'}}
                forget={{text: 'Forget password?'}}
            />
        </>
    )
}

const Forget = (): React.ReactElement => {
    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(forgetRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => {
        forgetModal(data)
    }, [])

    return (
        <FormProvider {...useFormMethods} >
            <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                <ForgetForm/>
            </form>
        </FormProvider>
    )
}


export default Forget
