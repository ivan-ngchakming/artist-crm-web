import { styled, Box } from "@mui/material";
import { palette } from "../theme";

const ScrollBarWrapper = styled(Box)({
  // Styling Scrollbars in Chrome, Edge, and Safari
  "&::-webkit-scrollbar": {
    width: "12px", // width of the entire scrollbar
  },
  "&::-webkit-scrollbar-track": {
    background: "white", // color of the tracking area
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: palette.INDIAN_RED, // color of the scroll thumb
    borderRadius: "20px", // roundness of the scroll thumb
    border: `3px solid ${"white"}`, // creates padding around scroll thumb
  },
  // Style scroll bar for Firefox
  scrollbarWidth: "thin", // auto or thin
  scrollbarColor: `${palette.INDIAN_RED} ${"white"}`, // scroll thumb and track
});

export default ScrollBarWrapper;
