import { Box, ButtonBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import { palette } from "../theme";

type NavSelectorProps = {
  show?: boolean;
};

const Root = styled(Box)(({ theme }) => ({
  width: "fit-content",
  height: "100vh",
  backgroundColor: palette.IRIDIUM,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5),
}));

const NavButton = styled(ButtonBase)(({ theme, color }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  borderRadius: theme.spacing(1),
  backgroundColor: color || palette.SILVER_CHALICE,
}));

const NavSelector = styled("div")<NavSelectorProps>(
  ({ theme, color, show }) => ({
    width: "32px",
    height: "0px",
    border: show ? `2px solid ${color || palette.SILVER_CHALICE}` : "none",
    transform: "rotate(90deg)",
  })
);

const navItems = [
  { key: 1, color: palette.LILAC },
  { key: 2, color: palette.DENIM_BLUE },
  { key: 3, color: palette.INDIAN_RED },
  { key: 4, color: palette.DARK_PASTEL_GREEN },
];

const NavBar = () => {
  return (
    <Root
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <NavButton>Home</NavButton>
      <Box display="flex" flexDirection="column" alignItems="center" pr={3}>
        {navItems.map(({ key, color }) => (
          <Box display="flex" alignItems="center">
            <NavSelector color={color} show={key === 1} />
            <Box my={1} key={key} display="flex">
              <NavButton color={color}>Button {key}</NavButton>
            </Box>
          </Box>
        ))}
      </Box>
      <NavButton>Setting</NavButton>
    </Root>
  );
};

export default NavBar;
