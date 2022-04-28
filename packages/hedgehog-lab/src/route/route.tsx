import {RouteObject, useLocation, useRoutes} from "react-router-dom";
import * as React from "react";
import Account from "../pages/Settings/Account";
import Layout from "../components/Layout/Layout";
import Main from "../pages/Main/Main";
import Snippets from "../pages/Snippets/Snippets";
import ContainerLayout from "../components/Layout/ContainerLayout";
import Auth from "../pages/Auth/Auth";
import Explore from "../pages/Explore/Explore";
import Timeline from "../pages/Timeline/Timeline";

const router: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <Main/>,
            },
            {
                path: "/u/:userID",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "",
                        element: <Snippets/>,
                    },
                    {
                        path: "likes",
                        element: <Snippets/>,
                    },
                ],
            },
            {
                path: "/s/:userID/:snippetID",
                element: <Main/>,
            },
            {
                path: "/s/example/:exampleName",
                element: <Main/>,
            },
            {
                path: "/explore",
                element: <ContainerLayout/>,
                children: [{path: "", element: <Explore/>}],
            },
            {
                path: "/timeline",
                element: <ContainerLayout/>,
                children: [{path: "", element: <Timeline/>}],
            },
            {
                path: "/settings",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "account",
                        element: <Account/>,
                    },
                ],
            },
            {
                path: "/auth",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "",
                        element: <Auth/>,
                    },
                ],
            },
        ],
    },
];

export const RoutePage = (): React.ReactElement => {
    // modal route
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    const element = useRoutes(router, state?.backgroundLocation || location);

    return <>{element}</>;
};
