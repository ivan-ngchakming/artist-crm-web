import { CssBaseline, ThemeProvider, Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components";
import {
  Analytics,
  Communications,
  Customers,
  Home,
  Ideas,
  Settings,
} from "./pages";
import theme from "./theme";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box display="flex">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/communications" element={<Communications />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;
