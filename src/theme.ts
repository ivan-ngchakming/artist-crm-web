import { createTheme } from "@mui/material";

export const palette = {
  IRIDIUM: "#393A3E",
  SILVER_CHALICE: "#ADADAD",
  DENIM_BLUE: "#81BCE1",
  LILAC: "#B6A7FF",
  INDIAN_RED: "#D16565",
  DARK_PASTEL_GREEN: "#48B15F",
  MERCURY: "#E5E5E5",
};
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#393A3E",
    },
    secondary: {
      main: "#2A8BC8",
    },
  },
  typography: {
    fontFamily: "Raleway",
    h1: {
      fontSize: 64,
    },
    h5: {
      fontSize: 24,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderRadius: 32,
          padding: "6px 32px",
        },
      },
    },
  },
});

export default theme;
