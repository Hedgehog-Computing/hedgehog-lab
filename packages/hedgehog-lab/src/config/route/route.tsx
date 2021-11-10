import {Route, Routes, useLocation} from "react-router-dom";
import * as React from "react";
import HedgehogLab from "../../HedgehogLab";
import {IRuteProps} from "./IRuteProps";
import AuthLogin from "../../components/User/Auth/AuthLogin/AuthLogin";

const routes: Array<IRuteProps> = [
    {
        title: 'Home',
        path: '/',
        element: <HedgehogLab/>
    },
    {
        title: 'Login',
        path: '/login',
        element: <AuthLogin/>
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

            {state?.backgroundLocation === undefined && (
                <Routes>
                    <Route path={'/login'} element={<AuthLogin/>}/>
                </Routes>
            )}
        </>
    )
}
