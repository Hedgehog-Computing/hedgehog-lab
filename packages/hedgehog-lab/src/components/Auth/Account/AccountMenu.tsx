import {useAuth} from "../../../hooks/useAuth";
import BasePopupButton from "../../Base/Popup/BasePopupButton";
import {Avatar, Button, MenuItem} from "@mui/material";
import React from "react";
import {AccountBoxOutlined} from "@mui/icons-material";

const AccountMenu = () => {
    const {auth, setAuthDialogOpen, setAuth} = useAuth()
    const handleLogout = () => {

        setAuth({isAuthenticated: false, user: {}, accessToken: ''})
        console.log(auth)
    }

    return (
        <>
            {auth.isAuthenticated ? (
                <BasePopupButton type={'button'} size={'small'}
                                 text={'Account'}
                                 icon={<Avatar sx={{width: 24, height: 24, color: 'inherit'}}/>}>
                    {/*<Link component={RouteLink} to={'/settings/account'}*/}
                    {/*      sx={{*/}
                    {/*          textDecoration: 'none !important', '& :hover': {*/}
                    {/*              color: 'initial'*/}
                    {/*          }*/}
                    {/*      }}>*/}
                    {/*    <MenuItem divider>*/}
                    {/*        My Account*/}
                    {/*    </MenuItem>*/}
                    {/*</Link>*/}

                    <MenuItem onClick={handleLogout}>
                        Logout {auth.isAuthenticated}
                    </MenuItem>
                </BasePopupButton>
            ) : (
                <Button sx={{alignSelf: 'center'}} size={"small"} color={'inherit'}
                        variant={'contained'} onClick={() => setAuthDialogOpen(true)}
                        endIcon={<AccountBoxOutlined/>}>
                    Account
                </Button>
            )}
        </>

    )
}

export default AccountMenu
