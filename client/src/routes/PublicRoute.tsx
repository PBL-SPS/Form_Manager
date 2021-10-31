import { Route, Redirect } from "react-router-dom";
import AuthWrapper from "./AuthWrapper";

function PublicRoute({
    children,
    isAuthenticated,
    ...rest
}: {
    children: any;
    isAuthenticated: boolean;
    rest : any;
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
