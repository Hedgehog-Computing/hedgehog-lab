import {Route, Routes, useLocation} from "react-router-dom";
import * as React from "react";
import {IRuteProps} from "./IRuteProps";
import AuthForm from "../../components/User/Auth/AuthForm/AuthForm";
import Account from "../../pages/Settings/Account";
import Layout from "../../components/Layout/Layout";
import Main from "../../pages/Main/Main";
import ContainerLayout from "../../components/Layout/ContainerLayout";

const routes: Array<IRuteProps> = [
    {
        path: '/',
        element: <Main/>
    },
    {
        path: '/auth',
        element: <AuthForm/>
    },
    {
        path: '/tutorial/:tutorialID',
        element: <Main/>
    },
    {
        path: '/snippet/new',
        element: <Main/>
    }
]

const settingRoutes: Array<IRuteProps> = [
    {
        path: 'account',
        element: <Account/>
    }
]

export const RoutePage = (): React.ReactElement => {
    // modal route
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    return (
        <>
            <Routes location={state?.backgroundLocation || location}>
                <Route path={'/'} element={<Layout/>}>
                    {routes.map((item, key) =>
                        <Route path={item.path} key={key} element={item.element}/>
                    )}

                    <Route path={'/Settings'} element={<ContainerLayout/>}>
                        {settingRoutes.map((item, key) =>
                            <Route path={item.path} key={key} element={item.element}/>
                        )}
                    </Route>
                </Route>
            </Routes>
        </>
    )
}
