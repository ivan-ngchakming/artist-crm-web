import { createTheme } from "@mui/material";

export const palette = {
  IRIDIUM: "#393A3E",
  SILVER_CHALICE: "#ADADAD",
  DENIM_BLUE: "#81BCE1",
  BLUE_IVY: "#2A8BC8",
  LILAC: "#B6A7FF",
  LIGHT_SLATE_BLUE: "#7B61FF",
  INDIAN_RED: "#D16565",
  DARK_PASTEL_GREEN: "#48B15F",
  MERCURY: "#E5E5E5",
  GREY: "#8D8D8D",
};
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: palette.IRIDIUM,
    },
    secondary: {
      main: palette.BLUE_IVY,
    },
    info: {
      main: palette.DENIM_BLUE,
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
    h6: {
      fontSize: 18,
    },
    body1: {
      fontSize: 14,
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
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputLabel-root": {
            color: palette.GREY,
          },
        },
      },
    },
  },
});

export default theme;
