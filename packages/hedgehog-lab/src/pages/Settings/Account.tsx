import React, {useCallback} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import {accountRule} from "../../models/account/accountModal";
import {authActionState} from "../../states/RAuthStates";
import {useSetRecoilState} from "recoil";
import {useAuth} from "../../hooks/useAuth";
import {http} from "../../hooks/http";


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
    const {auth} = useAuth()

    const accountForm = [
        {
            text: 'Email',
            render: <EmailInput defaultValue={auth.user.email}/>
        },
        {
            text: 'Password',
            render: <PasswordInput/>
        },
    ]

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
    const {auth} = useAuth()

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(accountRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
        console.log(123)
        await http.post('/auth/update', auth.accessToken).then(res => {
            return res
        }).catch(err => {
            const message = err.response.data.message
        }).finally(() => {
            return
        });
    }, [auth.accessToken])

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
