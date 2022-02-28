import { useState } from "react";
import {
  AppBar as MuiAppBar,
  Typography,
  IconButton,
  Button,
  Toolbar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import MetaTitle from "./MetaTitle";
import { useDevice } from "../hooks";
import { palette } from "../theme";
import { NAV_ITEMS } from "../constants";
import { useNavigate } from "react-router-dom";

type PageHeaderProps = {
  title: string;
};

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  width: `calc( 100% - ${theme.spacing(15)}px )`,
  padding: theme.spacing(6, 9, 4, 6),
}));

const DesktopPageHeader = ({ title }: PageHeaderProps) => {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar sx={{ alignItems: "flex-end" }}>
        <Typography variant="h1" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <IconButton sx={{ mb: 1 }}>
          <MoreHorizIcon />
        </IconButton>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ ml: 4, mb: 1 }}
        >
          <Typography variant="h5">{title}</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

const MobileAppBar = styled(MuiAppBar)(({ theme }) => ({
  width: `calc( 100% - ${theme.spacing(15)}px )`,
  padding: theme.spacing(1, 1, 2, 1),
}));

const MobilePageHeader = ({ title }: PageHeaderProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (key: string) => {
    handleClose();
    navigate(`/${key}`);
  };

  return (
    <MobileAppBar position="static" elevation={0}>
      <Toolbar sx={{ alignItems: "flex-end" }}>
        <Typography variant="h4" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>

        <IconButton
          id="mobile-menu-button"
          aria-controls={open ? "mobile-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ color: palette.MERCURY }}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="mobile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "mobile-menu-button",
          }}
        >
          <MenuItem onClick={handleClose}>Create</MenuItem>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick("")}>Home</MenuItem>
          {NAV_ITEMS.map(({ key, label }) => (
            <MenuItem key={key} onClick={() => handleMenuItemClick(key)}>
              {label}
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick("settings")}>
            Settings
          </MenuItem>
        </Menu>
      </Toolbar>
    </MobileAppBar>
  );
};

const PageHeader = (props: PageHeaderProps) => {
  const { isMobile } = useDevice();

  const PageHeaderComponent = isMobile ? MobilePageHeader : DesktopPageHeader;

  return (
    <>
      <MetaTitle title={props.title} />
      <PageHeaderComponent {...props} />
    </>
  );
};

export default PageHeader;
