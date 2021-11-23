import {
  CircularProgress,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux-hooks";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Response from "./pages/Response";
import { selectAuthState } from "./redux/auth/slice";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoutes from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import { LS_KEYS } from "./utils/constants";
import 'sweetalert2/dist/sweetalert2.min.css'

const queryClient = new QueryClient();
const darkTheme = createTheme({
  palette: {
    mode: "dark",
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
            <Header />
            <Suspense fallback={<CircularProgress color="primary" />}>
              <Switch>
                <PublicRoute path="/" exact isAuthenticated={isAuthenticated}>
                  <Home />
                </PublicRoute>
                <PublicRoute
                  path="/form/:formId"
                  exact
                  isAuthenticated={isAuthenticated}
                >
                  <Response />
                </PublicRoute>
                <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
                  <Login />
                </PublicRoute>

                <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
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
