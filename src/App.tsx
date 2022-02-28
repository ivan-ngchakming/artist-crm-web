import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

const contentMargins = {
  mt: 6,
  mr: 9,
  mb: 4,
  ml: 6,
};

const App = () => {
  const { isDesktop } = useDevice();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <MetaTitle />
          <NavBar />
          <Box width="100%" {...(isDesktop ? contentMargins : null)}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/communications" element={<Communications />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
};

export default App;
