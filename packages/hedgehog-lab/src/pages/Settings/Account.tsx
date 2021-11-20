import React from "react";
import {Box, Button, Card, Grid, Typography} from "@mui/material";
import BaseForm from "../../components/Form/Base/BaseForm/BaseForm";
import {useRecoilState} from "recoil";
import {authActionState} from "../../components/User/Auth/RAuthStates";
import PasswordInput from "../../components/Base/Input/Password/PasswordInput";
import UserNameInput from "../../components/Base/Input/UserName/UserNameInput";
import EmailInput from "../../components/Base/Input/Email/EmailInput";

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

const Account = (): React.ReactElement => {
    const [authAction, setAuthAction] = useRecoilState(authActionState)

    return (
        <>
            <Box textAlign={"center"} mb={'30px'}>
                <Typography variant={'h2'}>
                    Personal information
                </Typography>

                <Typography variant={'h6'}>
                    Your personal information and preferences in various HHLAB services
                </Typography>
            </Box>

            <BaseForm>
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
            </BaseForm>
        </>
    )
}

export default Account
