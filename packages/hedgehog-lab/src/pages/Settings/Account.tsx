import React, {useCallback} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import UserNameInput from "../../components/Base/Input/UserName/UserNameInput";
import {IFormInput} from "../../interfaces/IFormInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import {accountModal, accountRule} from "../../models/account/accountModal";
import {authActionState} from "../../states/RAuthStates";
import {useSetRecoilState} from "recoil";

const accountForm = [
    {
        text: 'Name',
        render: <UserNameInput/>
    },
    {
        text: 'Email',
        render: <EmailInput/>
    },
    {
        text: 'Password',
        render: <PasswordInput/>
    },
]

const Header = (): React.ReactElement => (
    <Box textAlign={"center"} mb={'30px'}>
        <Typography variant={'h2'}>
            Personal information
        </Typography>

        <Typography variant={'h6'}>
            Your personal information and preferences in various HHLAB services
        </Typography>
    </Box>
)

const AccountForm = () => {
    const setAuthAction = useSetRecoilState(authActionState)

    return (
        <Card variant={"outlined"}>
            <Box m={'20px'}>
                {accountForm.map((item, index) => {
                    return (
                        <Grid key={index} container spacing={2} mt={index > 0 ? '20px' : '0'}>
                            <Grid item xs={2} alignSelf={'center'}>
                                <Typography variant={'body1'}>
                                    {item.text}
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                {item.render}
                            </Grid>
                        </Grid>
                    )
                })}

                <Box textAlign={'end'}>
                    <Button variant={"contained"} sx={{mt: '20px'}} type={"submit"}
                            onClick={() => setAuthAction('settingAccount')}>
                        Update
                    </Button>
                </Box>
            </Box>
        </Card>
    )
}

const Account = (): React.ReactElement => {
    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(accountRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => {
        accountModal(data)
    }, [])

    return (
        <>
            <Header/>

            <FormProvider {...useFormMethods} >
                <form onSubmit={useFormMethods.handleSubmit(onSubmit)}>
                    <AccountForm/>
                </form>
            </FormProvider>
        </>
    )
}

export default Account
