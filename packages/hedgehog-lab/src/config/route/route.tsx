import {Route, Routes, useLocation} from "react-router-dom";
import * as React from "react";
import HedgehogLab from "../../HedgehogLab";
import {IRuteProps} from "./IRuteProps";
import AuthForm from "../../components/User/Auth/AuthForm/AuthForm";

const routes: Array<IRuteProps> = [
    {
        path: '/',
        element: <HedgehogLab/>
    },
    {
        path: '/auth',
        element: <AuthForm/>
    },
]

export const RoutePage = (): React.ReactElement => {
    // modal route
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };


    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                {
                    routes.map((item, key) =>
                        <Route path={item.path} key={key} element={item.element}/>
                    )
                }
            </Routes>
        </>
    )
}
