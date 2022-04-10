import {useAuth} from "../../../hooks/useAuth";
import BasePopupButton from "../../Base/Popup/BasePopupButton";
import {Avatar, Link, MenuItem} from "@mui/material";
import {Link as RouteLink} from "react-router-dom";
import React from "react";

const AccountMenu = () => {
    const {isAuthenticated, logout} = useAuth()

    return (
        <>
            {isAuthenticated && (
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

                    <MenuItem onClick={logout}>
                        Logout
                    </MenuItem>
                </BasePopupButton>
            )}
        </>

    )
}

export default AccountMenu
