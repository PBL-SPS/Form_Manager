import { Route, Redirect } from "react-router-dom";

function PublicRoute({ children, isAuthenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) => (
                <>
                    {children}
                    {isAuthenticated && location.pathname === "/login" ? (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: location },
                            }}
                        />
                    ) : null}
                </>
            )}
        />
    );
}

export default PublicRoute;
