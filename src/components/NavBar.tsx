import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  ButtonBase,
  IconButton,
  BottomNavigation,
  BottomNavigationAction as MuiBottomNavigationAction,
  BottomNavigationActionProps as MuiBottomNavigationActionProps,
} from "@mui/material";
import ChangeHistoryOutlinedIcon from "@mui/icons-material/ChangeHistoryOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useDevice } from "../hooks";
import { palette } from "../theme";
import { NAV_ITEMS } from "../constants";

type NavSelectorProps = {
  selected: boolean;
};

type NavBarProps = {
  value: string;
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
  ({ theme, color, selected }) => ({
    width: "32px",
    height: "0px",
    border: selected ? `2px solid ${color || palette.SILVER_CHALICE}` : "none",
    transform: "rotate(90deg)",
  })
);

const DesktopNavBar = ({ value }: NavBarProps) => {
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    navigate(key);
  };

  return (
    <Root
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <NavButton onClick={() => handleChange("/")}>
        <ChangeHistoryOutlinedIcon fontSize="large" />
      </NavButton>
      <Box display="flex" flexDirection="column" alignItems="center" pr={3}>
        {NAV_ITEMS.map(({ key, color, Icon }) => (
          <Box key={key} display="flex" alignItems="center">
            <NavSelector color={color} selected={key === value} />
            <Box my={1} display="flex">
              <NavButton color={color} onClick={() => handleChange(key)}>
                <Icon sx={{ color: palette.IRIDIUM }} fontSize="large" />
              </NavButton>
            </Box>
          </Box>
        ))}
      </Box>
      <IconButton size="large" onClick={() => handleChange("/settings")}>
        <SettingsOutlinedIcon
          fontSize="inherit"
          sx={{ color: palette.MERCURY }}
        />
      </IconButton>
    </Root>
  );
};

type BottomNavigationActionProps = {
  selected?: boolean;
  color?: string;
} & MuiBottomNavigationActionProps;

const BottomNavigationAction = styled(
  MuiBottomNavigationAction
)<BottomNavigationActionProps>(
  ({ theme, selected, color = palette.MERCURY }) => ({
    color: selected ? color : palette.MERCURY,
    "& .MuiBottomNavigationAction-label": {},
    "& .Mui-selected": {
      color: selected ? color : palette.MERCURY,
    },
  })
);

const MobileNavBar = ({ value }: NavBarProps) => {
  const navigate = useNavigate();

  const handleChange = (val: string) => {
    navigate(val);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, minWidth: "100vw", zIndex: 1000 }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, val) => handleChange(val)}
        sx={{ backgroundColor: palette.IRIDIUM }}
      >
        {NAV_ITEMS.map(({ key, color, Icon, label }) => (
          <BottomNavigationAction
            key={key}
            value={key}
            label={label}
            color={color}
            icon={
              <Icon sx={{ color: value === key ? color : palette.MERCURY }} />
            }
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

const NavBar = () => {
  const location = useLocation();
  const [value, setValue] = useState<string>(
    location.pathname.replace("/", "")
  );
  const { isMobile } = useDevice();

  useEffect(() => {
    setValue(location.pathname.replace("/", ""));
  }, [location.pathname]);

  const NavBarComponent = isMobile ? MobileNavBar : DesktopNavBar;

  return <NavBarComponent value={value} />;
};

export default NavBar;
