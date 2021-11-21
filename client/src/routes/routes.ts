import { lazy } from "react";

const routes = [
    {
        "path" : "new",
        component : lazy(() => import("../pages/Form")),
        exact : true
    }
];

export default routes;
