import {Route, Routes, useLocation} from "react-router-dom";
import * as React from "react";
import {IRuteProps} from "./IRuteProps";
import AuthForm from "../../components/User/Auth/AuthForm/AuthForm";
import Account from "../../pages/Settings/Account";
import Layout from "../../components/Layout/Layout";
import Main from "../../pages/Main/Main";
import ContainerLayout from "../../components/Layout/ContainerLayout";
import Snippets from "../../pages/Snippets/Snippets";
import SnippetsLayout from "../../components/Layout/Snippets/SnippetsLayout";

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
        path: '/snippets/new',
        element: <Main/>
    }
]

const settingRoutes: Array<IRuteProps> = [
    {
        path: 'account',
        element: <Account/>
    }
]

const snippetRoutes: Array<IRuteProps> = [
    {
        path: '',
        element: <Snippets/>
    },
    {
        path: 'starred',
        element: <Snippets/>
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

                    <Route path={'/snippets'} element={<ContainerLayout/>}>
                        <Route path={''} element={<SnippetsLayout/>}>
                            {snippetRoutes.map((item, key) =>
                                <Route path={item.path} key={key} element={item.element}/>
                            )}
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}
