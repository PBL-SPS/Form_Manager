import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Test from "./pages/Test";
const queryClient = new QueryClient();
const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});
function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Test />
            </ThemeProvider>
        </QueryClientProvider>
    );
}

export default App;
