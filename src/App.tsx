import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { HelmetProvider } from "react-helmet-async";
import axios from "axios";
import { NavBar, MetaTitle } from "./components";
import { useDevice } from "./hooks";
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
  const { isDesktop } = useDevice();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box display="flex">
              <MetaTitle />
              <NavBar />
              <Box width="100%" height="100vh" sx={{ overflowY: "auto" }}>
                <Box
                  {...(isDesktop ? { mt: 6, mr: 9, mb: 4, ml: 6 } : null)}
                  height={`calc( 100% - 48px - 32px )`}
                >
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
            </Box>
          </ThemeProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
