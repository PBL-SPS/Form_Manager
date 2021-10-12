import { lazy } from "react";

const routes = [
    {
        path: "home",
        component: lazy(() => import("../pages/Test")),
        exact: true,
    },
    {
        path: "users",
        component: lazy(() => import("../pages/Test")),
        exact: true,
    },
];

export default routes;
