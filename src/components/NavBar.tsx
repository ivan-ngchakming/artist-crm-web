import { useState } from "react";
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
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDevice } from "../hooks";
import { palette } from "../theme";

type NavSelectorProps = {
  selected: boolean;
};

type NavBarProps = {
  value: string;
  onChange: (val: string) => void;
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

const navItems = [
  {
    key: "customers",
    color: palette.LILAC,
    label: "Customers",
    Icon: PersonOutlineIcon,
  },
  {
    key: "communications",
    color: palette.DENIM_BLUE,
    label: "Communication",
    Icon: MailOutlineIcon,
  },
  {
    key: "ideas",
    color: palette.INDIAN_RED,
    label: "Ideas",
    Icon: LightbulbOutlinedIcon,
  },
  {
    key: "analytics",
    color: palette.DARK_PASTEL_GREEN,
    label: "Analytics",
    Icon: PieChartOutlineOutlinedIcon,
  },
];

const DesktopNavBar = ({ value, onChange }: NavBarProps) => {
  const navigate = useNavigate();

  const handleChange = (key: string) => {
    onChange(key);
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
        {navItems.map(({ key, color, Icon }) => (
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

const MobileNavBar = ({ value, onChange }: NavBarProps) => {
  const navigate = useNavigate();

  const handleChange = (val: string) => {
    onChange(val);
    navigate(val);
  };

  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, minWidth: "100vw" }}
      elevation={3}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(e, val) => handleChange(val)}
        sx={{ backgroundColor: palette.IRIDIUM }}
      >
        {navItems.map(({ key, color, Icon, label }) => (
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
  const [value, setValue] = useState<string>("customers");
  const { isMobile } = useDevice();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const NavBarComponent = isMobile ? MobileNavBar : DesktopNavBar;

  return <NavBarComponent value={value} onChange={handleChange} />;
};

export default NavBar;
