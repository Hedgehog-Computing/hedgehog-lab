import {RouteObject, useLocation, useRoutes} from "react-router-dom";
import * as React from "react";
import Account from "../pages/Settings/Account";
import Layout from "../components/Layout/Layout";
import Snippets from "../pages/Snippets/Snippets";
import ContainerLayout from "../components/Layout/ContainerLayout";
import Auth from "../pages/Auth/Auth";
import Explore from "../pages/Explore/Explore";
import Timeline from "../pages/Timeline/Timeline";
import EmailVerification from "../pages/Email/EmailVerification";
import Home from "../pages/Home/Home";
import Draft from "../pages/Draft/Draft";
import Example from "../pages/Example/Example";
import SnippetEditor from "../pages/Snippets/Editor";

export interface IAppRoutes extends RouteObject {
    data?: {
        label?: string;
        icon?: React.ReactElement;
        selected?: boolean;
    };
    subheader?: string;
    children?: IAppRoutes[];
    meta?: {
        title?: string;
        description?: string;
        keywords?: string;
    };
}

export const router: IAppRoutes[] = [
    {
        path: "",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: '/',
                        element: <Home/>,
                    }
                ]
            },
            {
                path: "/draft",
                element: <Draft/>
            },
            {
                path: "/u/:userID",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "",
                        element: <Snippets/>,
                        meta: {
                            title: 'User snippets',
                        }
                    },
                    {
                        path: "likes",
                        element: <Snippets/>,
                        meta: {
                            title: 'User likes',
                        }
                    },
                ],
            },
            {
                path: "/s/:userID/:snippetID",
                element: <SnippetEditor/>,
            },
            {
                path: "/e/example/:exampleName",
                element: <Example/>,
            },
            {
                path: "",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "explore",
                        element: <Explore/>,
                        meta: {
                            title: 'Explore snippets',
                        }
                    },
                    {
                        path: "timeline",
                        element: <Timeline/>,
                        meta: {
                            title: 'Timeline',
                        }
                    },
                    {
                        path: 'email-verification',
                        element: <EmailVerification/>,
                        meta: {
                            title: 'Verify your email',
                        }
                    }
                ],
            },
            {
                path: "/settings",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "account",
                        element: <Account/>,
                        meta: {
                            title: 'Account',
                        }
                    },
                ],
            },
            {
                path: "",
                element: <ContainerLayout/>,
                children: [
                    {
                        path: "auth",
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
