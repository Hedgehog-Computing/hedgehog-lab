import React, {useCallback, useEffect} from "react";
import {yupResolver} from "@hookform/resolvers/yup";
import {Box, Button, Card, Grid, OutlinedInput, Typography} from "@mui/material";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {IFormInput} from "../../interfaces/IFormInput";
import {accountRule} from "../../models/account/accountModal";
import {currentUserEmail} from "../../states/RAuthStates";
import {useRecoilState} from "recoil";
import {useAuth} from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";


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
    const {auth} = useAuth()

    const [email, setEmail] = useRecoilState(currentUserEmail)
    const navigate = useNavigate()

    useEffect(() => {
        if (!auth.isAuthenticated) {
            navigate('/')
        }
    })

    const changePassword = useCallback(() => {
        console.log('send email')
    }, [])

    return (
        <React.Suspense fallback={<div>Loading...</div>}>
            <Card variant={"outlined"}>
                <Box m={'20px'}>
                    <Grid container spacing={2}>
                        <Grid item xs={2} alignSelf={'center'}>
                            <Typography variant={'body1'}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={10}>

                            <OutlinedInput value={email} disabled={true} fullWidth/>

                        </Grid>
                    </Grid>


                    <Box textAlign={'end'}>
                        <Button variant={"contained"} sx={{mt: '20px'}}
                                onClick={changePassword}>
                            Rest Password
                        </Button>
                    </Box>
                </Box>
            </Card>
        </React.Suspense>
    )
}

const Account = (): React.ReactElement => {
    const {auth} = useAuth()

    const useFormMethods = useForm<IFormInput>({
        resolver: yupResolver(accountRule)
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data)
    }

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
