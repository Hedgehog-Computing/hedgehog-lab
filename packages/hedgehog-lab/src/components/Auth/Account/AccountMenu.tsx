import {useAuth} from "../../../hooks/useAuth";
import BasePopupButton from "../../Base/Popup/BasePopupButton";
import {Avatar, IconButton, Link, MenuItem} from "@mui/material";
import {Link as RouteLink} from "react-router-dom";
import React from "react";

const AccountMenu = () => {
    const {auth, setAuthDialogOpen, setAuth} = useAuth()
    const handleLogout = () => {

        setAuth({isAuthenticated: false, user: {}, accessToken: ''})
        console.log(auth)
    }

    return (
        <>
            {auth.isAuthenticated ? (
                <BasePopupButton size={'small'} icon={<Avatar sx={{width: 24, height: 24}}/>}>
                    <Link component={RouteLink} to={'/settings/account'}
                          sx={{
                              textDecoration: 'none !important', '& :hover': {
                                  color: 'initial'
                              }
                          }}>
                        <MenuItem divider>
                            My Account
                        </MenuItem>
                    </Link>

                    <MenuItem onClick={handleLogout}>
                        Logout {auth.isAuthenticated}
                    </MenuItem>
                </BasePopupButton>
            ) : (
                <IconButton onClick={() => setAuthDialogOpen(true)}>
                    <Avatar sx={{width: 24, height: 24}}/>
                </IconButton>
            )}
        </>

    )
}

export default AccountMenu
