import {useLocation} from 'react-router-dom';
import {IAppRoutes, router} from "../route/route";

const useCurrentRoute = () => {
    const {pathname} = useLocation();
    let currentRoute: IAppRoutes = {};

    router.map((route: IAppRoutes) => {
        if (route.children) {
            route.children.map((child) => {
                if (child.path === pathname && !child.children) {
                    currentRoute = child;
                }

                if (child.children) {
                    child.children.map((item) => {
                        if (`${child.path}/${item.path}` === pathname) {
                            currentRoute = item;
                        }
                    })
                }
            });
        }
    });

    return currentRoute;
};

export default useCurrentRoute;
