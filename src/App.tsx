import { CssBaseline, ThemeProvider } from "@mui/material";
import { NavBar } from "./components";
import theme from "./theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
      </ThemeProvider>
    </>
  );
}

export default App;
