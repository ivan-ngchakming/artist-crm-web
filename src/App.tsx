import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { CookiesProvider } from "react-cookie";
import { NavBar, MetaTitle } from "./components";
import {
  Analytics,
  Communications,
  Customers,
  Home,
  Ideas,
  Settings,
} from "./pages";
import theme from "./theme";
import { BASE_URL } from "./constants";

axios.defaults.baseURL = BASE_URL;

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Box display="flex">
                <MetaTitle />
                <NavBar />
                <Box width="100%" height="100vh" sx={{ overflowY: "auto" }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route
                      path="/communications"
                      element={<Communications />}
                    />
                    <Route path="/ideas" element={<Ideas />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </Box>
              </Box>
            </ThemeProvider>
          </Router>
        </QueryClientProvider>
      </CookiesProvider>
    </HelmetProvider>
  );
};

export default App;
