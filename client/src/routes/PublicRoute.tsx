import { Route, Redirect } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

function PublicRoute({
    children,
    isAuthenticated,
    path,
    ...rest
}: {
    children: any;
    isAuthenticated: boolean;
    rest : any;
    path? : string;
}) {
    return (
        <Route
            {...rest}
            render={({ location }) => (
                <AuthWrapper spinner={false}>
                    {children}
                    {isAuthenticated && location.pathname === "/login" ? (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    ) : null}
                </AuthWrapper>
            )}
        />
    );
}

export default PublicRoute;
