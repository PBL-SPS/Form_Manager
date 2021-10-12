import { CircularProgress } from "@mui/material";
import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "./routes"; // Route list
import AuthWrapper from "./AuthWrapper";

const ProtectedRoutes = () => (
    <Switch>
        <Suspense fallback={<CircularProgress color="primary" />}>
            {routes.map(({ component: Component, path, exact }) => (
                <Route path={`/${path}`} key={path} exact={exact}>
                    <AuthWrapper>
                        <Component />
                    </AuthWrapper>
                </Route>
            ))}
        </Suspense>
    </Switch>
);

export default ProtectedRoutes;
