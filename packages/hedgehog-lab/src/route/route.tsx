import {RouteObject, useLocation, useRoutes} from "react-router-dom";
import * as React from "react";
import Account from "../pages/Settings/Account";
import Layout from "../components/Layout/Layout";
import Main from "../pages/Main/Main";
import Snippets from "../pages/Snippets/Snippets";
import ContainerLayout from "../components/Layout/ContainerLayout";
import Auth from "../pages/Auth/Auth";

const router: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Main/>
            },
            {
                path: '/tutorial/:tutorialID',
                element: <Main/>
            },
            {
                path: '/snippets/new',
                element: <Main/>
            },
            {
                path: '/:userID',
                element: <ContainerLayout/>,
                children: [
                    {
                        path: '',
                        element: <Snippets/>
                    },
                    {
                        path: '/:userID/starred',
                        element: <Snippets/>
                    },
                ]
            },
            {
                path: '/:userID/:snippetID',
                element: <Main/>
            },
            {
                path: '/settings',
                element: <ContainerLayout/>,
                children: [
                    {
                        path: 'account',
                        element: <Account/>
                    }
                ]
            },
            {
                path: '/auth',
                element: <ContainerLayout/>,
                children: [
                    {
                        path: '',
                        element: <Auth/>
                    },
                ]
            },
        ]
    },
];


export const RoutePage = (): React.ReactElement => {
    // modal route
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    const element = useRoutes(router, state?.backgroundLocation || location)

    return (
        <>
            {element}
        </>
    )

}
