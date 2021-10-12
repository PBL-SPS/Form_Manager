import {
    CircularProgress,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAppSelector } from "./hooks/redux-hooks";
import Login from "./pages/Login";
import { selectAuthState } from "./redux/auth/slice";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoutes from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { LS_KEYS } from "./utils/constants";

const queryClient = new QueryClient();
const darkTheme = createTheme({
    palette: {
        mode: "light",
    },
});
function App() {
    const authState = useAppSelector(selectAuthState);
    const isAuthenticated =
        authState === "LOGGEDIN" ||
        localStorage.getItem(LS_KEYS.IS_LOGGED_IN) === "1";
    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <QueryClientProvider client={queryClient}>
                <ThemeProvider theme={darkTheme}>
                    <CssBaseline />

                    <Router>
                        <Suspense
                            fallback={<CircularProgress color="primary" />}
                        >
                            <Switch>
                                <PublicRoute
                                    path="/"
                                    exact
                                    isAuthenticated={isAuthenticated}
                                >
                                    <div>This is public</div>
                                </PublicRoute>

                                <PublicRoute
                                    path="/login"
                                    isAuthenticated={isAuthenticated}
                                >
                                    <Login />
                                </PublicRoute>

                                <PrivateRoute
                                    path="/"
                                    isAuthenticated={isAuthenticated}
                                >
                                    <ProtectedRoutes />
                                </PrivateRoute>
                                <Route path="*">
                                    <div>Not found</div>
                                </Route>
                            </Switch>
                        </Suspense>
                    </Router>
                </ThemeProvider>
            </QueryClientProvider>
        </div>
    );
}

export default App;
